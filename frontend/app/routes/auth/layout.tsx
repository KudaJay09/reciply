import LoadingScreen from "@/components/Loader";
import Wrapper from "@/components/auth/Wrapper";
import { authClient } from "@/lib/auth-client";
import { Navigate, Outlet } from "react-router";
import { toast } from "sonner";

const AuthLayout = () => {
  const sessionState = authClient.useSession();
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = sessionState;

  if (isPending) {
    return <LoadingScreen />;
  }

  if (error) {
    toast.error("Error fetching session. Please try again.");
  }
  const navigateTo = session?.user.role === "admin" ? "/admin" : "/";

  if (session?.session) {
    return <Navigate to={navigateTo} replace />;
  }

  return (
    <div className="app__bg flex items-center justify-center min-h-screen">
      <Wrapper>
        <Outlet />
      </Wrapper>
    </div>
  );
};

export default AuthLayout;
