import { MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import Select, { ISelectProps } from 'shared/theme/components/Select';

import { useRolesQuery } from 'features/settings/roles-and-permissions/queries';
import { useBoundStore } from 'shared/stores/useBoundStore';

export function FormVendorSelect({
  name,
  placeholder,
  clearable,
  ...others
}: Omit<ISelectProps, 'children'>) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const filters = useBoundStore.use.roleTableFilters();
  const { data } = useRolesQuery(filters, {
    enabled: true,
  });

  const vendorId = watch('vendor')?.id || '';

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
          value={vendorId}
          placeholder={placeholder || 'Select Vendor'}
          color={errors[name] ? 'error' : undefined}
          hint={(errors[name]?.message as string) ?? ''}
          clearable={clearable}
          handleClear={handleClear}
          onChange={(item) => {
            const vendor = data?.find((el) => el._id === item.target.value);
            setValue('vendor', { name: vendor?.name, id: vendor?._id });
          }}
        >
          {data?.map?.((vendor) => (
            <MenuItem value={vendor._id} key={vendor._id}>
              {vendor.name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
