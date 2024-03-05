import { Grid, IconButton, Tooltip } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useCallback, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import './VehicleImages.css';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import { MdOutlineDelete } from 'react-icons/md';

interface CardProps {
  src: string;
  title: string;
  id: number;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  remodeItem: (index: number) => void;
}
interface IImage {
  img: string;
  title: string;
  id: number;
}

const galleryList: IImage[] = [
  {
    id: 1,
    title: 'jsjs',
    img: 'https://res.cloudinary.com/terieyenike/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1649443651/react%20dnd/DTS_The_Green_Copson_Londan_5077.jpg'
  },
  {
    id: 2,
    title: 'jsjs',
    img: 'https://res.cloudinary.com/terieyenike/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1649443650/react%20dnd/DTS_Closer_Parole_Dure_5144.jpg'
  },
  {
    id: 3,
    title: 'jsjs',
    img: 'https://res.cloudinary.com/terieyenike/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1649443650/react%20dnd/DTS_Misc_1__Nich_Fancher__Nick_Fancher_4532.jpg'
  },
  {
    id: 4,
    title: 'jsjs',
    img: 'https://res.cloudinary.com/terieyenike/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1649443800/react%20dnd/_MG_9747_nk0tz2_c_scale_w_509.jpg'
  }
];

const Card: React.FC<CardProps> = ({
  src,
  title,
  id,
  index,
  moveImage,
  remodeItem
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'image',
    hover: (item: IImage & { index: number }, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'image',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging()
      };
    }
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  return (
    <Grid item xs={3}>
      <div ref={ref} style={{ opacity }}>
        <Grid container justifyContent={'center'}>{`#${index + 1}`}</Grid>
        <img src={src} alt={title} loading="lazy" className={'item'} />
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item>
            <IconButton
              onClick={() => moveImage(index, index === 0 ? 0 : index - 1)}
              sx={{
                '&:hover': {
                  background: blue[100]
                },
                color: 'secondary'
              }}
              color="inherit"
              size="small"
            >
              <FaChevronLeft fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => moveImage(index, index + 1)}
              sx={{
                '&:hover': {
                  background: blue[100]
                },
                color: 'secondary'
              }}
              color="inherit"
              size="small"
            >
              <FaChevronRight fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => remodeItem(index)}
              sx={{
                '&:hover': {
                  background: blue[100]
                },
                color: 'secondary'
              }}
              color="inherit"
              size="small"
            >
              <MdOutlineDelete fontSize="medium" />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

const VehicleImages = () => {
  const [images, setImages] = useState<IImage[]>(galleryList);

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
              img: reader.result?.toString() ?? '',
              title: 'xD'
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

  return (
    <main>
      <Grid container spacing={4} direction="row" alignItems="center">
        {images.map((image, index) => (
          <>
            <Card
              remodeItem={remodeItem}
              key={image.id}
              src={image.img}
              title={image.title}
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
