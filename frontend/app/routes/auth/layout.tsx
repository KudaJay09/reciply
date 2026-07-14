import { authClient } from "@/lib/auth-client"
import { Outlet } from "react-router"

const AuthLayout = () => {
  const {
    data: session,
    isPending,
    error,
    refetch,
  } = authClient.useSession()

  if (isPending) {
    // return <Loader />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AuthLayout
