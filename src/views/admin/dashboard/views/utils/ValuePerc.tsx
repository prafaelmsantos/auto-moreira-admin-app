import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

const ValuePerc = ({ valuePerc }: { valuePerc: number }) => {
  return (
    <>
      {valuePerc > 0 ? (
        <>
          <MdArrowDropUp className="font-medium text-green-500" />
          <p className="text-sm font-bold text-green-500">{`+${valuePerc}%`}</p>
        </>
      ) : (
        valuePerc < 0 && (
          <>
            <MdArrowDropDown className="font-medium text-red-500" />
            <p className="text-sm font-bold text-red-500">{`-${valuePerc}%`}</p>
          </>
        )
      )}
    </>
  );
};

export default ValuePerc;
