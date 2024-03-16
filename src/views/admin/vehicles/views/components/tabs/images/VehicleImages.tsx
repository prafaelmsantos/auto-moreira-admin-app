import { Grid, IconButton, Tooltip } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
//import './VehicleImages.css';
import { IVehicleImage } from '../../../../models/Vehicle';
import ImageCard from './Details/ImageCard';

const VehicleImages = ({
  vehicleImages,
  handleChangeImages
}: {
  vehicleImages: IVehicleImage[];
  handleChangeImages: (vehicleImages: IVehicleImage[]) => void;
}) => {
  const [images, setImages] = useState<IVehicleImage[]>(vehicleImages);

  const moveImage = useCallback((dragIndex: number, hoverIndex: number) => {
    setImages((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];

      clonedCards.splice(hoverIndex, 0, removedItem);

      return clonedCards;
    });
  }, []);

  const remodeItem = (index: number) => {
    const updatedItems = [...images];
    updatedItems.splice(index, 1);
    setImages(updatedItems);
  };

  const fileInput = useRef<HTMLInputElement>(null);

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      /* e.target.files.forEach((file: Blob) => {
        reader.readAsDataURL(file);
        const result = reader.result?.toString();
        if (result)
          setImages((old) => [...old, { id: 0, img: result, title: 'xD' }]);
      }); */

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

  //URL.createObjectURL(file)
  console.log(images);

  const handleImageUpload = () =>
    fileInput && fileInput.current && fileInput.current.click();

  useEffect(() => {
    void handleChangeImages(images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <main>
      <Grid container spacing={4} direction="row" alignItems="center">
        {images.map((image, index) => (
          <>
            <ImageCard
              remodeItem={remodeItem}
              key={image.id}
              src={image.url}
              title={'image.title'}
              id={image.id}
              index={index}
              moveImage={moveImage}
            />
          </>
        ))}
      </Grid>
      <div className="border-white-400 bg-dark -bottom-12 flex h-[40px] w-[40px] items-center justify-center rounded-full border-[4px] dark:!border-navy-700">
        <Tooltip title={'Editar'} arrow>
          <IconButton onClick={handleImageUpload} color="inherit" size="small">
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
    </main>
  );
};

export default VehicleImages;
