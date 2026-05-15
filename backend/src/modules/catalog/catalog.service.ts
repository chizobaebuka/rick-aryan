import { AppDataSource } from '../../config/database';
import { Chemical } from '../../entities/Chemical';
import { ChemicalQueryDto } from '../../interfaces/IChemical';
import { AppError } from '../../utils/AppError';

export class CatalogService {
  private repo = AppDataSource.getRepository(Chemical);

  private normalizeCategory(raw?: string): string | undefined {
    if (!raw) return undefined;
    const input = raw.trim().toUpperCase();

    // Legacy/public-site aliases
    if (input === 'CHEMICALS') return undefined;
    // Requested behavior: equipment bucket currently points to chemicals catalog.
    if (input === 'EQUIPMENT') return undefined;

    const aliases: Record<string, string> = {
      SALTS: 'PRIMARY_SALTS',
      BRINE: 'BRINES',
      BRINES: 'BRINES',
      GLYCOL: 'GLYCOLS',
      GLYCOLS: 'GLYCOLS',
      POLYMER: 'POLYMERS',
      POLYMERS: 'POLYMERS',
      SPECIALTY: 'SPECIALTY',
      SPECIALTIES: 'SPECIALTY',
    };

    return aliases[input] ?? input;
  }

  async list(query: ChemicalQueryDto) {
    const page = Number.isFinite(Number(query.page)) ? Math.max(1, Number(query.page)) : 1;
    const limit = Number.isFinite(Number(query.limit))
      ? Math.min(100, Math.max(1, Number(query.limit)))
      : 7;
    const category = this.normalizeCategory(query.category);

    const qb = this.repo.createQueryBuilder('c').where('c.isActive = true');
    if (category) {
      qb.andWhere('UPPER(c.category) = :category', { category });
    }
    if (query.search) {
      qb.andWhere(
        '(LOWER(c.name) LIKE LOWER(:s) OR c.casNumber ILIKE :s OR LOWER(c.formula) LIKE LOWER(:s))',
        { s: `%${query.search}%` }
      );
    }
    const [data, total] = await qb
      .orderBy('c.name', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return { data, total, page, limit };
  }

  async getById(id: string): Promise<Chemical> {
    const chemical = await this.repo.findOne({ where: { id, isActive: true } });
    if (!chemical) throw new AppError('Chemical not found', 404);
    return chemical;
  }
}
