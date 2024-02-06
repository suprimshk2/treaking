import { MenuItem, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'shared/theme/components/Select';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { useGameParticipantsQuery } from 'features/quiz/queries';

export function FormGameParticipantsSelect({
  name,
  gameId,
  placeholder,
  clearable,
  ...others
}: any) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  // const [searchParams] = useSearchParams();

  // const gameId = searchParams.get('id') ?? '';

  const filters = useBoundStore.use.quizTableFilters();
  const { data } = useGameParticipantsQuery(gameId, filters, {
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
          placeholder={placeholder || 'Select participants'}
          color={errors[name] ? 'error' : undefined}
          hint={(errors[name]?.message as string) ?? ''}
          clearable={clearable}
          handleClear={handleClear}
        >
          {!data?.length && (
            <Typography m={5} textAlign="center">
              No Participants found
            </Typography>
          )}
          {data?.map?.((participants) => (
            <MenuItem value={participants?.userId} key={participants?.userId}>
              {participants?.demographic?.firstName}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
