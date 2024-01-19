import { useQuery } from '@apollo/client';
import { convertToMark } from '../../../models/Mark';
import { MARKS } from '../../../queries/Marks';
import { marks_marks_nodes, marks } from '../../../queries/types/marks';
import Table from '../../../components/table/Table';
import { addMarkNavigate, columns } from './utils/Utils';
import PageHolder from '../../../components/base/PageHolder';
import { IMode } from '../../../models/enums/Base';
import GetActions from '../../../components/base/Actions';

import { useNavigate } from 'react-router-dom';

export default function Marks() {
  const navigate = useNavigate();

  const { data, loading } = useQuery<marks>(MARKS);

  const rows =
    data?.marks?.nodes?.map((mark) =>
      convertToMark(mark as marks_marks_nodes)
    ) ?? [];

  const handleAdd = () => navigate(addMarkNavigate);

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
