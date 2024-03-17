import { faker } from '@faker-js/faker'
import { ColumnSort, RowSelectionState, SortingState } from '@tanstack/react-table'
import {
  PaginationState,
} from '@tanstack/react-table'
import { ensureCharacterArray } from 'utils/objectMapUtil';

type CharacterOrigin = {
  name: string;
  url: string;
}

export type MetaParameters = {
  isPaginationVisible: boolean,
}

export const defaultMetaParameters: MetaParameters = {
  isPaginationVisible: true,
}

type CharacterLocation = {
  name: string;
  url: string;
}

export type Character = {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown'
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: CharacterOrigin;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export type CharacterApiResponse = {
  data: Character[]
  meta: {
    totalRowCount: number
  }
}

export type FetcherResult = {
  rows: Character[]
  pageCount: number
  rowCount: number
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newCharacter = (index: number): Character => {
  return {
    id: index + 1,
    name: faker.person.firstName(),
    status: faker.helpers.shuffle<Character['status']>([
      'Alive',
      'Dead',
      'unknown',
    ])[0]!,
    species: faker.person.lastName(),
    type: faker.color.human(),
    gender: faker.helpers.shuffle<Character['gender']>([
      'Female',
      'Male',
      'Genderless',
      'unknown',
    ])[0]!,
    origin: {
      name: faker.location.city(),
      url: faker.internet.url(),
    },
    location: {
      name: faker.location.city(),
      url: faker.internet.url(),
    },
    image: faker.image.avatar(),
    episode: [faker.internet.url()],
    url: faker.internet.url(),
    created: faker.date.recent(),
  };
};


export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Character[] => {
    const len = lens[depth]!
    return range(len).map((d): Character => {
      return {
        ...newCharacter(d),
      }
    })
  }

  return makeDataLevel()
}

const data = makeData(1000)

//simulates a backend api
export const fetchData = async (
  start: number,
  size: number,
  sorting: SortingState
) => {
  const dbData = [...data]
  if (sorting.length) {
    const sort = sorting[0] as ColumnSort
    const { id, desc } = sort as { id: keyof Character; desc: boolean }
    dbData.sort((a, b) => {
      if (desc) {
        return a[id] < b[id] ? 1 : -1
      }
      return a[id] > b[id] ? 1 : -1
    })
  }

  //simulate a backend api
  await new Promise(resolve => setTimeout(resolve, 200))

  return {
    data: dbData.slice(start, start + size),
    meta: {
      totalRowCount: dbData.length,
    },
  }
}

export function createData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Character[] => {
    const len = lens[depth]!
    return range(len).map((d): Character => {
      return {
        ...newCharacter(d)
      }
    })
  }

  return makeDataLevel()
}

export type FetcherMeta = {
  data: RowSelectionState
}

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
