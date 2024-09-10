import { ChangeEvent, useState } from 'react'

interface ITextInputProps {
  label?: string
  placeholder?: string
  name: string
  value: string
  updateValue: (e: ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
}

export default function TextInput({
  label = '',
  placeholder = '',
  name,
  value,
  updateValue,
  className = ''
}: ITextInputProps) {
  const [hasFocus, setFocus] = useState(false)

  return (
    <div className="flex w-full flex-col gap-y-2">
      {label && (
        <label className="text-[14px] font-medium text-slate-600">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          rows={hasFocus ? 5 : 1}
          onChange={updateValue}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`w-full resize-none rounded-md border-1 border-gray-200 px-3 py-2 text-[14px] outline-none transition-all duration-300 focus:border-indigo-500 ${className}`}
        />
      </div>
    </div>
  )
}
