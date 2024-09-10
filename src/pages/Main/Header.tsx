import { useContext, useMemo } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import Button from 'components/form/Button'
import { sidebarNavItems } from './Sidebar'

import { AuthContext } from 'providers/AuthProvider'
import { removeToken } from 'utils/token'

interface IAction {
  name: string
  type: string
}

const actions: IAction[] = [
  {
    name: 'Create Assistant',
    type: 'create-assistant'
  }
]

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { setIsLogin } = useContext(AuthContext)
  const pathname = useMemo(() => location.pathname, [location])
  const subpath = useMemo(() => pathname.slice('/main'.length), [pathname])
  const pageBreadcrumb = useMemo(() => {
    if (!subpath) return ''
    const curItem = sidebarNavItems.find((item) => item.path === subpath) || {
      label: ''
    }
    return curItem.label
  }, [subpath])
  const actionBreadcrumb = useMemo(() => {
    const action = searchParams.get('action') || ''
    const actionItem = actions.find((item) => item.type === action) || {
      name: ''
    }
    return actionItem.name
  }, [searchParams])
  const onLogoutClick = () => {
    setIsLogin(false)
    removeToken()
    navigate('/auth/login')
  }

  return (
    <div className="flex w-full items-center justify-between border-b-1 border-gray-200 p-4">
      <div className="flex gap-x-2 text-[14px] font-medium text-gray-600">
        <p>{pageBreadcrumb}</p>
        {actionBreadcrumb && (
          <>
            <span>/</span>
            <p>{actionBreadcrumb}</p>
          </>
        )}
        {/* <span>/</span>
        <p>Outbound</p> */}
      </div>
      <div className="flex gap-x-4">
        <Button color="white" padding="dense">
          Help
        </Button>
        <Button color="white" padding="dense">
          Updates
        </Button>
        <Button color="white" padding="dense" onClick={onLogoutClick}>
          Log out
        </Button>
      </div>
    </div>
  )
}
