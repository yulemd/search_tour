// TODO: to move to models

import { storageKeys } from '@/constants';

type ClearStorageType = () => void;

export const clearStorage: ClearStorageType = () => {
  removeRootState();
  removeApiError();
};

// ROOT STATE

type GetRootStateType = () => Promise<object>;

export const getRootState: GetRootStateType = () => {
  try {
    const json = localStorage.getItem(storageKeys.rootState);
    const rootState = json && JSON.parse(json);
    return rootState || {};
  } catch (error) {
    console.error(`Error while loading ${storageKeys.rootState}`, error);
    return {};
  }
};

type SaveRootStateType = (data: object) => void;

export const saveRootState: SaveRootStateType = (rootState) =>
  localStorage.setItem(storageKeys.rootState, JSON.stringify(rootState));

type RemoveRootStateType = () => void;

export const removeRootState: RemoveRootStateType = () =>
  localStorage.removeItem(storageKeys.rootState);

// API ERROR

type GetApiErrorType = () => string;

export const getApiError: GetApiErrorType = () => {
  try {
    const apiError = localStorage.getItem(storageKeys.apiError);
    return apiError || '';
  } catch (error) {
    console.error(`Error while loading ${storageKeys.apiError}`, error);
    return '';
  }
};

type SaveApiErrorType = (apiError: string) => void;

export const saveApiError: SaveApiErrorType = (apiError) =>
  localStorage.setItem(storageKeys.apiError, apiError);

type RemoveApiErrorType = () => void;

export const removeApiError: RemoveApiErrorType = () =>
  localStorage.removeItem(storageKeys.apiError);
