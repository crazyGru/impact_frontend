import { ChangeEvent, useState } from 'react'

import Input from 'components/form/Input'
import Button from 'components/form/Button'
import AssistCard from './AssistCard'

export interface IAssistant {
  avatar?: string
  status: boolean
  title: string
  type: 'Inbound' | 'Outbound'
  createdAt: string
}

const dummyData: IAssistant[] = [
  {
    status: false,
    title: 'Outbound Test',
    type: 'Outbound',
    createdAt: '02/28/2024'
  }
]

export default function Asistants() {
  const [searchValue, setSearchValue] = useState('')
  const [assistants] = useState<IAssistant[]>(dummyData)

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="px-4 py-8">
      <div className="flex justify-between">
        <Input
          name="search"
          value={searchValue}
          updateValue={onSearchChange}
          placeholder="Search name, description, type, model ID..."
          className="max-w-[500px]"
        />
        <Button>Create Assistant</Button>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {assistants.map((item: IAssistant, index: number) => (
          <AssistCard key={index} {...item} />
        ))}
      </div>
    </div>
  )
}
