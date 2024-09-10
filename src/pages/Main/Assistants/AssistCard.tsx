import Button from 'components/form/Button'

import { IAssistant } from '.'

import { toLocaleStr } from 'utils'

import PhoneIcon from '/svgs/phone.svg'
import TrashIcon from '/svgs/trash.svg'

export default function AssistCard({
  avatar = PhoneIcon,
  status,
  title,
  type,
  createdAt
}: IAssistant) {
  return (
    <div className="flex flex-col gap-y-4 rounded-xl border-1 border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <img src={avatar} alt="Phone Svg Icon" className="size-7" />
        <div className="flex items-center gap-x-1 rounded-lg border-1 border-gray-200 bg-gray-50 p-1">
          <span
            className={`size-2 shrink-0 rounded-full ${
              status ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <p className="text-[12px]">Voice</p>
          <img src="" alt="" />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-[16px] font-medium leading-[24px] text-slate-700">
          {title}
        </p>
        <p className="text-[14px] font-medium leading-[24px] text-gray-500">
          {type}
        </p>
        <p className="text-[14px] font-medium leading-[24px] text-gray-400">
          Created {toLocaleStr(createdAt)}
        </p>
      </div>
      <div className="flex h-8 items-stretch gap-x-2">
        <Button
          color="white"
          className="flex aspect-square h-full items-center justify-center border-gray-300 p-0 hover:border-inherit hover:bg-gray-200"
        >
          <img
            src={TrashIcon}
            alt="Remove Icon"
            className="size-4 max-w-[16px]"
          />
        </Button>
        <Button
          color="white"
          className="flex grow items-center justify-center border-gray-300 py-0 hover:border-inherit hover:bg-gray-200"
        >
          Open
        </Button>
      </div>
    </div>
  )
}
