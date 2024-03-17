import {
  Character
} from 'src/services/fetchRicksService';

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
    <article className="flex flex-col lg:flex-row justify-around md:min-h-80 lg:min-h-36 p-5 rounded-lg bg-gray-200 gap-5">
      <HeartCheckbox
        {...{
          checked: checked,
          disabled: disabled,
          indeterminate: indeterminate,
          onChange: onChange,
        }}
      />

      <img
        className='w-24 lg:w-36 h-24 lg:h-36 rounded-lg self-center'
        src={character.image}
      />

      <div className='flex flex-col rounded-lg p-2 lg:w-2/3 gap-2 bg-[#606C38] text-[#FEFAE0]'>
        <section>
          <h2 className='lg:text-2xl'>
            <b>{character.name}</b>
          </h2>
          <div className='flex items-center gap-2 lg:text-md'>
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
