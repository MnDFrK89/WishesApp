/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { createReducer, on } from '@ngrx/store';
import { List } from '../models/list.model';
import * as actions from '../store/wishes.actions';
import { createEntityAdapter } from '@ngrx/entity';
import { ItemList } from '../models/item-list.model';

export const appAdapter = createEntityAdapter<List>({
  selectId: (list) => list.id,
});
export const itemAdapter = createEntityAdapter<ItemList>({
  selectId: (item) => item.description,
});

const listInitialState = appAdapter.getInitialState();

export const listReducer = createReducer(
  listInitialState,
  on(actions.createList, (state, { list }) => appAdapter.addOne(list, state)),
  on(actions.addItem, (state, { item, listId }) =>
    appAdapter.updateOne(
      {
        id: listId,
        changes: {
          items: itemAdapter.addOne(item, state.entities[listId].items),
        },
      },
      state
    )
  ),
  on(actions.updateItem, (state, action) =>
    appAdapter.mapOne(
      {
        id: action.idList,
        map: (list) => ({
          ...list,
          items: itemAdapter.updateOne(
            {
              id: action.desc,
              changes: {
                finish: action.finishp,
              },
            },
            list.items
          ),
        }),
      },
      state
    )
  ),
  on(actions.finishedList, (state, action) =>
    appAdapter.updateOne(
      {
        id: action.listId,
        changes: { finish: action.finished },
      },
      state
    )
  ),
  on(actions.deleteItem, (state, action) =>
    appAdapter.updateOne(
      {
        id: action.listId,
        changes: {
          items: itemAdapter.removeOne(
            action.itemId,
            state.entities[action.listId].items
          ),
        },
      },
      state
    )
  ),
  on(actions.deleteList, (state, action) =>
    appAdapter.removeOne(action.listId, state)
  )
);

export function reducers(state, action) {
  return listReducer(state, action);
}
