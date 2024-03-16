import { Grid, IconButton } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IVehicleImage } from '../../../../../models/Vehicle';
import { useRef } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import { COLORS } from '../../../../../../../../utils/Colors';

interface IImageCard {
  src: string;
  title: string;
  id: number;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  remodeItem: (index: number) => void;
}

const ImageCard = ({
  src,
  title,
  id,
  index,
  moveImage,
  remodeItem
}: IImageCard) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'image',
    hover: (item: IVehicleImage & { index: number }, monitor) => {
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
      <div
        className="text-navy-700 dark:text-white"
        ref={ref}
        style={{ opacity }}
      >
        <Grid sx={{ mb: 0.5 }} container justifyContent={'center'}>{`#${
          index + 1
        }`}</Grid>
        <img
          src={src}
          alt={title}
          loading="lazy"
          className={'cursor-pointer'}
        />
        <Grid
          sx={{ mt: 0.5 }}
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
                  background: COLORS.AUTO_MOREIRA_GRAY[600]
                }
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
                  background: COLORS.AUTO_MOREIRA_GRAY[600]
                }
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
                  background: COLORS.AUTO_MOREIRA_GRAY[600]
                }
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

export default ImageCard;
