import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from '../auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<Pick<AuthService, 'register' | 'login'>>;

  beforeEach(async () => {
    const register = jest.fn();
    const login = jest.fn();
    authService = { register, login };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('register', async () => {
    const dto = { email: 'email@test.com', password: 'password12' };
    const result = { email: 'test@siema.pl', id: 'test', createdAt: new Date('2020-11-11') };
    authService.register.mockResolvedValue(result);

    expect(await controller.register(dto)).toEqual(result);
    expect(authService.register).toHaveBeenCalledWith(dto.email, dto.password);
  });
});
