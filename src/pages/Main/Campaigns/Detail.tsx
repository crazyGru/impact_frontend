import { useMemo, useState, ChangeEvent, useEffect } from 'react'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import CSVReader from 'react-csv-reader'

import Button from 'components/form/Button'
import CreateContactDialog from 'components/common/CreateContactDialog'

import CampGeneral from './CampGeneral'
import CampTwilio from './CampTwilio'
import CampVoice from './CampVoice'
import Contact from './Contact'

import { ICampaign } from '.'
import { ITwilio } from './CampTwilio'
import { IContact } from './ContactCard'

import { HttpService } from 'utils/axios'
import { filterKeys, migrateKeys } from 'utils/object'

import {
  CREATE_CAMPAIGN_FIELDS_STEP,
  CREATE_CAMPAIGN_API_STEP,
  CREATE_CAMPAIGN_VOICE_STEP
} from 'components/constants'

import CsvIcon from '/svgs/csv.svg'

const initialCampaign: ICampaign = {
  id: '',
  name: '',
  ownerName: '',
  role: '',
  companyName: '',
  companyBusiness: '',
  companyValues: '',
  convPurpose: '',
  convType: 'call',
  isCustomPrompt: false,
  customPrompt: '',
  contacts: []
}

const initialTwilioInfo: ITwilio = {
  accountSID: '',
  authToken: '',
  twilioNumber: ''
}

const campaignMigration = {
  name: 'campaign_name',
  ownerName: 'salesperson_name',
  role: 'salesperson_role',
  companyName: 'company_name',
  companyBusiness: 'company_business',
  companyValues: 'company_values',
  convPurpose: 'conversation_purpose',
  convType: 'conversation_type',
  isCustomPrompt: 'use_custom_prompt',
  customPrompt: 'custom_prompt'
}

const campaignRevMigration = {
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

const twilioMigration = {
  accountSID: 'twilio_sid',
  authToken: 'twilio_token',
  twilioNumber: 'twilio_number'
}

const twilioRevMigration = {
  twilio_sid: 'accountSID',
  twilio_token: 'authToken',
  twilio_number: 'twilioNumber'
}

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header: any) => header.toLowerCase().replace(/\W/g, '_')
}

const stepStatements = {
  [CREATE_CAMPAIGN_FIELDS_STEP]: {
    header: 'Assistant Setting',
    title:
      'The first step is to customize your assistant according to your needs'
  },
  [CREATE_CAMPAIGN_API_STEP]: {
    header: 'Twilio Account Setting',
    title: 'The second step is to integrate twilio account'
  },
  [CREATE_CAMPAIGN_VOICE_STEP]: {
    header: 'Voice Setting',
    title: 'The third step is to choose sound option'
  }
}

type StepKey = 101 | 102 | 103

