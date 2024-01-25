import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { addProductFormSchema } from '../schemas';

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
  editProductId: string;
  onClose: VoidFunction;
}

export function ProductAddEdit({ editProductId, onClose }: IProps) {
  const theme = useTheme();

  const navigate = useNavigate();
  const isEditMode = !!editProductId;
  const methods = useForm({
    resolver: zodResolver(addProductFormSchema),
    defaultValues,
  });
  const [selectedFiles, setSelectedFiles] = useState<IFileSchema[]>([]);

  const addProductMutation = useAddProductMutation();

  const { handleSubmit, reset, formState } = methods;

  const productDetailQuery = useProductDetailQuery(editProductId ?? '', {
    enabled: !!editProductId,
  });

  useEffect(() => {
    if (productDetailQuery?.data) {
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

    addProductMutation.mutate(
      { data: payload },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };

  const onCloseModal = () => {
    reset(defaultValues);
    onClose();
  };

  const onSubmit = (data) => {
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
