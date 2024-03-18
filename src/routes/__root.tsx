import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import RicksBottomBar from 'components/organisms/RicksBottomBar'

export const Route = createRootRoute({
  component: () => (
    <>
      <RicksBottomBar />
      <Outlet />
      {import.meta.env.VITE_NODE_ENV === 'development' && (<TanStackRouterDevtools />)}
    </>
  ),
})
