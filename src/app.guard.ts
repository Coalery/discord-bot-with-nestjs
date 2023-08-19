import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SomeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.getArgByIndex(0);
    console.log(`In Guard: ${JSON.stringify(req)}`);
    return true;
  }
}
