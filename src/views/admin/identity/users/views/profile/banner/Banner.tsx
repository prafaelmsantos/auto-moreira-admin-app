import avatar from '../../../../../../../assets/img/avatars/default.png';
import banner from '../../../../../../../assets/img/auth/back.jpg';
import Card from '../../../../../../../components/card';
import { IconButton, Tooltip } from '@mui/material';
import { useRef } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { MAX_FILE_SIZE, imageTypes } from '../../../../../../../utils/Helppers';
import { setModal } from '../../../../../../../redux/modalSlice';
import { MessageType } from '../../../../../../../models/enums/MessageTypeEnum';
import { useAppDispatch } from '../../../../../../../redux/hooks';

interface IBanner {
  name: string;
  role: string;
  image: string | null;
  fetchUserImage: (image: string) => void;
}

const Banner = ({ name, role, fetchUserImage, image }: IBanner) => {
  const dispatch = useAppDispatch();
  const fileInput = useRef<HTMLInputElement>(null);

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      const file = e.target.files[0] as Blob;

      if (
        imageTypes.find((x) => x === file.type) &&
        file.size <= MAX_FILE_SIZE
      ) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
          const result = reader.result?.toString();
          result && fetchUserImage(result);
        };
      } else {
        dispatch(
          setModal({
            title: 'Erro Interno do Servidor',
            message:
              'A imagem carregada é inválida! Por favor, verifique o tipo e o tamanho da imagem e tente novamente.',
            type: MessageType.ERROR,
            open: true
          })
        );
      }
    }
  };

  const handleImageUpload = () =>
    fileInput && fileInput.current && fileInput.current.click();

  return (
    <Card extra={'items-center w-full h-full p-[16px] bg-cover'}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-40 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="border-white-400 absolute -bottom-12 flex h-[100px] w-[100px] items-center justify-center rounded-full border-[4px] bg-white dark:!border-navy-700">
          <img
            className="h-full w-full rounded-full"
            src={image ?? avatar}
            alt={`${name} foto`}
          />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-8 flex flex-col">
        <div className="flex justify-between">
          <div className="border-white-400 bg-dark -bottom-12 flex h-[40px] w-[40px] items-center justify-center rounded-full border-[4px] dark:!border-navy-700">
            <Tooltip title={'Apagar'} arrow>
              <IconButton
                color="inherit"
                size="small"
                onClick={() => fetchUserImage(avatar)}
              >
                <DeleteTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="border-white-400 bg-dark -bottom-12 flex h-[40px] w-[40px] items-center justify-center rounded-full border-[4px] dark:!border-navy-700">
            <Tooltip title={'Editar'} arrow>
              <IconButton
                onClick={handleImageUpload}
                color="inherit"
                size="small"
              >
                <EditTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <input
          accept="image/*"
          ref={fileInput}
          type="file"
          id="upload-button"
          style={{ display: 'none' }}
          onChange={handleChange}
        />

        <div className="mt-5 flex flex-col items-center">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            {name}
          </h4>
          <p className="text-base font-normal text-gray-600">{role}</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
