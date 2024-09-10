import { useLocation, useNavigate } from 'react-router-dom'

import Logo from '/logo.svg'

interface INavItem {
  icon: React.ReactNode
  label: string
  path: string
}

export const sidebarNavItems: INavItem[] = [
  { icon: <></>, label: 'Assistants', path: '/assistants' },
  { icon: <></>, label: 'Campaigns', path: '/campaigns' },
  // { icon: <></>, label: 'API Keys', path: '/api-keys' },
  { icon: <></>, label: 'Settings', path: '/settings' }
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname

  const navigateToPage = (path: string) => {
    navigate(`/main${path}`)
  }

  return (
    <div className="flex h-full w-[100px] shrink-0 flex-col gap-y-6 border border-r-1 border-gray-200 px-4 py-6 md:w-[250px]">
      <img src={Logo} alt="Sidebar Logo" className="max-w-[120px]" />
      <ul className="flex flex-col gap-y-2">
        {sidebarNavItems.map((item: INavItem, index: number) => (
          <li
            key={index}
            className={`flex cursor-pointer gap-x-2 rounded-md p-2 text-[14px] font-medium text-gray-600 hover:bg-gray-100 ${
              pathname.endsWith(item.path)
                ? 'border-1 border-violet-300 bg-violet-200 text-violet-900 hover:bg-violet-200'
                : ''
            }`}
            onClick={() => navigateToPage(item.path)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
