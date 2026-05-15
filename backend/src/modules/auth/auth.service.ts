import { UserRepository } from '../users/users.repository';
import { comparePassword, hashPassword } from '../../utils/crypto';
import { signToken, verifyToken } from '../../helpers/token.helper';
import { AppError } from '../../utils/AppError';
import { UserRole } from '../../entities/User';

export class AuthService {
  private userRepo = new UserRepository();

  async register(email: string, password: string, fullName: string) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new AppError('Email already registered', 409);
    const passwordHash = await hashPassword(password);
    const user = await this.userRepo.save({
      email: email.toLowerCase(),
      passwordHash,
      fullName,
      role: UserRole.VIEWER,
      isActive: true,
    });
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new AppError('Invalid credentials', 401);
    if (!user.isActive) throw new AppError('Account deactivated', 403);

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) throw new AppError('Invalid credentials', 401);

    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async refresh(bearerToken: string) {
    const payload = verifyToken(bearerToken);
    const user = await this.userRepo.findById(payload.id);
    if (!user || !user.isActive) throw new AppError('Invalid or expired token', 401);
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    });
    return { token };
  }
}
