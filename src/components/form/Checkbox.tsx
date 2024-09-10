import { ChangeEvent } from 'react'
import clsx from 'clsx'

interface ICheckboxProps {
  label?: string
  name: string
  checked: boolean
  updateChecked: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function Checkbox({
  name,
  label = '',
  checked = false,
  updateChecked = () => {},
  className = ''
}: ICheckboxProps) {
  return (
    <div className={clsx('flex items-center gap-x-1', className)}>
      <input
        id="checkbox"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={updateChecked}
        className="cursor-pointer"
      />
      <label
        htmlFor="checkbox"
        className="cursor-pointer text-[14px] text-slate-600"
      >
        {label}
      </label>
    </div>
  )
}
