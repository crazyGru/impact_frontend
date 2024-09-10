import { Outlet } from 'react-router-dom'

import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex grow flex-col">
        <Header />
        <div className="grow overflow-y-auto bg-slate-50">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
