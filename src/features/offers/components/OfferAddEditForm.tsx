import { FormProvider, useForm } from 'react-hook-form';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import Alert from 'shared/theme/components/Alert';
import { IError } from 'shared/interfaces/http';
import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import { LoadingIndicator } from 'shared/components/display/LoadingIndicator';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { offerAddEditFormSchema, OfferAddEditFormSchemaType } from '../schemas';
import { OfferAddEditFormFields } from './OfferAddEditFormFields';
import { useAddOfferMutation, useEditOfferMutation } from '../mutations';
import { useOfferDetailQuery } from '../queries';
import MobileContentView from './mobile-content-view';
import { offerTemplates } from './offer-templates/OfferFormAdTemplates';

const defaultValues: any = {
  template: offerTemplates[0],
  vendor: '',
  title: '',
  body: '0',
  bodyType: 'RS',
  shortDescription: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
};

export function OfferAddEditForm() {
  const methods = useForm<OfferAddEditFormSchemaType>({
    // resolver: zodResolver(offerAddEditFormSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;
  const [search] = useSearchParams();
  const editOfferId = search.get('offerId') ?? '';
  const isEditMode = !!editOfferId;

  const offerDetailQuery = useOfferDetailQuery(editOfferId, {
    enabled: !!editOfferId,
  });

  // Prepopulate the form in case of edit
  useEffect(() => {
    // if (offerDetailQuery?.data) {
    //   const { demographic } = offerDetailQuery.data;
    //   reset({
    //     firstName: demographic.firstName || '',
    //     middleName: demographic.middleName || '',
    //     lastName: demographic.lastName || '',
    //     email: demographic.email || '',
    //     gender: demographic.gender || null,
    //     dob: unformatDate(demographic.dob),
    //     phone: unformatPhone(demographic.phone),
    //     role: offerDetailQuery?.data?.association?.roles?.[0] || '',
    //   });
    // }
  }, [offerDetailQuery?.data, reset]);

  const addOfferMutation = useAddOfferMutation();
  const editOfferMutation = useEditOfferMutation();

  const onCloseModal = () => {
    reset(defaultValues);
    // onClose();
  };

  const handleOfferAdd = (data: OfferAddEditFormSchemaType) => {
    console.log({ data });
    // const payload = formatOfferAddPayload(data);

    // addOfferMutation.mutate(
    //   { data: payload },
    //   {
    //     onSuccess: () => {
    //       onCloseModal();
    //     },
    //   }
    // );
  };

  const handleOfferEdit = (data: OfferAddEditFormSchemaType) => {
    console.log({ data });

    // const payload = formatOfferEditPayload(data);

    // editOfferMutation.mutate(
    //   { id: editOfferId, data: payload },
    //   {
    //     onSuccess: () => {
    //       onCloseModal();
    //     },
    //   }
    // );
  };

  const onSubmit = (data: OfferAddEditFormSchemaType) => {
    console.log({ data });
    // if (isEditMode) {
    //   handleOfferEdit(data);
    // } else {
    //   handleOfferAdd(data);
    // }
  };

  const TEXT = {
    title: isEditMode ? 'Edit Offer' : 'Add Offer',
    footerActionButtonText: isEditMode ? 'Update' : 'Save',
    errorTitle: isEditMode ? 'Error updating offer' : 'Error adding offer',
  };

  const mutation = isEditMode ? editOfferMutation : addOfferMutation;

  return (
    <Stack gap={4} pb={3}>
      <Typography variant="bodyTextLarge">Offer Details</Typography>
      {offerDetailQuery.isLoading ? (
        <LoadingIndicator containerHeight="100%" />
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              {mutation.isError && (
                <Box mb={8}>
                  <Alert
                    type="error"
                    title={TEXT.errorTitle}
                    description={(mutation.error as IError)?.message}
                  />
                </Box>
              )}
              <Grid container rowSpacing={4}>
                <Grid item xs={6}>
                  <Box component={Paper} p={4}>
                    <OfferAddEditFormFields isEditMode={isEditMode} />
                  </Box>
                </Grid>
                <Grid
                  display="flex"
                  item
                  xs={6}
                  alignItems="center"
                  justifyContent="center"
                >
                  {/* <Box
                    sx={{
                      position: 'fixed',
                      top: '14%',
                      right: '10%',
                    }}
                  > */}
                  <MobileContentView />
                  {/* </Box> */}
                </Grid>
                <Grid item xs={6}>
                  <Stack direction="row" justifyContent="space-between">
                    <Button
                      size={ButtonSize.MEDIUM}
                      variant={ButtonVariant.OUTLINED}
                      type="button"
                      // onClick={onSecondaryButtonClick}
                      // disabled={isSubmitting}
                    >
                      Cancel
                    </Button>

                    <Button
                      size={ButtonSize.MEDIUM}
                      buttonType={ButtonType.LOADING}
                      type="submit"
                      // loading={isSubmitting}
                    >
                      Save
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </form>
        </FormProvider>
      )}
    </Stack>
  );
}
