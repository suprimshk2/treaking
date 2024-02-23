import { useEffect, useRef, useState } from 'react';
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
import { useAddProductMutation, useEditProductMutation } from '../mutations';
import { ProductAddEditFields } from './ProductAddEditFields';
import { formatProductAddPayload } from '../utils';
import { ICloudFile, IFilePayload, IProductSchema } from '../interfaces';
import { addProductFormSchema } from '../schemas';
import Checkbox from 'shared/theme/components/Checkbox';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PRODUCT_FORM_TYPE } from '../enums';

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
  discount: '',
  isAuthentic: false,
};

interface IProps {
  editProductId: string;
  onClose: VoidFunction;
}

export function ProductAddEditModal() {
  const ref = useRef<IFileRef>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [checkBox, setCheckBox] = useState(false);
  const editProductId = searchParams.get('id');
  const type = searchParams.get('type');
  const isEditMode = !!editProductId && type === PRODUCT_FORM_TYPE.EDIT;
  const methods = useForm({
    resolver: zodResolver(addProductFormSchema),
    defaultValues,
  });

  const addProductMutation = useAddProductMutation();
  const uploadImageMutation = useUploadImageMutation();
  const editProductMutation = useEditProductMutation();

  const { handleSubmit, reset, setValue, getValues } = methods;
  const onChange = () => {
    setCheckBox((prev) => !prev);
  };
  useEffect(() => {
    setValue('isAuthentic', checkBox);
  }, [checkBox]);

  const onFileChange = (files: IFilePayload[]) => {
    files.forEach(async (item) => {
      const payload: ICloudFile = {
        file: item.file,
        category: CloudFileCategory.PRODUCT_IMAGE,
      };

      try {
        const data = await uploadImageMutation.mutateAsync(payload);
        const images = getValues('images');

        setValue('images', [...images, { url: data?.data?.url ?? '' }]);

        ref.current?.setFileState(item.fileId, data?.data?.url, false, true);
      } catch (error) {
        ref.current?.setFileState(item.fileId, '', false, false);
      }
    });
  };

  const handleProductAdd = (data: IProductSchema) => {
    const payload = formatProductAddPayload(data);
    addProductMutation.mutate(
      { data: payload },
      {
        onSuccess: () => {
          navigate(-1);
        },
        onError: (error) => {
          navigate(-1);
        },
      }
    );
  };

  const handleProductEdit = (data: IProductSchema) => {
    const payload = formatProductAddPayload(data);
    editProductMutation.mutate(
      { productId: editProductId, data: payload },
      {
        onSuccess: () => {
          navigate(-1);
        },
        onError: (error) => {
          navigate(-1);
        },
      }
    );
  };

  const onCloseModal = () => {
    reset(defaultValues);
    navigate(-1);
  };

  const onSubmit = (data: IProductSchema) => {
    const payload = { ...data, tags: [] };
    if (isEditMode) {
      handleProductEdit(payload);
    } else {
      handleProductAdd(payload);
    }
  };

  const childrenContainerStyle = {
    width: '100%',
    backgroundColor: theme.palette.gray.lighter,
  };

  const TEXT = {
    title: isEditMode ? `Edit Product` : 'Add Product',
    footerActionButtonText: isEditMode ? 'Update' : 'Save',
    errorTitle: isEditMode ? 'Error updating user' : 'Error adding user',
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
            backgroundColor: theme.palette.common.white,
            paddingBottom: theme.spacing(10),
            px: 10,
          }}
        >
          <Stack direction="row" gap={5}>
            <Stack flex={1}>
              <ProductAddEditFields editProductId={editProductId} />
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
                  type="button"
                  size={ButtonSize.MEDIUM}
                  variant={ButtonVariant.OUTLINED}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  buttonType={ButtonType.LOADING}
                  size={ButtonSize.MEDIUM}
                  loading={
                    addProductMutation.isPending ||
                    editProductMutation.isPending
                  }
                >
                  Save
                </Button>
              </Box>
            </Stack>
            <Box paddingY={theme.spacing(3)} flex={1}>
              <Typography mb={3} variant="h5">
                Product Image *
              </Typography>
              <FileDropzone
                maxSize={config.MAX_FILE_SIZE}
                onChange={onFileChange}
                ref={ref}
              />
              <Box alignItems="flex-end" mt={4}>
                <Checkbox
                  checked={checkBox}
                  onChange={onChange}
                  label="This product is authentic"
                />
              </Box>
            </Box>
          </Stack>
        </Box>
      </form>
    </FormProvider>
  );
}
