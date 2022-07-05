import { createAction, props } from '@ngrx/store';
import { ItemList } from '../models/item-list.model';
import { List } from '../models/list.model';

export const createList = createAction(
  '[List] createList',
  props<{ list: List }>()
);
export const addItem = createAction(
  '[Item] addItem',
  props<{ item: ItemList; listId: string }>()
);
export const updateItem = createAction(
  '[Item] updateItem',
  props<{ finishp: boolean; desc: string; idList: string }>()
);
export const finishedList = createAction(
  '[List] finishedList',
  props<{ listId: string; finished: boolean }>()
);
export const deleteItem = createAction(
  '[Item] deleteItem',
  props<{ itemId: string; listId: string }>()
);
export const deleteList = createAction(
  '[List] deleteList',
  props<{ listId: string }>()
);
