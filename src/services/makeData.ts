import { faker } from '@faker-js/faker'
import { ColumnSort, SortingState } from '@tanstack/react-table'

type CharacterOrigin = {
  name: string;
  url: string;
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

export type PersonApiResponse = {
  data: Character[]
  meta: {
    totalRowCount: number
  }
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
