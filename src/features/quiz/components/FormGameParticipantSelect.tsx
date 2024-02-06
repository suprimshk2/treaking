import { MenuItem, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'shared/theme/components/Select';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { useGameParticipantsQuery } from 'features/quiz/queries';
import { formatFullName } from 'shared/utils/common';

export function FormGameParticipantsSelect({
  name,
  gameId,
  placeholder,
  clearable,
  participantsId,
  ...others
}: any) {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const participant = watch(participantsId) || '';
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
          value={participant}
          placeholder={placeholder || 'Select participants'}
          color={errors[name] ? 'error' : undefined}
          hint={(errors[name]?.message as string) ?? ''}
          clearable={clearable}
          handleClear={handleClear}
          onChange={(item) => {
            const participants = data?.find(
              (el) => el.userId === item.target.value
            );

            setValue(
              name,
              formatFullName(
                participants?.demographic?.firstName ?? '',
                participants?.demographic?.lastName ?? ''
              )
            );
            setValue(participantsId, participants?.userId);
          }}
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
