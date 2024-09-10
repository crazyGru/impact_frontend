import { ChangeEvent } from 'react'

interface IInputProps {
  label?: string
  type?: string
  placeholder?: string
  name: string
  value: string
  updateValue?: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function Input({
  label = '',
  type = 'text',
  placeholder = '',
  name,
  value,
  updateValue = () => {},
  className = ''
}: IInputProps) {
  return (
    <div className="flex w-full flex-col gap-y-2">
      {label && (
        <label className="text-[14px] font-medium text-slate-600">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={updateValue}
          className={`w-full rounded-md border-1 border-gray-200 px-3 py-2 text-[14px] outline-none transition-all duration-300 focus:border-indigo-500 ${className}`}
        />
      </div>
    </div>
  )
}
