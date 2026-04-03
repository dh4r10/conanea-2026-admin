import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import Layout from '@/components/Layout';

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated() ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoutes;
