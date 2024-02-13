import { useQuery } from '@apollo/client';

import { CLIENT_MESSAGES } from './models/graphQL/ClientMessages';
import { convertToClientMessage } from './models/ClientMessage';
import Table from '../../../components/table/Table';
import { columns } from './views/components/Columns/ClientMessageColumns';
import { Box } from '@mui/material';
import {
  clientMessages,
  clientMessages_clientMessages_nodes
} from './models/graphQL/types/clientMessages';

export default function ClientMessages() {
  const { data, loading } = useQuery<clientMessages>(CLIENT_MESSAGES);

  const rows =
    data?.clientMessages?.nodes
      ?.map((clientMessage) =>
        convertToClientMessage(
          clientMessage as clientMessages_clientMessages_nodes
        )
      )
      ?.sort((a, b) => b.id - a.id) ?? [];

  return (
    <main>
      <Box sx={{ mt: 12.3 }}>
        <Table {...{ rows, loading, columns }} />
      </Box>
    </main>
  );
}
