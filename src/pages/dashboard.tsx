import { useEffect } from 'react';

import { Can } from '../components/Can';
import { useAuth } from '../hooks/useAuth';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard() {
  const { user, signOut, isAuthenticated } = useAuth();

  useEffect(() => {
    api.get('/me').then(response => console.log(response));
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign out</button>

      <Can permissions={['metrics.list']}>
        <div>métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  console.log(response.data);

  return {
    props: {}
  };
});
