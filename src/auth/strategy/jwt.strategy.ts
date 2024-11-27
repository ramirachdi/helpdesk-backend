import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,  // The secret that was used to sign the JWT
      ignoreExpiration: false              // Whether to ignore the expiration of the JWT
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
