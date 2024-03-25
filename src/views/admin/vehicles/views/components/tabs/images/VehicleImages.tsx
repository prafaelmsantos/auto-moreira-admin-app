import { Box, Grid, IconButton, Tooltip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { IVehicleImage } from '../../../../models/Vehicle';
import ImageCard from './Details/ImageCard';
import AutoMoreiraLabel from '../../../../../../../components/form/AutoMoreiraLabel';

const VehicleImages = ({
  vehicleImages,
  handleChangeImages
}: {
  vehicleImages: IVehicleImage[];
  handleChangeImages: (vehicleImages: IVehicleImage[]) => void;
}) => {
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
        const reader = new FileReader();
        file = files[i];
        reader.onload = () => {
          setImages((old) => [
            ...old,
            {
              id: old.length + 1,
              url: reader.result?.toString() ?? ''
            }
          ]);
        };
        return reader.readAsDataURL(file);
      });
    }
  };

  const handleImageUpload = () =>
    fileInput && fileInput.current && fileInput.current.click();

  useEffect(() => {
    void handleChangeImages(images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <Box sx={{ mt: 3, px: 5 }}>
      <AutoMoreiraLabel
        label=""
        children={
          <>
            <Grid
              container
              spacing={4}
              px={2}
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
            <div className="border-white-400 -bottom-12 flex h-[40px] w-[40px] items-center justify-center rounded-full border-[4px] bg-white dark:!border-navy-700">
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
