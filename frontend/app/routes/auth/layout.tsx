import Wrapper from "@/components/auth/Wrapper";
import { authClient } from "@/lib/auth-client";
import { Outlet } from "react-router";

const AuthLayout = () => {
  const sessionState = authClient.useSession();
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = sessionState;

  // if (isPending) {
  //   return <Loader />
  // }

  return (
    <div className="app__bg flex items-center justify-center min-h-screen">
      <Wrapper>
        <Outlet />
      </Wrapper>
      {/* {isPending && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {session && <p>Welcome, {session.user.name}!</p>}
      {!session && <p>Please log in.</p>} */}
    </div>
  );
};

export default AuthLayout;
