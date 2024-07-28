import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent ) => {
  const ComponentWithAuth = (props) => {
    const router = useRouter();
    useEffect(() => {
      const user = Cookies.get('user');
      if (!user) {
        router.push('/');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;
