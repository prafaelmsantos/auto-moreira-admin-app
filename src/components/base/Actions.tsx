import { FaPlusCircle, FaCheck } from 'react-icons/fa';
import { FaPencil, FaXmark } from 'react-icons/fa6';
import { IAction } from './PageHolder';
import { IMode } from '../../models/enums/Base';
import { LuUpload } from 'react-icons/lu';
import { MdOutlineDeleteOutline } from 'react-icons/md';

interface IGetActions {
  mode: IMode;
  handleAdd?: () => void;
  handleEdit?: () => void;
  handleSumbitAdd?: () => void;
  handleSubmitEdit?: () => void;
  handleSubmitDelete?: () => void;
  handleUpload?: () => void;
  handleClose?: () => void;
  idsToDelete?: number[];
  upload?: boolean;
}
export default function GetActions({
  mode,
  handleAdd,
  handleSumbitAdd,
  handleSubmitEdit,
  handleSubmitDelete,
  handleClose,
  handleEdit,
  idsToDelete,
  handleUpload,
  upload
}: IGetActions): IAction[] {
  switch (mode) {
    case IMode.LIST:
      const btns = [
        {
          icon: <MdOutlineDeleteOutline />,
          callback: () => handleSubmitDelete && void handleSubmitDelete()
        },
        {
          icon: <FaPlusCircle />,
          callback: () => handleAdd && void handleAdd()
        }
      ];

      return idsToDelete && idsToDelete.length !== 0
        ? handleAdd
          ? btns
          : btns.slice(0, 1)
        : handleAdd
        ? btns.slice(1, 2)
        : [];

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
          icon: <LuUpload />,
          callback: () => handleUpload && void handleUpload()
        },
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
