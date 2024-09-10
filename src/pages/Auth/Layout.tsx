import { Outlet } from 'react-router-dom'

import Logo from '/logo.svg'

export default function Layout() {
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-2">
      <div className="flex w-full flex-col px-8 py-10">
        <img src={Logo} className="max-w-[120px]" />
        <div className="flex w-full grow items-center justify-center">
          <Outlet />
        </div>
      </div>
      <div className="bg-gradient-to-tr from-indigo-500 to-sky-500"></div>
    </div>
  )
}
