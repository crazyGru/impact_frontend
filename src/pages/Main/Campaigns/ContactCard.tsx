import { MouseEvent } from 'react'
import clsx from 'clsx'

import PhoneCall from '/svgs/phone-call.svg'

export interface IContact {
  id?: string
  campaignId?: string
  fullname: string
  phone: string
  email: string
  status: string
  isChecked?: boolean
}

type EventProps = {
  toggleCheck: () => void
  startCall: (e: MouseEvent<HTMLSpanElement>) => void
}

export type IContactCardProps = IContact & EventProps

export default function ContactCard({
  fullname,
  phone,
  toggleCheck,
  startCall,
  status
}: IContactCardProps) {
  return (
    <div
      className={clsx(
        'flex cursor-pointer items-center justify-between rounded-md border-1 border-gray-200 px-4 py-2.5',
        status === 'completed'
          ? 'bg-emerald-500'
          : status === 'busy'
            ? 'bg-red-500'
            : status === 'no-answer'
              ? 'bg-yellow-500'
              : 'bg-white'
      )}
      onClick={toggleCheck}
    >
      <div className="flex flex-col gap-y-1">
        <p
          className={clsx(
            'text-[14px]',
            status === 'none' ? 'text-slate-600' : 'text-white'
          )}
        >
          {fullname}
        </p>
        <p
          className={clsx(
            'text-[12px] opacity-80',
            status === 'none' ? 'text-gray-600' : 'text-white'
          )}
        >
          {phone}
        </p>
      </div>
      <span
        className={clsx(
          'flex size-8 items-center justify-center rounded-full border-1 border-gray-200',
          status === 'none'
            ? 'hover:bg-slate-50'
            : 'bg-slate-50 hover:bg-slate-100'
        )}
        onClick={startCall}
      >
        <img alt="Phone Icon" src={PhoneCall} className="size-5" />
      </span>
    </div>
  )
}
