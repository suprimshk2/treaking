import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import {
  Button,
  ButtonSize,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { DialogSize } from 'shared/theme/components/dialog/Dialog';
import { Dialog } from 'shared/theme/components/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { config } from 'shared/constants/config';
import FileDropzone from 'shared/components/file-upload/FileUpload';
import { useUploadImageMutation } from 'shared/mutation';
import { useAddProductMutation, useProductDetailQuery } from '../mutations';
import { ProductAddEditFields } from '../components/ProductAddEditFields';
import { formatProductAddPayload } from '../utils';
import { IFileSchema, IProductSchema } from '../interfaces';
import { addProductFormSchema } from '../schemas';

const defaultValues: IProductSchema = {
  title: '',
  description: '',
  vendor: {},
  images: [],
  point: '',
  price: '',
  tags: [],
  quantityInStock: '',
  costPrice: '',
  retailPrice: '',
};

interface IProps {
  editProductId: string;
  onClose: VoidFunction;
}

export function ProductAddEditModal({ editProductId, onClose }: IProps) {
  const theme = useTheme();

  const isEditMode = !!editProductId;
  const methods = useForm({
    resolver: zodResolver(addProductFormSchema),
    defaultValues,
  });

  const addProductMutation = useAddProductMutation();
  const uploadImageMutation = useUploadImageMutation();

  const { handleSubmit, reset, setValue, getValues } = methods;

  const productDetailQuery = useProductDetailQuery(editProductId ?? '', {
    enabled: !!editProductId,
  });

  useEffect(() => {
    if (productDetailQuery?.data) {
      reset({});
    }
  }, [productDetailQuery?.data, reset]);

  const onFileChange = (files: IFileSchema[]) => {
    if (files[0]?.error) {
      return;
    }

    const file: IFileSchema = files[0];

    uploadImageMutation.mutate(file, {
      onSuccess(data) {
        const images = getValues('images');
        setValue('images', [
          ...images,
          { url: data?.data?.url ?? '', order: 0 },
        ]);
      },
      onError() {},
    });
  };

  const handleProductAdd = (data: IProductSchema) => {
    const payload = formatProductAddPayload(data);

    addProductMutation.mutate(
      { data: payload },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const onCloseModal = () => {
    reset(defaultValues);
    onClose();
  };

  const onSubmit = (data: IProductSchema) => {
    const payload = { ...data, tags: [] };
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
      size={DialogSize.LARGE}
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
            <Stack direction="row">
              <Stack>
                <ProductAddEditFields />
                <Box
                  display="flex"
                  mx="auto"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignContent="center"
                  sx={childrenContainerStyle}
                  px={10}
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
              </Stack>
              <Box paddingY={theme.spacing(3)}>
                <Typography mb={3} variant="h5">
                  Product Image
                </Typography>
                <FileDropzone
                  maxSize={config.MAX_FILE_SIZE}
                  onChange={onFileChange}
                />
              </Box>
            </Stack>
          </Box>
        </form>
      </FormProvider>
    </Dialog>
  );
}
