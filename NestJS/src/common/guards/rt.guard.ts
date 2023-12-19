import { AuthGuard } from '@nestjs/passport';

export class RtGuard extends AuthGuard(process.env.RT_STRATEGY_NAME) {
  constructor() {
    super();
  }
}
