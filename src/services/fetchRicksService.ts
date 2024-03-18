import {
  PaginationState,
} from '@tanstack/react-table'
import { ensureCharacterArray } from 'utils/objectMapUtil';

import { Character, FetcherMeta } from 'types/index';

export async function fetchRicksData(options: PaginationState, meta: FetcherMeta) {

  const RICKS_MORTY_API_URL = import.meta.env.VITE_RICKS_MORTY_API_URL;
  if (!RICKS_MORTY_API_URL) {
    throw new Error('RICKS_MORTY_API_URL no está definido en las variables de entorno.');
  }

  let data: Character[];

  if (Object.keys(meta.data).length > 0) {
    const response = await fetch(
      `${RICKS_MORTY_API_URL}/character/${Object.keys(meta.data)}`
    );
    data = await response.json();
  } else {
    data = []
  }

  return {
    rows: ensureCharacterArray(data),
    pageCount: Math.ceil(data.length / options.pageSize),
    rowCount: data.length,
  }
}

export async function fetchFromServer(options: PaginationState) {

  const RICKS_MORTY_API_URL = import.meta.env.VITE_RICKS_MORTY_API_URL;
  if (!RICKS_MORTY_API_URL) {
    throw new Error('RICKS_MORTY_API_URL no está definido en las variables de entorno.');
  }

  const response = await fetch(
    `${RICKS_MORTY_API_URL}/character?page=${(options.pageIndex + 1)}&count=${options.pageSize}`
  );
  const data = await response.json();

  return {
    rows: data.results,
    pageCount: data.info.pages,
    rowCount: data.info.count,
  }
}
