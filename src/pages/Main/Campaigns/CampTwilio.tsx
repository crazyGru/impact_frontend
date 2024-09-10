import Input from 'components/form/Input'
import { ChangeEvent } from 'react'

export interface ITwilio {
  accountSID: string
  authToken: string
  twilioNumber: string
}

type ICampTwilioProps = ITwilio & {
  onTwilioChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function CampTwilio({
  accountSID,
  authToken,
  twilioNumber,
  onTwilioChange
}: ICampTwilioProps) {
  return (
    <div className="flex max-w-screen-md flex-col gap-y-2 p-4">
      <Input
        name="accountSID"
        label="Account SID"
        placeholder=""
        value={accountSID}
        updateValue={onTwilioChange}
      />
      <Input
        name="authToken"
        label="Auth Token"
        placeholder=""
        value={authToken}
        updateValue={onTwilioChange}
      />
      <Input
        name="twilioNumber"
        label="Twilio Number"
        placeholder=""
        value={twilioNumber}
        updateValue={onTwilioChange}
      />
    </div>
  )
}
