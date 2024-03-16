import {
  Character
} from 'services/makeData';

import HeartCheckbox from 'components/atoms/HeartCheckbox';


export default function RickCard({
  character,
  checked,
  disabled,
  indeterminate,
  onChange
}: { 
  character: Character
  checked: boolean
  disabled: boolean
  indeterminate: boolean
  onChange: (event: unknown) => void
}) {

  return (
    <article className="flex">

      <HeartCheckbox
        {...{
          checked: checked,
          disabled: disabled,
          indeterminate: indeterminate,
          onChange: onChange,
        }}
      />
      <img src={'https://rickandmortyapi.com/api/character/avatar/2.jpeg'} />

      <div>
        <h3>
          {character.name}
        </h3>
        <p>
          <span className="p-1 bg-green-500"></span> {`${character.status} - ${character.species}`}
        </p>

        <h5>
          {`Last known location`}
        </h5>
        <p>
          {`${character.location.name}`}
        </p>
      </div>
    </article>
  )
}