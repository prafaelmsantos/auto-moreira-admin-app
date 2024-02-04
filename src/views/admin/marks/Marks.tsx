import { useQuery } from '@apollo/client';
import { convertToMark } from './models/Mark';
import { MARKS } from '../../../queries/Marks';
import { marks_marks_nodes, marks } from '../../../queries/types/marks';
import Table from '../../../components/table/Table';
import PageHolder from '../../../components/base/PageHolder';
import { IMode } from '../../../models/enums/Base';
import GetActions from '../../../components/base/Actions';

import { useNavigate } from 'react-router-dom';
import { columns } from './utils/MarkColumns';
import { addMarkNavigate } from './utils/Utils';
import { useEffect } from 'react';

export default function Marks() {
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery<marks>(MARKS);

  const rows =
    data?.marks?.nodes?.map((mark) =>
      convertToMark(mark as marks_marks_nodes)
    ) ?? [];

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
          handleAdd
        })}
      />
      <Table {...{ rows, loading, columns }} />
    </main>
  );
}
