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

  const correctOption = watch(name) || '';

  const handleClear = () => {
    setValue(name, 0);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          {...others}
          value={correctOption}
          placeholder={placeholder || 'Select Correct Option'}
          color={errors[name] ? 'error' : undefined}
          hint={(errors[name]?.message as string) ?? ''}
          clearable={clearable}
          handleClear={handleClear}
          onChange={(item) => {
            const itemIndex = optionList?.indexOf(
              optionList?.find((el, index) => index + 1 === item.target.value)
            );

            setValue(name, itemIndex + 1);
            clearErrors(name);
          }}
        >
          {optionList?.map?.((option, index) => (
            <MenuItem value={index + 1} key={index}>
              {option}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
