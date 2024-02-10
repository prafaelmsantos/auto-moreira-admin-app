import { useQuery } from '@apollo/client';
import Table from '../../../components/table/Table';
import { addModelNavigate } from './views/utils/Utils';
import { MODELS } from './queries/Models';
import { convertToModel } from './models/Model';
import { useNavigate } from 'react-router-dom';
import PageHolder from '../../../components/base/PageHolder';
import GetActions from '../../../components/base/Actions';
import { IMode } from '../../../models/enums/Base';
import { columns } from './views/components/ModelColumns';
import { models, models_models_nodes } from './queries/types/models';
import { useEffect } from 'react';

export default function Models() {
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery<models>(MODELS);

  const rows =
    data?.models?.nodes
      ?.map((model) => convertToModel(model as models_models_nodes))
      ?.sort((a, b) => a.id - b.id) ?? [];

  const handleAdd = () => navigate(addModelNavigate);

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
