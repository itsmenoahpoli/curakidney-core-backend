import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('Auth Headers:', request.headers);
    console.log('Auth Token:', request.headers.authorization);
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('JWT Guard Error:', err);
    console.log('JWT Guard User:', user);
    console.log('JWT Guard Info:', info);

    if (err || !user) {
      throw err || new Error('User not authenticated');
    }
    return user;
  }
}
