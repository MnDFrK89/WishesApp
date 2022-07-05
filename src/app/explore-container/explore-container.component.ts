import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { List } from '../models/list.model';
import { getLists } from '../store/wishes.selectors';
import * as actions from '../store/wishes.actions';
@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  listas$: Observable<any>;
  constructor(private store: Store, private router: Router) {
    this.listas$ = this.store.select(getLists);
  }

  public selectedList(list: List) {
    if (list.finish) {
      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
    }
  }
  public deleteList(id: string) {
    this.store.dispatch(actions.deleteList({ listId: id }));
  }

  ngOnInit() {}
}
