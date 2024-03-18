import { RowSelectionState } from "@tanstack/react-table";

export type CharacterOrigin = {
  name: string;
  url: string;
}

export type MetaParameters = {
  isPaginationVisible: boolean,
  isRefetchOnAction: boolean
}

export const defaultMetaParameters: MetaParameters = {
  isPaginationVisible: true,
  isRefetchOnAction: false,
}

export type CharacterLocation = {
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

export type FetcherMeta = {
  data: RowSelectionState
}