export default function Detail() {
  const navigate = useNavigate()
  const { id: campId } = useParams()
  const [searchParams] = useSearchParams()
  const action = useMemo(() => {
    return searchParams.get('action') || ''
  }, [searchParams])

  const [step, setStep] = useState(CREATE_CAMPAIGN_FIELDS_STEP)
  const [twilioInfo, setTwilioInfo] = useState<ITwilio>(initialTwilioInfo)
  const [campaign, setCampaign] = useState<ICampaign>(initialCampaign)
  const [voiceId, setVoiceId] = useState<string>('')
  const [contacts, setContacts] = useState<IContact[]>([])
  const [createContactOpen, setCreateContactOpen] = useState(false)

  const refreshContacts = () => {
    HttpService.get('/contacts', { campaign_id: campId }).then((response) => {
      const { status, data } = response
      if (status === 200) {
        const resJson = (data || []).map((item: IContact) =>
          migrateKeys(item, {
            phone_number: 'phone',
            name: 'fullname',
            campaign_id: 'campaignId'
          })
        )
        setContacts(resJson)
      }
    })
  }

  const onNextClick = () => {
    setStep(step + 1)
  }

  const onPrevClick = () => {
    setStep(step - 1)
  }

  const onTwilioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTwilioInfo({
      ...twilioInfo,
      [e.target.name]: e.target.value
    })
  }

  const onCampaignChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value })
  }

  const onIsPromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.checked })
  }

  const onConvTypeChange = (value: string) => {
    setCampaign({ ...campaign, convType: value })
  }

  const onSubmitClick = () => {
    const reqJson = {
      ...migrateKeys(
        filterKeys(campaign, ['id', 'contacts'], 'exclude'),
        campaignMigration
      ),
      ...migrateKeys(twilioInfo, twilioMigration),
      voice_id: voiceId
    }
    if (campId !== 'create') {
      return HttpService.put('/campaign', reqJson, { id: campId }).then(
        (response) => {
          const { status } = response
          if (status === 200) {
            enqueueSnackbar('Campaign updated successfully!', {
              variant: 'success'
            })
            navigate('/main/campaigns')
          }
        }
      )
    }
    HttpService.post('/campaign', reqJson).then((response) => {
      const { status } = response
      if (status === 200) {
        enqueueSnackbar('Campaign added successfully!', {
          variant: 'success'
        })
        navigate('/main/campaigns')
      }
    })
  }

  const onContactCreate = (contact: IContact) => {
    HttpService.post(
      '/contact',
      migrateKeys(contact, { fullname: 'name', phone: 'phone_number' }),
      {
        campaign_id: campId
      }
    ).then((response) => {
      const { status } = response
      if (status === 200) {
        enqueueSnackbar('Contact added successfully!', {
          variant: 'success'
        })
        setCreateContactOpen(false)
        refreshContacts()
      }
    })
  }

  const onCsvUpload = (data: Array<any>) => {
    const reqJosn = data.map((row) => ({
      ...row,
      phone_number: `+${row.phone_number.toString()}`
    }))
    HttpService.post('/contacts', reqJosn, { campaign_id: campId }).then(
      (response) => {
        const { status } = response
        if (status === 200) {
          enqueueSnackbar('Csv upload successfully!', { variant: 'success' })
          refreshContacts()

          const uploadInput: HTMLInputElement = document.getElementById(
            'id-csv-reader'
          ) as HTMLInputElement
          if (uploadInput) {
            uploadInput.value = ''
          }
        }
      }
    )
  }

  const onCsvError = (err: Error) => {
    enqueueSnackbar(err.message, { variant: 'error' })
  }

  useEffect(() => {
    if (!campId || campId === 'create') return
    HttpService.get(`/campaign/${campId}`).then((response) => {
      const { status, data } = response
      if (status === 200) {
        const resJson = migrateKeys(data || {}, {
          ...campaignRevMigration,
          ...twilioRevMigration
        })
        setCampaign(
          filterKeys(resJson, [
            ...Object.keys(campaignMigration),
            'id'
          ]) as ICampaign
        )
        setTwilioInfo(
          filterKeys(resJson, Object.keys(twilioMigration)) as ITwilio
        )
        setVoiceId(resJson.voice_id)
      }
    })
    HttpService.get('/contacts', { campaign_id: campId }).then((response) => {
      const { status, data } = response
      if (status === 200) {
        const resJson = (data || []).map((item: IContact) =>
          migrateKeys(item, {
            phone_number: 'phone',
            name: 'fullname',
            campaign_id: 'campaignId'
          })
        )
        setContacts(resJson)
      }
    })
  }, [campId])

  return (
    <div className="flex h-full gap-x-4 p-4">
      <div className="flex grow flex-col overflow-y-auto rounded-lg border-1 border-gray-200 bg-white">
        <div className="border-b-1 border-b-gray-200 p-4">
          <h1 className="text-[20px] font-bold text-gray-600">
            {stepStatements[step as StepKey].header}
          </h1>
          <p className="text-[14px]">{stepStatements[step as StepKey].title}</p>
        </div>
        <div className="grow overflow-y-auto">
          {step === CREATE_CAMPAIGN_FIELDS_STEP ? (
            <CampGeneral
              {...campaign}
              onCampaignChange={onCampaignChange}
              onIsPromptChange={onIsPromptChange}
              onConvTypeChange={onConvTypeChange}
            />
          ) : step === CREATE_CAMPAIGN_API_STEP ? (
            <CampTwilio {...twilioInfo} onTwilioChange={onTwilioChange} />
          ) : (
            <CampVoice selectedId={voiceId} onVoiceSelect={setVoiceId} />
          )}
        </div>
        <div className="flex justify-end gap-x-2 border-t-1 border-gray-200 px-4 py-6">
          {step !== CREATE_CAMPAIGN_FIELDS_STEP && (
            <Button onClick={onPrevClick}>Prev</Button>
          )}
          {step !== CREATE_CAMPAIGN_VOICE_STEP && (
            <Button onClick={onNextClick}>Next</Button>
          )}
          {step === CREATE_CAMPAIGN_VOICE_STEP && (
            <Button onClick={onSubmitClick}>
              {campId === 'create' ? 'Create' : 'Update'}
            </Button>
          )}
        </div>
      </div>
      {action !== 'create-campaign' && (
        <div className="flex w-80 shrink-0 flex-col overflow-y-auto rounded-lg border-1 border-gray-200 bg-white">
          <div className="flex items-center justify-between px-4 py-6">
            <p className="text-[18px] font-medium">Contacts</p>
            <div className="flex gap-x-2">
              <span
                className="flex size-7 cursor-pointer select-none items-center justify-center rounded-full bg-slate-700 p-0 text-[24px] leading-[0px] text-white"
                onClick={() => setCreateContactOpen(true)}
              >
                +
              </span>
              <label
                className="flex size-7 cursor-pointer select-none p-0"
                htmlFor="id-csv-reader"
              >
                <img alt="Csv Icon" src={CsvIcon} className="size-7" />
                <CSVReader
                  accept=".csv,.xlsx"
                  cssClass="hidden"
                  inputId="id-csv-reader"
                  parserOptions={papaparseOptions}
                  onFileLoaded={onCsvUpload}
                  onError={onCsvError}
                />
              </label>
            </div>
          </div>
          <Contact contactLists={contacts} />
        </div>
      )}
      <CreateContactDialog
        open={createContactOpen}
        onClose={() => setCreateContactOpen(false)}
        onCreate={onContactCreate}
      />
    </div>
  )
}
