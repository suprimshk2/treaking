import { MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'shared/theme/components/Select';
import { IQuizOptions } from '../interfaces';

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
            setValue(name, item.target.value);
            clearErrors(name);
          }}
        >
          {optionList?.map?.((option: IQuizOptions) => (
            <MenuItem value={option.order} key={option.order}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
