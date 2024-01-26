import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import {
  Button,
  ButtonSize,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { DialogSize } from 'shared/theme/components/dialog/Dialog';
import { Dialog } from 'shared/theme/components/dialog';
import { useAddProductMutation, useProductDetailQuery } from '../mutations';
import { ProductAddEditFields } from '../components/ProductAddEditFields';
import { formaProductAddPayload } from '../utils';
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
interface IProps {
  editProductId: string; // id of user which is to be edited
  onClose: VoidFunction;
}
// const handleUserEdit = (data: AddProductFormSchemaType) => {
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

export function ProductAddEdit({ editProductId, onClose }: IProps) {
  const theme = useTheme();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<IFileSchema[]>([]);

  // console.log(editProductId);

  const addProductMutation = useAddProductMutation();
  const methods = useForm({
    // resolver: zodResolver(addProductFormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
  console.log({ errors });

  const productDetailQuery = useProductDetailQuery(editProductId ?? '', {
    enabled: !!editProductId,
  });
  // Prepopulate the form in case of edit
  useEffect(() => {
    if (productDetailQuery?.data) {
      // const { demographic } = ProductDetailQuery.data;
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
  }, [productDetailQuery?.data, reset]);

  const handleProductAdd = (data) => {
    const payload = formaProductAddPayload(data);
    console.log(payload, 'main');
    console.log(data, 'daaaa');

    addProductMutation.mutate(
      { data: payload },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };
  const isEditMode = !!editProductId;
  const onCloseModal = () => {
    reset(defaultValues);
    onClose();
  };
  const onSubmit = (data) => {
    console.log('data-----', data);
    const payload = { ...data, logoUrl: selectedFiles[0]?.base64 ?? '' };
    if (isEditMode) {
      // handleUserEdit(data);
    } else {
      handleProductAdd(payload);
    }
  };
  const childrenContainerStyle = {
    width: '100%',
    backgroundColor: theme.palette.gray.lighter,
  };
  const TEXT = {
    title: isEditMode
      ? `Edit User: ${productDetailQuery?.data?.demographic?.fullName || ''}`
      : 'Add Product',
    footerActionButtonText: isEditMode ? 'Update' : 'Save',
    errorTitle: isEditMode ? 'Error updating user' : 'Error adding user',
  };

  return (
    <Dialog
      title={TEXT.title}
      handleClose={onCloseModal}
      open
      size={DialogSize.MEDIUM}
    >
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
            <ProductAddEditFields setSelectedFiles={setSelectedFiles} />
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
    </Dialog>
  );
}
