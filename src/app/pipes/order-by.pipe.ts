import { Pipe, PipeTransform } from '@angular/core';

interface OrderableByDate {
  updatedAt: string;
}

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(orderableList: OrderableByDate[], ...args: unknown[]): OrderableByDate[] {
    return orderableList.sort((a, b) => {
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    });
  }
}
