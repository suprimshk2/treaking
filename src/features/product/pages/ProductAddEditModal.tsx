import { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { DialogSize } from 'shared/theme/components/dialog/Dialog';
import { Dialog } from 'shared/theme/components/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { config } from 'shared/constants/config';
import FileDropzone, {
  IFileRef,
} from 'shared/components/file-upload/FileUpload';
import { useUploadImageMutation } from 'shared/mutation';
import { CloudFileCategory } from 'shared/enums';
import { useAddProductMutation } from '../mutations';
import { ProductAddEditFields } from '../components/ProductAddEditFields';
import { formatProductAddPayload } from '../utils';
import { ICloudFile, IFilePayload, IProductSchema } from '../interfaces';
import { addProductFormSchema } from '../schemas';
import { useProductDetailQuery } from '../queries';

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
  const ref = useRef<IFileRef>(null);
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
    if (editProductId && productDetailQuery?.data) {
      const { data } = productDetailQuery;

      reset({});
    }
  }, [editProductId, productDetailQuery, productDetailQuery?.data, reset]);

  const onFileChange = (files: IFilePayload[]) => {
    files.forEach(async (item, index) => {
      const payload: ICloudFile = {
        file: item.file,
        category: CloudFileCategory.PRODUCT_IMAGE,
      };

      try {
        const data = await uploadImageMutation.mutateAsync(payload);
        const images = getValues('images');
        setValue('images', [
          ...images,
          { url: data?.data?.url ?? '', order: index },
        ]);

        ref.current?.setFileState(item.fileId, false, true);
      } catch (error) {
        ref.current?.setFileState(item.fileId, false, false);
      }
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
                  <Button
                    type="submit"
                    buttonType={ButtonType.LOADING}
                    size={ButtonSize.MEDIUM}
                    loading={addProductMutation.isPending}
                  >
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
                  ref={ref}
                />
              </Box>
            </Stack>
          </Box>
        </form>
      </FormProvider>
    </Dialog>
  );
}
