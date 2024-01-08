import { MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import Select, { ISelectProps } from 'shared/theme/components/Select';

import { useRolesQuery } from 'features/settings/roles-and-permissions/queries';
import { useBoundStore } from 'shared/stores/useBoundStore';

export function FormRoleSelect({
  name,
  placeholder,
  clearable,
  ...others
}: Omit<ISelectProps, 'children'>) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const filters = useBoundStore.use.roleTableFilters();
  const { data } = useRolesQuery(filters, {
    enabled: true,
  });

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
          placeholder={placeholder || 'Select role'}
          color={errors[name] ? 'error' : undefined}
          hint={(errors[name]?.message as string) ?? ''}
          clearable={clearable}
          handleClear={handleClear}
        >
          {data?.map?.((role) => (
            <MenuItem value={role.code} key={role.name}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
