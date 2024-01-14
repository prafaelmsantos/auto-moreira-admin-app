import { useQuery } from '@apollo/client';
import Table from '../../../components/table';
import { columns } from './utils/Utils';
import { models, models_models_nodes } from '../../../queries/types/models';
import { MODELS } from '../../../queries/Models';
import { convertToModel } from '../../../models/Model';

export default function Models() {
  const { data, loading } = useQuery<models>(MODELS);

  const rows =
    data?.models?.nodes?.map((model) =>
      convertToModel(model as models_models_nodes)
    ) ?? [];

  return (
    <main>
      <Table {...{ rows, loading, columns }} />
    </main>
  );
}
