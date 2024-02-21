import { MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import Select, { ISelectProps } from 'shared/theme/components/Select';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { useUserQuery } from 'features/users/queries';
import { IUser } from 'features/users/interfaces';
import { concatString } from 'shared/utils/common';

export function FormUserSelect({
  name,
  placeholder,
  clearable,
  ...others
}: Omit<ISelectProps, 'children'>) {
  const {
    control,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();
  const filters = useBoundStore.use.vendorTableFilters();
  const { data } = useUserQuery(filters, {
    enabled: true,
  });

  const userId = watch(name) || '';

  const handleClear = () => {
    setValue(name, '');
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          {...others}
          value={userId}
          placeholder={placeholder || 'Select user'}
          color={errors[name] ? 'error' : undefined}
          hint={(errors[name]?.message as string) ?? ''}
          clearable={clearable}
          handleClear={handleClear}
        >
          {data?.map?.((user: IUser) => (
            <MenuItem
              value={concatString(
                user?.demographic?.firstName ?? '',
                user?.demographic?.lastName ?? ''
              )}
              key={user?.demographic?.mobileNumber}
            >
              {concatString(
                user?.demographic?.firstName ?? '',
                user?.demographic?.lastName ?? ''
              )}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
