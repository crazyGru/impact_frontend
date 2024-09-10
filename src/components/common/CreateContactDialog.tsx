import clsx from 'clsx'
import Button from 'components/form/Button'

import Input from 'components/form/Input'

import { IContact } from 'pages/Main/Campaigns/ContactCard'
import { ChangeEvent, useState } from 'react'

interface ICreateContactDialogProps {
  open: boolean
  onClose?: () => void
  onCreate?: (contact: IContact) => void
}

const initialContact: IContact = {
  fullname: '',
  phone: '',
  email: ''
}

export default function CreateContactDialog({
  open,
  onClose = () => {},
  onCreate = () => {}
}: ICreateContactDialogProps) {
  const [contact, setContact] = useState<IContact>(initialContact)

  const onContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  }

  const onCreateClick = () => {
    onCreate(contact)
    setContact(initialContact)
    onClose()
  }

  return (
    <div
      className={clsx(
        'fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-slate-400/50 backdrop-blur-sm',
        { hidden: !open }
      )}
    >
      <div className="flex w-full max-w-screen-md flex-col gap-y-3.5 rounded-md border-1 border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-[18px] font-medium">Create Contact</p>
          <span
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-slate-500 text-[24px] text-white"
            onClick={onClose}
          >
            &times;
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <Input
            name="fullname"
            label="Full Name"
            placeholder="John Cooper"
            value={contact.fullname}
            updateValue={onContactChange}
          />
          <Input
            name="email"
            label="Email"
            placeholder="johncooper@gmail.com"
            value={contact.email}
            updateValue={onContactChange}
          />
          <Input
            name="phone"
            label="Phone Number"
            placeholder="+12672705839"
            value={contact.phone}
            updateValue={onContactChange}
          />
        </div>
        <div className="flex items-center justify-end">
          <Button onClick={onCreateClick}>Create</Button>
        </div>
      </div>
    </div>
  )
}
