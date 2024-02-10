import { Control } from 'react-hook-form';
import { IUserUpdate } from '../../../models/User';
import TextFieldFormValidation from '../../../../../../components/form/TextFieldFormValidation';

interface IGeneral {
  name: string;
  label: string;
  value: string | null;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  control: Control<IUserUpdate>;
  disabled?: boolean;
}

const GeneralCard = ({
  label,
  value,
  required,
  error,
  helperText,
  control,
  name,
  disabled
}: IGeneral) => {
  return (
    <div className="items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
      <p className="text-sm text-gray-600">{`${label}${
        required ? '*' : ''
      }`}</p>
      <p className="text-base font-medium text-navy-700 dark:text-white">
        <TextFieldFormValidation
          error={error}
          helperText={helperText}
          control={control}
          defaultValue={value}
          name={name}
          variant="standard"
          disabled={disabled}
          disableUnderline={disabled}
        />
      </p>
    </div>
  );
};

export default GeneralCard;
