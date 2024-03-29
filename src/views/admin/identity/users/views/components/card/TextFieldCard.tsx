import { Control } from 'react-hook-form';
import TextFieldFormValidation from '../../../../../../../components/form/TextFieldFormValidation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/store';

interface IGeneral {
  name: string;
  label: string;
  value?: string | null;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  control: Control<any>;
  disabled?: boolean;
  type?: string;
  multiline?: boolean;
  rows?: number;
  endAdornment?: boolean;
  showPassword?: boolean;
  handleClickShowPassword?: () => void;
}

const TextField = ({
  label,
  value,
  required,
  error,
  helperText,
  control,
  name,
  disabled,
  type,
  multiline,
  rows,
  endAdornment,
  showPassword,
  handleClickShowPassword
}: IGeneral) => {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);

  return (
    <div
      className={`items-start justify-center rounded-2xl ${
        !darkMode ? 'bg-white' : ''
      } bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ${
        darkMode ? '!bg-navy-700 dark:shadow-none' : ''
      }`}
    >
      <p
        className={`${'text-sm'} ${error ? 'text-red-600' : 'text-gray-600'}`}
      >{`${label}${required ? '*' : ''}`}</p>
      <p
        className={`text-base font-medium ${
          !darkMode ? 'text-navy-700' : 'text-white'
        }`}
      >
        <TextFieldFormValidation
          error={error}
          helperText={helperText}
          control={control}
          defaultValue={value}
          name={name}
          variant="standard"
          disabled={disabled}
          disableUnderline={disabled}
          type={type}
          multiline={multiline}
          rows={rows}
          endAdornment={endAdornment}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
        />
      </p>
    </div>
  );
};

export default TextField;
