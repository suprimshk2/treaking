import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import template1 from 'shared/assets/png/offer-template1.png';
import template2 from 'shared/assets/png/offer-template2.png';
import template3 from 'shared/assets/png/offer-template3.png';
import template4 from 'shared/assets/png/offer-template4.png';
import template5 from 'shared/assets/png/offer-template5.png';
import { templateStyles } from 'features/offers/constants/template';
import {
  OfferBodyType,
  OfferContentLayoutType,
  OfferTemplateCode,
} from 'features/offers/enums';
import { LAYOUT_TYPE } from 'shared/constants/layoutType';
import { IOfferTemplate } from '../offer-templates/OfferFormAdTemplates';

const templateImage = {
  '1': template1,
  '2': template2,
  '3': template3,
  '4': template4,
  '5': template5,
};

function MobileContentView() {
  const theme = useTheme();
  const { watch } = useFormContext();
  const selectedTemplate: IOfferTemplate = watch('template');
  const title = watch('title');
  const subTitle = watch('subTitle');
  const layoutType: OfferContentLayoutType = watch('layoutType');
  const description = watch('shortDescription');
  const vendor = watch('vendor');

  const isFreeType = layoutType === OfferContentLayoutType.DEFAULT;

  if (selectedTemplate) {
    const styles = templateStyles[selectedTemplate.code as OfferTemplateCode];
    const fontFamily = styles?.headerFontFamily ?? '';

    return (
      <Box
        sx={{
          height: 746,
          width: 400,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            px: 6,
            wordBreak: 'auto-phrase',
            height: '100%',
            width: '100%',
            borderRadius: '31px',
            backgroundImage: `url(${
              templateImage[selectedTemplate.id as keyof typeof templateImage]
            })`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <Box
            sx={{
              fontFamily,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              color: styles.textColor,
            }}
          >
            <Box
              mt={16}
              mb={8}
              height={100}
              width={100}
              sx={{
                objectFit: 'contain',
              }}
              component="img"
              src={vendor.logo_url}
            />
            <Box height={350} component="center">
              <Box minHeight="28%" maxHeight="38%">
                <Typography
                  sx={{
                    fontSize: styles.headerFontSize,
                    // fontSize: '5vw',
                    fontFamily,
                  }}
                >
                  {title}
                </Typography>
              </Box>
              <Stack
                direction="row"
                gap={2}
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  sx={{
                    fontSize: styles.bodyFontSize,
                    // fontSize: '5vw',
                    fontFamily,
                  }}
                >
                  {isFreeType ? OfferBodyType.FREE : subTitle}
                </Typography>
                {!isFreeType && (
                  <Stack spacing={-6} position="relative" top={-6}>
                    <Typography
                      sx={{
                        fontSize: '108px',
                        // fontSize: '5vw',
                      }}
                    >
                      {LAYOUT_TYPE[layoutType]}
                    </Typography>
                    <Box alignSelf="baseline">
                      <Typography
                        sx={{
                          // fontSize: '5vw',
                          fontSize: '52px',
                        }}
                      >
                        OFF
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </Stack>
            </Box>
            <Typography
              sx={{
                fontSize: styles.footerFontSize,
                // fontSize: '2vw',
                fontFamily: styles.footerFontFamily,
                color: styles.footerTextColor || 'inherit',
              }}
              textAlign="center"
            >
              {description}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: theme.palette.common.white,
            height: '44px',
            width: '276px',
            borderRadius: '20px',
            top: '-21px',
            left: '80px',
          }}
        />
      </Box>
    );
  }

  return null;
}

export default MobileContentView;
