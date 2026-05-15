import { InventoryRepository } from './inventory.repository';
import { AppError } from '../../utils/AppError';
import { StockEntry } from '../../entities/StockEntry';

export type StockStatus = 'OK' | 'LOW' | 'REORDER';

export interface StockEntryView extends StockEntry {
  assetId: string;
  status: StockStatus;
  fillPercent: number;
}

export class InventoryService {
  private repo = new InventoryRepository();

  private computeStatus(stock: number, reorder: number, capacity: number): StockStatus {
    if (stock < reorder * 0.35) return 'REORDER';
    if (stock < reorder) return 'LOW';
    if (capacity > 0 && stock / capacity < 0.15) return 'REORDER';
    return 'OK';
  }

  private computeFill(stock: number, capacity: number): number {
    if (capacity <= 0) return Math.min(100, Math.round((stock / (stock + 1)) * 100));
    return Math.min(100, Math.round((stock / capacity) * 100));
  }

  private toView(entry: StockEntry): StockEntryView {
    const stock = parseFloat(entry.stockLevelMT);
    const reorder = parseFloat(entry.reorderLevelMT);
    const capRaw = entry.capacityMT ? parseFloat(entry.capacityMT) : Math.max(reorder * 5, stock * 1.2);
    const status = this.computeStatus(stock, reorder, capRaw);
    const fillPercent = this.computeFill(stock, capRaw);
    const slug = entry.chemical?.name
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .toUpperCase()
      .slice(0, 12);
    return {
      ...entry,
      assetId: `#${slug || 'CHEM'}-${entry.id.slice(0, 4).toUpperCase()}`,
      status,
      fillPercent,
    };
  }

  async list(page: number, limit: number) {
    const [rows, total] = await this.repo.findAll(page, limit);
    return {
      data: rows.map((r) => this.toView(r)),
      total,
      page,
      limit,
    };
  }

  async create(data: {
    chemicalId: string;
    stockLevelMT: number;
    reorderLevelMT: number;
    capacityMT?: number;
    batchNumber: string;
    expiryDate?: string;
    storageLocation?: string;
  }): Promise<StockEntryView> {
    const saved = await this.repo.save({
      chemicalId: data.chemicalId,
      stockLevelMT: String(data.stockLevelMT),
      reorderLevelMT: String(data.reorderLevelMT),
      capacityMT: data.capacityMT != null ? String(data.capacityMT) : null,
      batchNumber: data.batchNumber,
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      storageLocation: data.storageLocation ?? null,
    });
    const full = await this.repo.findById(saved.id);
    if (!full) throw new AppError('Failed to load stock entry', 500);
    return this.toView(full);
  }

  async update(
    id: string,
    data: Partial<{
      stockLevelMT: number;
      reorderLevelMT: number;
      capacityMT: number | null;
      batchNumber: string;
      expiryDate: string | null;
      storageLocation: string | null;
    }>
  ): Promise<StockEntryView> {
    const entry = await this.repo.findById(id);
    if (!entry) throw new AppError('Stock entry not found', 404);
    if (data.stockLevelMT != null) entry.stockLevelMT = String(data.stockLevelMT);
    if (data.reorderLevelMT != null) entry.reorderLevelMT = String(data.reorderLevelMT);
    if (data.capacityMT !== undefined)
      entry.capacityMT = data.capacityMT == null ? null : String(data.capacityMT);
    if (data.batchNumber != null) entry.batchNumber = data.batchNumber;
    if (data.expiryDate !== undefined)
      entry.expiryDate = data.expiryDate ? new Date(data.expiryDate) : null;
    if (data.storageLocation !== undefined) entry.storageLocation = data.storageLocation;
    await this.repo.save(entry);
    const full = await this.repo.findById(id);
    if (!full) throw new AppError('Failed to load stock entry', 500);
    return this.toView(full);
  }

  async alerts() {
    const low = await this.repo.findLowStock();
    const [all] = await this.repo.findAll(1, 2000);
    const soon = all.filter((e) => {
      if (!e.expiryDate) return false;
      const days = (new Date(e.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
      return days > 0 && days <= 30;
    });
    return {
      lowStock: low.map((e) => this.toView(e)),
      expiringSoon: soon.map((e) => this.toView(e)),
    };
  }
}
