import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from './context/authContext';

const withAuth = (WrappedComponent, requiredRole) => (props) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || (requiredRole && !user[requiredRole])) {
      router.push('/unauthorized');
    }
  }, [user, router, requiredRole]);

  if (!user || (requiredRole && !user[requiredRole])) {
    return null;
  }

  return <WrappedComponent {...props} />;
};

export default withAuth;
