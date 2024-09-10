import { ChangeEvent, useState, useEffect } from 'react'

import Input from 'components/form/Input'
import Button from 'components/form/Button'

import { HttpService } from 'utils/axios'
import { enqueueSnackbar } from 'notistack'

export default function Setting() {
  const [dailyLimit, setDailyLimit] = useState<number>(20)

  const onSaveClick = () => {
    HttpService.post('/limit', { daily_limit: dailyLimit }).then((response) => {
      const { status } = response
      if (status === 200) {
        enqueueSnackbar('Daily limit changed!', { variant: 'success' })
      }
    })
  }

  useEffect(() => {
    HttpService.get('/limit').then((response) => {
      const { status, data } = response
      if (status === 200) {
        setDailyLimit(data)
      }
    })
  }, [])

  return (
    <div className="p-4">
      <div className="w-full rounded-md border-1 border-gray-200 bg-white p-6 lg:w-1/2">
        <h1 className="mb-2 font-medium">Daily Call Limit</h1>
        <p className="mb-2 text-[14px]">
          This setting limits the number of calls that users have per day.
        </p>
        <Input
          name="dailyLimit"
          label="Daily Limit"
          value={dailyLimit.toString()}
          updateValue={(e: ChangeEvent<HTMLInputElement>) =>
            setDailyLimit(Number(e.target.value))
          }
        />
        <div className="mt-2 flex justify-end">
          <Button onClick={onSaveClick}>Save</Button>
        </div>
      </div>
    </div>
  )
}
