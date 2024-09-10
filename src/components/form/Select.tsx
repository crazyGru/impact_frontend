import { useMemo, useState } from 'react'
import clsx from 'clsx'

import ChevronDownIcon from '/svgs/chevrondown.svg'
import ChevronUpIcon from '/svgs/chevronup.svg'

interface ISelectItem {
  name: string
  value: string
}

interface ISelectProps {
  label?: string
  // placeholder?: string
  // name: string
  value: string
  values: ISelectItem[]
  updateValue: (e: string) => void
  // className?: string
}

export default function Select({
  label = '',
  // placeholder = '',
  // name,
  value,
  values,
  updateValue
  // className = ''
}: ISelectProps) {
  const [isDropping, setIsDropping] = useState(false)
  const curName = useMemo(() => {
    const curItem = values.find((item) => item.value === value) || { name: '' }
    return curItem.name
  }, [values, value])

  const onItemClick = (id: number) => {
    const selectItem = values[id] || { value: '' }
    updateValue(selectItem.value)
    setIsDropping(false)
  }

  return (
    <div className="flex w-full flex-col gap-y-2">
      {label && (
        <label className="text-[14px] font-medium text-slate-600">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <div
          className={clsx(
            'flex cursor-pointer items-center justify-between rounded-t-md border-1 border-gray-200 px-4 py-2 transition-all duration-300',
            { 'rounded-b-md': !isDropping }
          )}
          onClick={() => setIsDropping(!isDropping)}
        >
          <p className="text-[14px]">{curName}</p>
          <img
            src={isDropping ? ChevronUpIcon : ChevronDownIcon}
            alt="Chevron Icon"
            className="size-4"
          />
        </div>
        <ul
          className={clsx(
            'absolute h-fit w-full rounded-b-md border-x-1 border-b-1 border-gray-200',
            { 'max-h-0 overflow-hidden border-none': !isDropping }
          )}
        >
          {values.map((item: ISelectItem, index: number) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-2 text-[14px] hover:bg-slate-200"
              onClick={() => onItemClick(index)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
