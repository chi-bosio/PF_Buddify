import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleOathConfig from '../config/google-oauth.config';
import { ConfigType } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { CreateUserDto } from '../../users/dtos/create-user.dto';

@Injectable()
export default class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOathConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleOathConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: googleConfiguration.clientID,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const date: Date = new Date('1990-01-01');

    const googleUser: CreateUserDto = {
      email: profile.emails[0].value,
      name: profile.name.givenName,
      lastname: profile.name.familyName,
      username: profile.emails[0].value.split('@')[0],
      birthdate: date,
      city: '',
      country: '',
      dni: '',
      password: '',
      isThirdParty: true,
    };

    const user = await this.authService.validateGoogleUser(googleUser);

    done(null, user);
  }
}
