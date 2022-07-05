import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { List } from '../../models/list.model';

@Pipe({
  name: 'finished',
})
@Injectable()
export class FinishedPipe implements PipeTransform {
  constructor(private router: Router) {}
  transform(list: List[]): List[] {
    if (this.router.url === '/tabs/tab1') {
      return list.map((res) => {
        if (res.finish === false) {
          return res;
        }
      });
    } else if (this.router.url === '/tabs/tab2') {
      return list.map((res) => {
        if (res.finish === true) {
          return res;
        }
      });
    }
  }
}
