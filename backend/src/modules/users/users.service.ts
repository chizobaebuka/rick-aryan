import { UserRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto } from '../../interfaces/IUser';
import { hashPassword } from '../../utils/crypto';
import { AppError } from '../../utils/AppError';
import { User } from '../../entities/User';

export type PublicUser = Omit<User, 'passwordHash'>;

export class UserService {
  private repo = new UserRepository();

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findById(id);
  }

  async listUsers(): Promise<PublicUser[]> {
    const users = await this.repo.findAll();
    return users.map((u) => this.sanitize(u));
  }

  async createUser(data: CreateUserDto): Promise<PublicUser> {
    const existing = await this.repo.findByEmail(data.email);
    if (existing) throw new AppError('Email already registered', 409);
    const passwordHash = await hashPassword(data.password);
    const user = await this.repo.save({
      email: data.email.toLowerCase(),
      passwordHash,
      fullName: data.fullName,
      role: data.role,
    });
    return this.sanitize(user);
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<PublicUser> {
    const user = await this.repo.findById(id);
    if (!user) throw new AppError('User not found', 404);
    Object.assign(user, data);
    const saved = await this.repo.save(user);
    return this.sanitize(saved);
  }

  async deactivateUser(id: string): Promise<void> {
    const user = await this.repo.findById(id);
    if (!user) throw new AppError('User not found', 404);
    user.isActive = false;
    await this.repo.save(user);
  }

  private sanitize(user: User): PublicUser {
    const { passwordHash: _p, ...rest } = user;
    return rest as PublicUser;
  }
}
