import { MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import Select, { ISelectProps } from 'shared/theme/components/Select';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { useCampaignQuery } from 'features/quiz/queries';

export function FormCampaignSelect({
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
  const filters = useBoundStore.use.quizTableFilters();
  const { data } = useCampaignQuery(filters, {
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
          placeholder={placeholder || 'Select campaign'}
          color={errors[name] ? 'error' : undefined}
          hint={(errors[name]?.message as string) ?? ''}
          clearable={clearable}
          handleClear={handleClear}
        >
          {data?.map?.((campaign) => (
            <MenuItem value={campaign?.code} key={campaign?.campaignId}>
              {campaign?.name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
