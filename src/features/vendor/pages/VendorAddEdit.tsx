import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import {
  Button,
  ButtonSize,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { useAddVendorMutation, useVendorDetailQuery } from '../mutations';
import { VendorAddEditFields } from '../components/VendorAddEditFields';
import { formatVendorAddPayload } from '../utils';
import { IFileSchema } from '../interfaces';

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
};

// const handleUserEdit = (data: AddVendorFormSchemaType) => {
//   const payload = {};

//   editUserMutation.mutate(
//     { id: editUserId, data: payload },
//     {
//       onSuccess: () => {
//         onCloseModal();
//       },
//     }
//   );
// };

export function VendorAddEdit() {
  const theme = useTheme();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<IFileSchema[]>([]);

  const editVendorId = searchParams.get('id');
  // console.log(editVendorId);

  const addVendorMutation = useAddVendorMutation();
  const methods = useForm({
    // resolver: zodResolver(addVendorFormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
  console.log({ errors });

  const VendorDetailQuery = useVendorDetailQuery(editVendorId ?? '', {
    enabled: !!editVendorId,
  });
  // Prepopulate the form in case of edit
  useEffect(() => {
    if (VendorDetailQuery?.data) {
      // const { demographic } = VendorDetailQuery.data;
      reset({
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
      });
    }
  }, [VendorDetailQuery?.data, reset]);

  const handleVendorAdd = (data) => {
    const payload = formatVendorAddPayload(data);
    console.log(payload, 'main');
    console.log(data, 'daaaa');

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
    console.log('data-----', data);
    const payload = { ...data, logoUrl: selectedFiles[0]?.base64 ?? '' };
    if (isEditMode) {
      // handleUserEdit(data);
    } else {
      handleVendorAdd(payload);
    }
  };
  const childrenContainerStyle = {
    width: '100%',
    backgroundColor: theme.palette.gray.lighter,
  };
  return (
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
              type="submit"
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
  );
}
