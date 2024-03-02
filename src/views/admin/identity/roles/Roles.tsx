import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ROLES } from './models/graphQL/Roles';

import { convertToRole } from './models/Role';
import { useEffect } from 'react';
import PageHolder from '../../../../components/base/PageHolder';
import GetActions from '../../../../components/base/Actions';
import { IMode } from '../../../../models/enums/Base';
import Table from '../../../../components/table/Table';
import { columns } from './views/components/columns/RoleColumns';
import { addRoleNavigate } from './views/components/utils/Utils';
import { roles, roles_roles_nodes } from './models/graphQL/types/roles';

export default function Roles() {
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery<roles>(ROLES);

  const rows =
    data?.roles?.nodes
      ?.map((role) => convertToRole(role as roles_roles_nodes))
      ?.sort((a, b) => a.id - b.id) ?? [];

  const handleAdd = () => navigate(addRoleNavigate);

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
