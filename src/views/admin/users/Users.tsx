import { useNavigate } from 'react-router-dom';
import GetActions from '../../../components/base/Actions';
import PageHolder from '../../../components/base/PageHolder';
import { IMode } from '../../../models/enums/Base';

export default function Users() {
  return (
    <main>
      <PageHolder
        actions={GetActions({
          mode: IMode.LIST
        })}
      />
    </main>
  );
}
