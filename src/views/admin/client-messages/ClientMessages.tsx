import { useQuery } from '@apollo/client';

import { CLIENT_MESSAGES } from './queries/ClientMessages';
import { convertToClientMessage } from './models/ClientMessage';
import Table from '../../../components/table/Table';
import { columns } from './views/components/ClientMessageColumns';
import { Box } from '@mui/material';
import {
  clientMessages,
  clientMessages_clientMessages_nodes
} from './queries/types/clientMessages';

export default function ClientMessages() {
  const { data, loading } = useQuery<clientMessages>(CLIENT_MESSAGES);

  const rows =
    data?.clientMessages?.nodes?.map((clientMessage) =>
      convertToClientMessage(
        clientMessage as clientMessages_clientMessages_nodes
      )
    ) ?? [];

  return (
    <main>
      <Box sx={{ mt: 12.3 }}>
        <Table {...{ rows, loading, columns }} />
      </Box>
    </main>
  );
}
