import { useNavigate } from 'react-router-dom'

import { ICampaign } from '.'
import Button from 'components/form/Button'

import PhoneIcon from '/svgs/phone.svg'
import TrashIcon from '/svgs/trash.svg'

export default function CampCard({
  id,
  name,
  ownerName,
  role,
  convType
}: ICampaign) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-y-4 rounded-xl border-1 border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <img
          src={convType === 'call' ? PhoneIcon : ''}
          alt="Conversation Icon"
          className="size-7 rounded-lg"
        />
      </div>
      <div>
        <p className="text-[18px] font-medium text-gray-600">{name}</p>
        <p className="text-[14px] font-medium">{ownerName}</p>
        <span className="rounded-md border-1 border-gray-200 px-1.5 py-0.5 text-[12px]">
          {role}
        </span>
      </div>
      <div className="flex h-8 items-stretch gap-x-2">
        <Button
          color="white"
          className="flex aspect-square h-full items-center justify-center border-gray-300 p-0 hover:border-inherit hover:bg-gray-200"
        >
          <img
            src={TrashIcon}
            alt="Remove Icon"
            className="size-4 max-w-[16px]"
          />
        </Button>
        <Button
          color="white"
          className="flex grow items-center justify-center border-gray-300 py-0 hover:border-inherit hover:bg-gray-200"
          onClick={() => navigate(`/main/campaigns/${id}`)}
        >
          Open
        </Button>
      </div>
    </div>
  )
}
