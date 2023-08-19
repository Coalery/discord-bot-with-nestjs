import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(senderName: string): string {
    return `안녕하세요, ${senderName}님.`;
  }
}
