import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, plainPassword: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verifica a senha
    const isPasswordValid: boolean = await user.checkPassword(plainPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // const { password, ...result } = user;

    const id = user.id
    const userEmail = user.email
    return [id, userEmail];
  }

  async login(email: string, password: string) {
    const [id, userEmail] = await this.validateUser(email, password);

    const payload = { sub: id, email: userEmail};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
