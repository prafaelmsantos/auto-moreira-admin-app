// Custom components

import { UseFormRegisterReturn } from 'react-hook-form';

function InputField(props: {
  id: string;
  label: string;
  extra: string;
  placeholder: string;
  variant: string;
  disabled?: boolean;
  type?: string;
  error?: boolean;
  helperText?: string;
  register?: UseFormRegisterReturn<string>;
}) {
  const {
    label,
    id,
    extra,
    type,
    placeholder,
    variant,
    disabled,
    register,
    error,
    helperText
  } = props;

  return (
    <div className={`${extra}`}>
      <label
        htmlFor={id}
        className={`text-sm text-navy-700 dark:text-white ${
          variant === 'auth' ? 'ml-1.5 font-medium' : 'ml-3 font-bold'
        }`}
      >
        {label}
      </label>
      <input
        {...register}
        disabled={disabled}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
          disabled
            ? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
            : error
            ? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
            : 'border-gray-200 dark:!border-white/10 dark:text-white'
        }`}
      />

      {error && (
        <label
          htmlFor={id}
          className={
            'ml-1.5 mt-1 flex text-sm font-medium text-red-500 dark:!text-red-400'
          }
        >
          {helperText}
        </label>
      )}
    </div>
  );
}

export default InputField;
