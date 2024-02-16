import { MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import Select, { ISelectProps } from 'shared/theme/components/Select';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { useVendorQuery } from 'features/vendor/queries';

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
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const filters = useBoundStore.use.roleTableFilters();
  const { data } = useVendorQuery(filters);
  const vendorList = data?.data?.rows ?? [];
  console.log(data?.data?.rows, 'data?.data?.rows');

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
            const vendor = vendorList?.find(
              (el) => el.vendorId === item.target.value
            );
            console.log({ vendor });
            console.log('vvv', vendor);

            setValue('vendor', {
              name: vendor?.businessName,
              id: vendor?.vendorId,
              logo_url: vendor?.logoUrl,
              accountManager: vendor?.accountOwner?.name,
            });
            clearErrors('vendor');
          }}
        >
          {vendorList?.map?.((vendor) => (
            <MenuItem value={vendor.vendorId} key={vendor._id}>
              {vendor.businessName}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
