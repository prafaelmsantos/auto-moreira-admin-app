import { Box, Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { IVehicleImage, VehicleKeys } from '../../models/Vehicle';
import ImageCard from '../components/cards/ImageCard';
import AutoMoreiraLabel from '../../../../../components/form/AutoMoreiraLabel';
import { IVehicleValidationSchema } from '../../services/VehicleValidationSchema';
import { useFormContext } from 'react-hook-form';
import { useAppDispatch } from '../../../../../redux/hooks';
import { setModal } from '../../../../../redux/modalSlice';
import { MessageType } from '../../../../../models/enums/MessageTypeEnum';
import { MAX_FILE_SIZE, imageTypes } from '../../../../../utils/Helppers';
import ImageButton from '../components/buttons/ImageButton';

interface IVehicleImages {
  vehicleImages: IVehicleImage[];
}
const VehicleImages = ({ vehicleImages }: IVehicleImages) => {
  const dispatch = useAppDispatch();
  const [images, setImages] = useState<IVehicleImage[]>(vehicleImages);

  const moveImage = (dragIndex: number, hoverIndex: number) => {
    setImages((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];
      clonedCards.splice(hoverIndex, 0, removedItem);
      return clonedCards;
    });
  };

  const remodeItem = (index: number) => {
    const updatedItems = [...images];
    updatedItems.splice(index, 1);
    setImages(updatedItems);
  };

  const fileInput = useRef<HTMLInputElement>(null);

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      const files = Array.from(e.target.files) as Blob[];
      files.map((file: Blob, i: number) => {
        file = files[i];
        if (
          imageTypes.find((x) => x === file.type) &&
          file.size <= MAX_FILE_SIZE
        ) {
          const reader = new FileReader();
          reader.onload = () => {
            setImages((old) => [
              ...old,
              {
                id: old.length + 1,
                url: reader.result?.toString() ?? '',
                isMain: false
              }
            ]);
          };
          return reader.readAsDataURL(file);
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
      });
    }
  };

  const handleImageUpload = () =>
    fileInput && fileInput.current && fileInput.current.click();

  const { setValue } = useFormContext<IVehicleValidationSchema>();

  useEffect(() => {
    void setValue<any>(VehicleKeys.vehicleImages, images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <Box sx={{ mt: 3, px: 5 }}>
      <AutoMoreiraLabel
        label="Imagens"
        children={
          <>
            <div className="flex justify-end">
              {images.length !== 0 && (
                <ImageButton handleClick={() => setImages([])} deleteBtn />
              )}

              <ImageButton handleClick={handleImageUpload} />
            </div>

            <Grid
              container
              spacing={4}
              px={2}
              sx={{ minHeight: 150 }}
              direction={'row'}
              alignItems={'center'}
              justifyItems={'center'}
            >
              {images.map((image, index) => (
                <ImageCard
                  remodeItem={remodeItem}
                  key={image.id}
                  src={image.url}
                  title={`${index + 1}`}
                  id={image.id}
                  index={index}
                  moveImage={moveImage}
                />
              ))}
            </Grid>

            <input
              accept="image/png, image/gif, image/jpeg, image/jpeg"
              ref={fileInput}
              type="file"
              id="upload-button"
              style={{ display: 'none' }}
              multiple
              onChange={handleChange}
            />
          </>
        }
      />
    </Box>
  );
};

export default VehicleImages;
