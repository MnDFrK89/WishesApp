import { ItemList } from './item-list.model';
import { EntityState } from '@ngrx/entity';
import { itemAdapter } from '../store/wishes.reducers';

export class List {
  id: string;
  title: string;
  createIn: Date;
  finishIn?: Date;
  finish: boolean;
  items: EntityState<ItemList>;
  constructor(title: string) {
    this.title = title;
    this.createIn = new Date();
    this.finish = false;
    this.id = new Date().getTime().toString();
    this.items = itemAdapter.getInitialState();
  }
}
