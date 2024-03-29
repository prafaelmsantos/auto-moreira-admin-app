import { Box, Button, Grid, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { IVehicleImage, VehicleKeys } from '../../models/Vehicle';
import ImageCard from '../components/cards/ImageCard';
import AutoMoreiraLabel from '../../../../../components/form/AutoMoreiraLabel';
import { COLORS } from '../../../../../utils/Colors';
import { LuUpload } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { IVehicleValidationSchema } from '../../services/VehicleValidationSchema';
import { useFormContext } from 'react-hook-form';

interface IVehicleImages {
  vehicleImages: IVehicleImage[];
  handleChangeImages: (vehicleImages: IVehicleImage[]) => void;
}
const VehicleImages = ({
  vehicleImages,
  handleChangeImages
}: IVehicleImages) => {
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

        const imageTypes = [
          'image/png',
          'image/gif',
          'image/jpeg',
          'image/jpeg'
        ];

        if (imageTypes.find((x) => x === file.type)) {
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
        }
      });
    }
  };

  const handleImageUpload = () =>
    fileInput && fileInput.current && fileInput.current.click();

  const { setValue } = useFormContext<IVehicleValidationSchema>();

  useEffect(() => {
    void setValue<any>(VehicleKeys.vehicleImages, images);

    //void handleChangeImages(images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);

  return (
    <Box sx={{ mt: 3, px: 5 }}>
      <AutoMoreiraLabel
        label="Imagens"
        children={
          <>
            <div className="flex justify-end">
              <Stack
                direction="row"
                sx={{
                  minHeight: '50px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <Button
                    size="small"
                    fullWidth
                    onClick={handleImageUpload}
                    sx={{
                      '&:hover': {
                        backgroundColor: darkMode
                          ? COLORS.AUTO_MOREIRA_BRAND[300]
                          : COLORS.AUTO_MOREIRA_BRAND[600],
                        boxShadow: 'none'
                      },
                      backgroundColor: darkMode
                        ? COLORS.AUTO_MOREIRA_BRAND[400]
                        : COLORS.AUTO_MOREIRA_BRAND[500],
                      borderColor: darkMode
                        ? COLORS.AUTO_MOREIRA_BRAND[400]
                        : COLORS.AUTO_MOREIRA_BRAND[500],
                      textTransform: 'none'
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ py: 0.5, color: 'white' }}
                    >
                      <LuUpload />
                    </Stack>
                  </Button>
                </Box>
              </Stack>
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
