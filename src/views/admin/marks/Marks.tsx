import { useQuery } from '@apollo/client';
import { convertToMark } from '../../../models/Mark';
import { MARKS } from '../../../queries/Marks';
import { marks_marks_nodes, marks } from '../../../queries/types/marks';
import Table from '../../../components/table';
import { columns } from './utils/Utils';

export default function Marks() {
  const { data, loading } = useQuery<marks>(MARKS);

  const rows =
    data?.marks?.nodes?.map((mark) =>
      convertToMark(mark as marks_marks_nodes)
    ) ?? [];

  return (
    <main>
      <Table {...{ rows, loading, columns }} />
    </main>
  );
}
