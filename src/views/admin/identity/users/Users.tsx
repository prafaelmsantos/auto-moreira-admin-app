import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PageHolder from '../../../../components/base/PageHolder';
import GetActions from '../../../../components/base/Actions';
import { IMode } from '../../../../models/enums/Base';
import Table from '../../../../components/table/Table';
import { USERS } from './models/graphQL/Users';

import { addUserNavigate } from './views/utils/Utils';
import { convertToUser } from './models/User';
import { columns } from './views/components/columns/UserColumns';
import { users, users_users_nodes } from './models/graphQL/types/users';

export default function Users() {
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery<users>(USERS);

  const rows =
    data?.users?.nodes
      ?.map((user) => convertToUser(user as users_users_nodes))
      ?.sort((a, b) => a.id - b.id) ?? [];

  const handleAdd = () => navigate(addUserNavigate);

  useEffect(() => {
    void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <PageHolder
        actions={GetActions({
          mode: IMode.LIST,
          handleAdd
        })}
      />
      <Table {...{ rows, loading, columns }} />
    </main>
  );
}
