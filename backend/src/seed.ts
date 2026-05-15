import { AppDataSource } from './config/database';
import { User, UserRole } from './entities/User';
import { Chemical } from './entities/Chemical';
import { StockEntry } from './entities/StockEntry';
import { Vehicle, VehicleStatus } from './entities/Vehicle';
import { RFQ, RFQPriority, RFQStatus } from './entities/RFQ';
import { Dispatch, DispatchStatus } from './entities/Dispatch';
import { Invoice, InvoiceStatus } from './entities/Invoice';
import { hashPassword } from './utils/crypto';
import { SEED_CHEMICALS } from './seed/chemicals.data';

export async function runSeed(): Promise<void> {
  const userRepo = AppDataSource.getRepository(User);
  const existing = await userRepo.findOne({ where: { email: 'admin@rickaryan.com' } });
  if (!existing) {
    const passwordHash = await hashPassword(process.env.SEED_ADMIN_PASSWORD || 'ChangeMe!Strong1');
    const admin = userRepo.create({
      email: 'admin@rickaryan.com',
      passwordHash,
      fullName: 'Rick Aryan',
      role: UserRole.MASTER_ADMIN,
    });
    await userRepo.save(admin);
  }

  const chemRepo = AppDataSource.getRepository(Chemical);
  if ((await chemRepo.count()) === 0) {
    for (const c of SEED_CHEMICALS) {
      await chemRepo.save(chemRepo.create({ ...c }));
    }
  }

  const stockRepo = AppDataSource.getRepository(StockEntry);
  if ((await stockRepo.count()) === 0) {
    const chems = await chemRepo.find();
    const samples = [
      { stock: 12450, reorder: 2500, cap: 15000, batch: 'B-3821-X' },
      { stock: 8200, reorder: 2000, cap: 12000, batch: 'B-9012-A' },
      { stock: 3100, reorder: 800, cap: 10000, batch: 'B-7711-P' },
      { stock: 5600, reorder: 1200, cap: 9000, batch: 'B-6600-R' },
      { stock: 900, reorder: 2000, cap: 8000, batch: 'B-2200-Z' },
    ];
    for (let i = 0; i < chems.length; i++) {
      const s = samples[i % samples.length];
      await stockRepo.save(
        stockRepo.create({
          chemicalId: chems[i].id,
          stockLevelMT: String(s.stock),
          reorderLevelMT: String(s.reorder),
          capacityMT: String(s.cap),
          batchNumber: `${s.batch}-${i}`,
          expiryDate: new Date(Date.now() + (90 + (i % 60)) * 86400000),
          storageLocation: 'Port Harcourt Hub',
        })
      );
    }
  }

  const vehicleRepo = AppDataSource.getRepository(Vehicle);
  if ((await vehicleRepo.count()) === 0) {
    const vehicles = [
      {
        vehicleCode: 'MACK-G88',
        make: 'Mack',
        model: 'Granite',
        status: VehicleStatus.IN_TRANSIT,
        currentLatitude: '4.8156',
        currentLongitude: '7.0498',
        lastGpsPing: new Date(),
      },
      {
        vehicleCode: 'VOLVO-H12',
        make: 'Volvo',
        model: 'FH',
        status: VehicleStatus.IN_TRANSIT,
        currentLatitude: '4.92',
        currentLongitude: '6.98',
        lastGpsPing: new Date(),
      },
    ];
    for (const v of vehicles) {
      await vehicleRepo.save(vehicleRepo.create(v));
    }
  }

  const rfqRepo = AppDataSource.getRepository(RFQ);
  if ((await rfqRepo.count()) === 0) {
    await rfqRepo.save(
      rfqRepo.create({
        rfqCode: 'RFQ-8819',
        companyName: 'Dangote Refinery',
        contactEmail: 'procurement@example.com',
        location: 'Lekki Free Trade Zone, Lagos',
        productRequested: 'Industrial Grade Caustic Soda Flakes',
        quantityMT: '1200',
        deliveryLeadTime: 'Standard (7-10 Days)',
        status: RFQStatus.NEW,
        priority: RFQPriority.URGENT,
        activityFeed: [
          {
            message: 'RFQ Created by Rick Aryan',
            actor: 'Rick Aryan',
            timestamp: new Date().toISOString(),
          },
        ],
      })
    );
  }

  const adminUser = await userRepo.findOne({ where: { email: 'admin@rickaryan.com' } });
  const v0 = await vehicleRepo.findOne({ where: {} });
  if (adminUser && v0 && (await AppDataSource.getRepository(Dispatch).count()) === 0) {
    await AppDataSource.getRepository(Dispatch).save(
      AppDataSource.getRepository(Dispatch).create({
        dispatchCode: 'RA-99218',
        vehicleId: v0.id,
        driverId: adminUser.id,
        driverName: 'Markus Vane',
        loadDescription: 'Sulphuric Acid',
        destinationName: 'Lagos Terminal A',
        destinationLat: '6.5244',
        destinationLng: '3.3792',
        status: DispatchStatus.DELAYED,
        progressPercent: 32,
      })
    );
  }

  const invRepo = AppDataSource.getRepository(Invoice);
  if ((await invRepo.count()) === 0) {
    await invRepo.save(
      invRepo.create({
        invoiceNumber: 'INV-1001',
        clientName: 'Shell Petroleum Development Company',
        amountNGN: '45000000',
        status: InvoiceStatus.SENT,
        dueDate: new Date(Date.now() + 14 * 86400000),
      })
    );
  }
}
