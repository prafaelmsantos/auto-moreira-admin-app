import { Autocomplete, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { AutocompleteSX } from './style/AutocompleteSX';

type IAutoCompleteFormValidation = {
  error?: boolean;
  helperText?: string;
  label?: string;
  control: Control<any, any>;
  defaultValue?: string | number | null;
  name: string;
  options: any[];
  required?: boolean;
};

export default function AutoCompleteFormValidation({
  error,
  helperText,
  label,
  control,
  defaultValue,
  name,
  options,
  required
}: IAutoCompleteFormValidation) {
  return (
    <div className="items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-5 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
      <p
        className={`${'text-sm'} ${error ? 'text-red-600' : 'text-gray-600'}`}
      >{`${label}${required ? '*' : ''}`}</p>
      <p className="text-base font-medium text-navy-700 dark:text-white">
        <Controller
          render={({ field }) => (
            <Autocomplete
              {...field}
              sx={{ mt: 0.5 }}
              color="red"
              isOptionEqualToValue={(option, value) => option === value}
              options={options.map((x) => x.id)}
              getOptionLabel={(option) =>
                options.find((x) => x.id === option)?.name ?? ''
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  error={error}
                  helperText={helperText}
                  sx={AutocompleteSX(error ?? false)}
                />
              )}
              onChange={(_, data) => field.onChange(data)}
            />
          )}
          name={name}
          control={control}
          defaultValue={defaultValue}
        />
      </p>
    </div>
  );
}
