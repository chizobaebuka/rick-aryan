import { User, UserRole } from '../entities/User';

export interface CreateUserDto {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
}

export interface UpdateUserDto {
  fullName?: string;
  role?: UserRole;
  isActive?: boolean;
  avatarUrl?: string | null;
}

export interface IUserService {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  listUsers(): Promise<User[]>;
  createUser(data: CreateUserDto): Promise<User>;
  updateUser(id: string, data: UpdateUserDto): Promise<User>;
  deactivateUser(id: string): Promise<void>;
}
