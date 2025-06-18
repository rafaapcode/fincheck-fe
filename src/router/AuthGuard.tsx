import { Navigate, Outlet } from 'react-router-dom';

interface AuthGuardProps {
  isPrivate?: boolean;
}

function AuthGuard({ isPrivate = false }: AuthGuardProps) {
  const signedIn = false;

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />
  }

  return <Outlet />;
}
export default AuthGuard