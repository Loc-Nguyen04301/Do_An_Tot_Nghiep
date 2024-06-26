import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';

export type JwtRefreshPayload = {
  id: number;
  role: string;
  iat: number;
  exp: number;
  refresh_token: string;
};

@Injectable()
export class RtStrategy extends PassportStrategy(
  Strategy,
  process.env.RT_STRATEGY_NAME,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_RT,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refresh_token = req.get('authorization').replace('Bearer', '').trim();

    if (!refresh_token) throw new ForbiddenException('Refresh token malformed')

    return { ...payload, refresh_token } as JwtRefreshPayload;
    // req.user = return value
  }
}
