import { FormProvider, useForm } from 'react-hook-form';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import Alert from 'shared/theme/components/Alert';
import { IError } from 'shared/interfaces/http';
import { useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingIndicator } from 'shared/components/display/LoadingIndicator';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { offerAddEditFormSchema, OfferAddEditFormSchemaType } from '../schemas';
import { OfferAddEditFormFields } from './OfferAddEditFormFields';
import { useAddOfferMutation, useEditOfferMutation } from '../mutations';
import { useOfferDetailQuery } from '../queries';
import MobileContentView from './mobile-content-view';
import { offerTemplates } from './offer-templates/OfferFormAdTemplates';
import { IOfferForm } from '../interfaces';
import { OfferType } from '../enums';
import { getSelectedOfferTemplateFromCode } from '../utils';

const defaultValues: IOfferForm = {
  name: '',
  link: '',
  type: OfferType.ADVERTISEMENT,
  title: '',
  endDate: new Date(),
  imageUrl: '',
  vendor: {},
  startDate: new Date(),
  description: '',
  shortDescription: '',
  termsAndConditions: '',
  subTitle: '',
  template: offerTemplates[0],
  accountManager: '',
  body: '0',
  usageInstructions: '',
  availableUntil: new Date(),
};

export function OfferAddEditForm() {
  console.log('mm', offerTemplates);

  const methods = useForm<OfferAddEditFormSchemaType>({
    resolver: zodResolver(offerAddEditFormSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const editOfferId = search.get('id') ?? '';
  const isEditMode = !!editOfferId;

  const offerDetailQuery = useOfferDetailQuery(editOfferId, {
    enabled: !!editOfferId,
  });

  // Prepopulate the form in case of edit
  useEffect(() => {
    if (offerDetailQuery?.data) {
      const {
        vendor,
        template,
        title,
        endDate,
        startDate,
        shortDescription,
        description,
      } = offerDetailQuery.data;
      const selectedTemplate =
        getSelectedOfferTemplateFromCode(template.background.type) ||
        offerTemplates[0];

      reset({
        ...defaultValues,
        template: selectedTemplate,
        title,
        shortDescription,
        description,
        vendor: { name: vendor.name },
        startDate: new Date(startDate) || '',
        endDate: new Date(endDate) || '',
        // startTime: new Date(startDate),
        // endTime: new Date(endDate),
      });
    }
  }, [offerDetailQuery?.data, reset]);

  const addOfferMutation = useAddOfferMutation();
  const editOfferMutation = useEditOfferMutation();

  const onClose = () => {
    navigate(-1);
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
        <LoadingIndicator containerHeight="30vh" />
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
              <Grid container rowSpacing={4} columnSpacing={8}>
                <Grid item xs={7}>
                  <Box component={Paper} p={4}>
                    <OfferAddEditFormFields isEditMode={isEditMode} />
                  </Box>
                </Grid>
                <Grid
                  display="flex"
                  item
                  xs={5}
                  alignItems="center"
                  justifyContent="center"
                  // sx={{
                  //   height: 'calc(100vh - 188px)',
                  //   overflow: 'auto',
                  // }}
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
                <Grid item xs={7}>
                  <Stack direction="row" justifyContent="space-between">
                    <Button
                      size={ButtonSize.MEDIUM}
                      variant={ButtonVariant.OUTLINED}
                      type="button"
                      onClick={onClose}
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
