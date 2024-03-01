import { Tooltip, IconButton } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { RouteName } from '../../../models/enums/RouteType';
import { useNavigate } from 'react-router-dom';

interface IActions {
  editTitle?: string;
  deleteTitle: string;
  routeName: RouteName;
  id: number;
  onlyDelete?: boolean;
  disabled?: boolean;
}

export default function Actions({
  editTitle,
  deleteTitle,
  routeName,
  id,
  disabled
}: IActions) {
  const navigate = useNavigate();

  return (
    <>
      <Tooltip title={editTitle} arrow>
        <IconButton
          onClick={() => navigate(`/admin/${routeName}/${id}`)}
          sx={{
            '&:hover': {
              background: blue[100]
            },
            color: blue[500]
          }}
          color="inherit"
          size="small"
        >
          <EditTwoToneIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title={deleteTitle} arrow>
        <IconButton
          disabled={disabled}
          sx={{
            '&:hover': { background: red[100] },
            color: red[500]
          }}
          color="inherit"
          size="small"
        >
          <DeleteTwoToneIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );
}
