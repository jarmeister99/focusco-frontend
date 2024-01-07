import { Pipe, PipeTransform } from '@angular/core';
import Message from '../models/message.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(messages: Message[], ...args: unknown[]): Message[] {
    return messages.sort((a, b) => {
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    });
  }
}
