import { Box, Button, Stack, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ButtonSize, ButtonVariant } from 'shared/theme/components/Button';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { UserTableAdvancedFilterFormFields } from './UserTableAdvancedFilterFormFields';
import {
  userAdvancedFilterFormSchema,
  UserAdvancedFilterFormSchemaType,
} from '../schemas';
import { USER_ADVANCED_FILTER_DEFAULT_VALUES } from '../constants/config';

interface IUserTableAdvancedFilterFormProps {
  show: boolean;
  close: VoidFunction;
}

export function UserTableAdvancedFilterForm({
  show,
  close,
}: IUserTableAdvancedFilterFormProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const wrapperElement = wrapperRef.current;

  const wrapperHeight = wrapperElement?.scrollHeight
    ? `${wrapperElement.scrollHeight}px`
    : 'auto';

  const methods = useForm<UserAdvancedFilterFormSchemaType>({
    resolver: zodResolver(userAdvancedFilterFormSchema),
    defaultValues: USER_ADVANCED_FILTER_DEFAULT_VALUES,
  });
  const { handleSubmit, reset } = methods;

  const setUserTableFilters: any = useBoundStore.use.setUserTableFilters();

  const onSubmit = (data: UserAdvancedFilterFormSchemaType) => {
    setUserTableFilters(data);
    close();
  };

  const onClearFilter = () => {
    setUserTableFilters(USER_ADVANCED_FILTER_DEFAULT_VALUES);
    reset(USER_ADVANCED_FILTER_DEFAULT_VALUES);
    close();
  };

  return (
    <Box
      sx={{
        // Height is taken using ref cuz transiton on height doesn't work if it set to 'auto'
        height: show ? wrapperHeight : '0px',
        mb: show ? 8 : 0,
        boxShadow: (theme) => (show ? theme.customShadows.dropShadow2 : 'none'),
        transition: 'all 0.4s ease 0s',
        overflow: 'hidden',
      }}
      ref={wrapperRef}
    >
      <Box p={4}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="bodyTextLarge">Apply Filter</Typography>

            <Box py={4}>
              <UserTableAdvancedFilterFormFields />
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Stack direction="row" spacing={2}>
                <Button
                  size={ButtonSize.MEDIUM}
                  variant={ButtonVariant.TEXT}
                  type="button"
                  onClick={onClearFilter}
                >
                  Clear Filter
                </Button>

                <Button
                  size={ButtonSize.MEDIUM}
                  type="submit"
                  variant={ButtonVariant.CONTAINED}
                >
                  Apply
                </Button>
              </Stack>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
}
