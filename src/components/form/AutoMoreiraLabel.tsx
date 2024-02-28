type IAutoMoreiraLabel = {
  error?: boolean;
  label: string;
  required?: boolean;
  children: JSX.Element;
};

export default function AutoMoreiraLabel({
  error,
  label,
  children,
  required
}: IAutoMoreiraLabel) {
  return (
    <div className="items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-5 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
      <p
        className={`${'text-sm'} ${error ? 'text-red-600' : 'text-gray-600'}`}
      >{`${label}${required ? '*' : ''}`}</p>
      <p className="text-base font-medium text-navy-700 dark:text-white">
        {children}
      </p>
    </div>
  );
}
