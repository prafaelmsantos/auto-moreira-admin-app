import { FaPlusCircle, FaCheck } from 'react-icons/fa';
import { FaPencil, FaXmark } from 'react-icons/fa6';
import { IAction } from './PageHolder';
import { IMode } from '../../models/enums/Base';

interface IGetActions {
  mode: IMode;
  handleAdd?: () => void;
  handleEdit?: () => void;
  handleSumbitAdd?: () => void;
  handleSubmitEdit?: () => void;
  handleClose?: () => void;
}
export default function GetActions({
  mode,
  handleAdd,
  handleSumbitAdd,
  handleSubmitEdit,
  handleClose,
  handleEdit
}: IGetActions): IAction[] {
  switch (mode) {
    case IMode.LIST:
      return [
        {
          icon: <FaPlusCircle />,
          callback: () => handleAdd && void handleAdd()
        }
      ];

    case IMode.ADD:
      return [
        {
          icon: <FaXmark />,
          callback: () => handleClose && void handleClose()
        },
        {
          icon: <FaCheck />,
          callback: () => handleSumbitAdd && void handleSumbitAdd()
        }
      ];

    case IMode.EDIT:
      return [
        {
          icon: <FaXmark />,
          callback: () => handleClose && void handleClose()
        },
        {
          icon: <FaCheck />,
          callback: () => handleSubmitEdit && void handleSubmitEdit()
        }
      ];

    case IMode.PREVIEW:
      return [
        {
          icon: <FaPencil />,
          callback: () => handleEdit && void handleEdit()
        }
      ];

    default:
      return [];
  }
}
