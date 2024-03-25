import { useQuery } from '@apollo/client';

import { CLIENT_MESSAGES } from './models/graphQL/ClientMessages';
import { convertToClientMessage } from './models/ClientMessage';
import Table from '../../../components/table/Table';
import { columns } from './views/components/columns/ClientMessageColumns';
import {
  clientMessages,
  clientMessages_clientMessages_nodes
} from './models/graphQL/types/clientMessages';
import { useEffect, useState } from 'react';
import GetActions from '../../../components/base/Actions';
import { IMode } from '../../../models/enums/Base';
import PageHolder from '../../../components/base/PageHolder';

export default function ClientMessages() {
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
  const { data, loading, refetch } = useQuery<clientMessages>(CLIENT_MESSAGES);

  const rows =
    data?.clientMessages?.nodes
      ?.map((clientMessage) =>
        convertToClientMessage(
          clientMessage as clientMessages_clientMessages_nodes
        )
      )
      ?.sort((a, b) => b.id - a.id) ?? [];

  useEffect(() => {
    void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <PageHolder
        actions={GetActions({
          mode: IMode.LIST,
          idsToDelete
        })}
      />
      <Table {...{ rows, loading, columns, setIdsToDelete }} />
    </main>
  );
}
