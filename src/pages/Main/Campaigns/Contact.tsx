import { MouseEvent, useEffect, useState } from 'react'
import { enqueueSnackbar } from 'notistack'

import ContactCard, { IContact } from './ContactCard'

import { HttpService } from 'utils/axios'

interface IContactProps {
  contactLists: IContact[]
}

export default function Contact({ contactLists }: IContactProps) {
  const [contacts, setContacts] = useState<IContact[]>([])

  const onContactClick = (id: number) => {
    setContacts(
      contacts.map((contact: IContact, index: number) =>
        id === index ? { ...contact, isChecked: !contact.isChecked } : contact
      )
    )
  }

  const onCallClick = (e: MouseEvent<HTMLSpanElement>, contact: IContact) => {
    e.stopPropagation()
    HttpService.get('/chat', {
      campaign_id: contact.campaignId,
      contact_id: contact.id
    }).then((response) => {
      const { status } = response
      if (status === 200) {
        enqueueSnackbar('Call started!', { variant: 'success' })
      }
    })
  }

  useEffect(() => {
    setContacts(contactLists)
  }, [contactLists])

  return (
    <div className="flex flex-col gap-y-1.5 overflow-y-auto p-4">
      {contacts.map((contact: IContact, index: number) => (
        <ContactCard
          key={index}
          {...contact}
          toggleCheck={() => onContactClick(index)}
          startCall={(e: any) => onCallClick(e, contact)}
        />
      ))}
    </div>
  )
}
