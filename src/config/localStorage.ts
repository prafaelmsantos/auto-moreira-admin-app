import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { ISelectedFilters, defaultFilters } from '../models/Filter';
import { IUser } from '../models/identity/User';
import { setFilters } from '../redux/filtersSlice';

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? (JSON.parse(user) as IUser) : null;
};

export const getCurrentFilters = () => {
  const filters = localStorage.getItem('filters');
  return filters ? (JSON.parse(filters) as ISelectedFilters) : null;
};

export const setCurrentFilters = (
  selectedFilters: ISelectedFilters,
  dispatch: ThunkDispatch<
    {
      userSlice: any;
      filtersSlice: any;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>
): void => {
  dispatch(setFilters(selectedFilters));
  localStorage.setItem('filters', JSON.stringify(selectedFilters));
};

export const clearFilters = (
  dispatch: ThunkDispatch<
    {
      userSlice: any;
      filtersSlice: any;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>
): void => {
  dispatch(setFilters(defaultFilters));
  localStorage.setItem('filters', JSON.stringify(defaultFilters));
};
