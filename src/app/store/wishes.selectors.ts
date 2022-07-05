import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as adapters from './wishes.reducers';
import { EntityState } from '@ngrx/entity';
import { List } from '../models/list.model';

const getSelectors = adapters.appAdapter.getSelectors();

const getListFeature = createFeatureSelector<EntityState<List>>('app');

export const getLists = createSelector(getListFeature, getSelectors.selectAll);
export const getItems = (idList: string) =>
  createSelector(getLists, (s) =>
    s.find((element) => element.id === idList) !== undefined
      ? s.find((element) => element.id === idList).items
      : []
  );
