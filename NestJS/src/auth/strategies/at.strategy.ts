import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

export type JwtPayload = {
  id: number;
  email: string;
  iat: number;
  exp: number;
};

@Injectable()
export class AtStrategy extends PassportStrategy(
  Strategy,
  process.env.AT_STRATEGY_NAME,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_AT,
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
    // req.user = return value
  }
}
