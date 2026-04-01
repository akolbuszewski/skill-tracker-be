import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { asUserId, type UserId } from 'src/common/types/ids';
@Injectable()
export class ParseUserIdPipe implements PipeTransform<string, UserId> {
  transform(value: string): UserId {
    if (!isUUID(value)) {
      throw new BadRequestException('Invalid userId');
    }
    return asUserId(value);
  }
}