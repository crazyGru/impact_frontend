import { ChangeEvent, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from 'components/form/Input'
import Button from 'components/form/Button'
import CampCard from './CampCard'

import { HttpService } from 'utils/axios'
import { migrateKeys } from 'utils/object'

interface IContact {
  name: string
  phone: string
}

export interface ICampaign {
  id?: string
  name: string
  ownerName: string
  role: string
  companyName: string
  companyBusiness: string
  companyValues: string
  convPurpose: string
  convType: string
  isCustomPrompt: boolean
  customPrompt: string
  contacts: IContact[]
}

const migration = {
  campaign_name: 'name',
  salesperson_name: 'ownerName',
  salesperson_role: 'role',
  company_name: 'companyName',
  company_business: 'companyBusiness',
  company_values: 'companyValues',
  conversation_purpose: 'convPurpose',
  conversation_type: 'convType',
  use_custom_prompt: 'isCustomPrompt',
  custom_prompt: 'customPrompt'
}

export default function Campaigns() {
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState('')
  const [campaigns, setCampaigns] = useState<ICampaign[]>([])

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const navigateToCreate = () => {
    navigate('/main/campaigns/create?action=create-campaign')
  }

  useEffect(() => {
    HttpService.get('/campaigns').then((response) => {
      const { status, data } = response
      if (status === 200) {
        const resJson = (data || []).map((item: any) =>
          migrateKeys(item, migration)
        )
        setCampaigns(resJson)
      }
    })
  }, [])

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
        <Button onClick={navigateToCreate}>Create Campaign</Button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {campaigns.map((item: ICampaign, index: number) => (
          <CampCard key={index} {...item} />
        ))}
      </div>
    </div>
  )
}
