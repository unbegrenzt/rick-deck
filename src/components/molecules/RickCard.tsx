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
    <article className="flex flex-col justify-center p-5 rounded-lg bg-gray-200 gap-5">

      <HeartCheckbox
        {...{
          checked: checked,
          disabled: disabled,
          indeterminate: indeterminate,
          onChange: onChange,
        }}
      />

      <img
        className='w-24 h-24 rounded-lg self-center'
        src={'https://rickandmortyapi.com/api/character/avatar/2.jpeg'} />

      <div className='flex flex-col rounded-lg p-2 gap-2 bg-[#606C38] text-[#FEFAE0]'>
        <section>
          <h2>
            <b>{character.name}</b>
          </h2>
          <div className='flex items-center gap-2'>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <p>
              {`${character.status} - ${character.species}`}
            </p>
          </div>
        </section>
        <section>
          <h6>
            {`Last known location`}
          </h6>
          <p>
            <b>{`${character.location.name}`}</b>
          </p>
        </section>
      </div>
    </article>
  )
}