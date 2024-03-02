import { useQuery } from '@apollo/client';
import { convertToMark } from './models/Mark';
import { MARKS } from './models/graphQL/Marks';
import Table from '../../../components/table/Table';
import PageHolder from '../../../components/base/PageHolder';
import { IMode } from '../../../models/enums/Base';
import GetActions from '../../../components/base/Actions';

import { useNavigate } from 'react-router-dom';
import { columns } from './views/components/MarkColumns';
import { addMarkNavigate } from './views/utils/Utils';
import { useEffect, useState } from 'react';
import { marks, marks_marks_nodes } from './models/graphQL/types/marks';

export default function Marks() {
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery<marks>(MARKS);

  const rows =
    data?.marks?.nodes
      ?.map((mark) => convertToMark(mark as marks_marks_nodes))
      ?.sort((a, b) => a.id - b.id) ?? [];

  const handleAdd = () => navigate(addMarkNavigate);

  useEffect(() => {
    void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <PageHolder
        actions={GetActions({
          mode: IMode.LIST,
          handleAdd,
          idsToDelete
        })}
      />
      <Table {...{ rows, loading, columns, setIdsToDelete }} />
    </main>
  );
}
