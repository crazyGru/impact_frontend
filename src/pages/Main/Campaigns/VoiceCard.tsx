import { MouseEvent } from 'react'
import clsx from 'clsx'
import { HiOutlineSpeakerWave } from 'react-icons/hi2'

import { capitalizeFirstLetter, trimString } from 'utils/string'

interface IVoiceCardProps {
  name: string
  description: string
  accent: string
  isSelected: boolean
  isPlaying: boolean
  selectVoice: () => void
  playVoice: (e: MouseEvent<HTMLOrSVGElement>) => void
}

export default function VoiceCard({
  name,
  description,
  accent,
  isSelected,
  isPlaying,
  selectVoice,
  playVoice
}: IVoiceCardProps) {
  return (
    <div
      className={clsx(
        'group flex cursor-pointer items-center justify-between rounded-md border-1 border-gray-200 px-2 py-2.5',
        { 'bg-violet-100': isSelected, 'hover:bg-slate-100': !isSelected }
      )}
      onClick={selectVoice}
    >
      <div className="flex flex-col gap-y-0.5">
        <p className="text-[14px] font-medium">{name}</p>
        <p
          className={clsx('text-[13px] text-gray-600', {
            'text-violet-700': isSelected
          })}
        >
          {description && `${capitalizeFirstLetter(trimString(description))}, `}
          {accent && capitalizeFirstLetter(trimString(accent))}
        </p>
      </div>
      {!isPlaying ? (
        <HiOutlineSpeakerWave
          className={clsx('hidden text-[24px] font-medium group-hover:block', {
            'group-hover:text-violet-700': isSelected
          })}
          onClick={playVoice}
        />
      ) : (
        <svg
          className="m-0 size-7 animate-spin text-violet-700"
          viewBox="0 0 16 16"
        >
          <circle
            cx="8"
            cy="8"
            fill="none"
            r="6"
            strokeWidth="1"
            stroke={isSelected && isPlaying ? 'red' : 'black'}
            strokeDasharray="20 36"
            strokeLinecap="round"
            strokeDashoffset="0"
          />
        </svg>
      )}
    </div>
  )
}
