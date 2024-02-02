import { MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'shared/theme/components/Select';

export function QuizOptionSelect({
  optionList,
  name,
  placeholder,
  clearable,
  ...others
}: any) {
  const {
    control,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const vendorId = watch('correctOptionNumber')?.id || '';

  const handleClear = () => {
    setValue(name, '');
  };
  console.log({ optionList });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          {...others}
          value={vendorId}
          placeholder={placeholder || 'Select Vendor'}
          color={errors[name] ? 'error' : undefined}
          hint={(errors[name]?.message as string) ?? ''}
          clearable={clearable}
          handleClear={handleClear}
          onChange={(item) => {
            const option = optionList?.find((el) => el === item.target.value);

            setValue('correctOption', {
              name: option,
              //   id: option?.optionId,
              //   logo_url: option?.logoUrl,
            });
            clearErrors('correctOption');
          }}
        >
          {optionList?.map?.((option, index) => (
            <MenuItem value={option} key={index}>
              {option}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
