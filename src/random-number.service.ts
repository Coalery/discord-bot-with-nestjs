import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomNumberService {
  generateRandomNumber(): number {
    return Math.random();
  }
}
