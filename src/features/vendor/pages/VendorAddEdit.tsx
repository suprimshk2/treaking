import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import {
  Button,
  ButtonSize,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { Dialog, DialogSize } from 'shared/theme/components/dialog/Dialog';
import { DialogLoader } from 'shared/components/display/DialogLoader';
import {
  useAddVendorMutation,
  useEditVendorMutation,
  useVendorDetailQuery,
} from '../mutations';
import { VendorAddEditFields } from '../components/VendorAddEditFields';
import { formatVendorAddPayload } from '../utils';
import { IFileSchema } from '../interfaces';
import { AddVendorFormSchemaType } from '../schemas';

interface IProps {
  editVendorId: string; // id of user which is to be edited
  onClose: VoidFunction;
}

const defaultValues: any = {
  logoUrl: '',
  businessName: '',
  contactsOne: '',
  contactsTwo: '',
  email: '',
  accountOwner: '',
  description: '',
  instagram: '',
  facebook: '',
  youtube: '',
  website: '',
  address: '',
  vendorEmail: '',
  phone: '',
  fullName: '',
};

export function VendorAddEdit({ editVendorId, onClose }: IProps) {
  const theme = useTheme();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<IFileSchema[]>([]);

  const addVendorMutation = useAddVendorMutation();
  const editVendorMutation = useEditVendorMutation();
  const methods = useForm({
    // resolver: zodResolver(addVendorFormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const vendorDetailQuery = useVendorDetailQuery(editVendorId ?? '', {
    enabled: !!editVendorId,
  });
  // Prepopulate the form in case of edit
  useEffect(() => {
    if (vendorDetailQuery?.data) {
      const vendorData = vendorDetailQuery.data;

      reset({
        logoUrl: vendorData?.logoUrl || '',
        businessName: vendorData?.businessName || '',
        contactsOne: vendorData.phone?.[0] || '',
        contactsTwo: vendorData.phone?.[1] || '',
        email: vendorData?.email || '',
        accountOwner: vendorData?.accountOwner?.name || '',
        description: vendorData?.description || '',
        instagram: vendorData?.socialMedias?.[1]?.url || '',
        facebook: vendorData?.socialMedias?.[0]?.url || '',
        youtube: vendorData?.socialMedias?.[3]?.url || '',
        website: vendorData?.socialMedias?.[2]?.url || '',
        address: vendorData?.address || '',
        vendorEmail: vendorData.contacts?.[0]?.email,
        phone: vendorData.contacts?.[0]?.phone,
        fullName: vendorData.contacts?.[0]?.firstName,
      });
    }
  }, [vendorDetailQuery?.data, reset]);
  const onCloseModal = () => {
    reset(defaultValues);
    onClose();
  };
  const handleVendorEdit = (data: AddVendorFormSchemaType) => {
    const payload = formatVendorAddPayload(data);

    editVendorMutation.mutate(
      { id: editVendorId, data: payload },
      {
        onSuccess: () => {
          onCloseModal();
        },
      }
    );
  };
  const handleVendorAdd = (data) => {
    const payload = formatVendorAddPayload(data);

    addVendorMutation.mutate(
      { data: payload },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };
  const isEditMode = !!editVendorId;

  const onSubmit = (data) => {
    const payload = { ...data, logoUrl: selectedFiles[0]?.base64 ?? '' };
    if (isEditMode) {
      handleVendorEdit(data);
    } else {
      handleVendorAdd(payload);
    }
  };
  const TEXT = {
    title: isEditMode
      ? `Edit Vendor: ${vendorDetailQuery?.data?.demographic?.fullName || ''}`
      : 'Add Vendor',
    footerActionButtonText: isEditMode ? 'Update' : 'Save',
    errorTitle: isEditMode ? 'Error updating Vendor' : 'Error adding Vendor',
  };
  const childrenContainerStyle = {
    width: '100%',
    backgroundColor: theme.palette.gray.lighter,
  };
  return (
    <Dialog
      title={TEXT.title}
      handleClose={onCloseModal}
      open
      size={DialogSize.MEDIUM}
    >
      {vendorDetailQuery.isLoading ? (
        <DialogLoader />
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="flex"
              alignContent="center"
              flexDirection="column"
              justifyContent="center"
              sx={{
                backgroundColor: theme.palette.gray.lighter,
                paddingBottom: theme.spacing(10),
              }}
            >
              <VendorAddEditFields setSelectedFiles={setSelectedFiles} />
              <Box
                maxWidth={518}
                display="flex"
                mx="auto"
                flexDirection="row"
                justifyContent="space-between"
                alignContent="center"
                sx={childrenContainerStyle}
              >
                <Button
                  onClick={() => onClose()}
                  size={ButtonSize.MEDIUM}
                  variant={ButtonVariant.OUTLINED}
                >
                  Cancel
                </Button>
                <Button type="submit" size={ButtonSize.MEDIUM}>
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        </FormProvider>
      )}
    </Dialog>
  );
}
