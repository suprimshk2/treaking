import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import template1 from 'shared/assets/png/offer-template1.png';
import template2 from 'shared/assets/png/offer-template2.png';
import template3 from 'shared/assets/png/offer-template3.png';
import template4 from 'shared/assets/png/offer-template4.png';
import template5 from 'shared/assets/png/offer-template5.png';
import { templateStyles } from 'features/offers/constants/template';
import { OfferBodyType, OfferTemplateCode } from 'features/offers/enums';
import { ITemplate } from '../offer-templates/OfferFormAdTemplates';

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
  const selectedTemplate: ITemplate = watch('template');
  const title = watch('title');
  const body = watch('body');
  const bodyType = watch('bodyType');
  const description = watch('shortDescription');

  const isFreeType = bodyType === OfferBodyType.FREE;

  if (selectedTemplate) {
    const styles = templateStyles[selectedTemplate.code as OfferTemplateCode];
    return (
      <Box
        sx={{
          height: 746,
          width: 434,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            px: 6,
            wordBreak: 'break-all',
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
              fontFamily: styles.headerFontFamily,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              color: styles.textColor,
            }}
          >
            <Box
              mt={16}
              mb={8}
              height={68}
              width={211}
              sx={{
                objectFit: 'cover',
              }}
              component="img"
              src="https://s3-alpha-sig.figma.com/img/05f8/dbed/7de6c54a9ef956635f5a7d14161e110a?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ajmEVCyn-~FXO9iEL5netjWLA~0mHVBP5jnSlLcZ6JhdVvFyMEIkUoJtorbqV1xxAbmvD-LJc6ndZ1t1o6odzeOeLakpvBhxclsd1tkTVQpvLiUmSSNAREWknBC-R6yukYTYrGfi5EbXBkvfQ89Jb6SCSgUgnADjPmexv~4zQSFR~ukLB4vRrleztmZHMIxCqL~3GvrBRyQdy9p7DDzqSP-fmFbz68iUmSMOy1T2Qpp3BtX8pktdGyaqR8dCDb2j15ntGJHRxrLB3EnLCRaKDWttK50ZWB8zQv3mG~BMEYiBtGKT2a~5lCQ80Mh~95gVOVHpd-BcOOVCD1PJKVKDRw__"
            />
            <Box height={350} component="center">
              <Box minHeight="28%" maxHeight="38%">
                <Typography
                  sx={{
                    fontSize: styles.headerFontSize,
                    fontFamily: styles.headerFontFamily,
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
                    fontFamily: styles.headerFontFamily,
                  }}
                >
                  {isFreeType ? OfferBodyType.FREE : body}
                </Typography>
                {bodyType !== OfferBodyType.FREE && (
                  <Stack spacing={-6} position="relative" top={-6}>
                    <Typography
                      sx={{
                        fontSize: '108px',
                      }}
                    >
                      {body && bodyType}
                    </Typography>
                    <Box alignSelf="baseline">
                      <Typography
                        sx={{
                          fontSize: '52px',
                        }}
                      >
                        {body && 'OFF'}
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </Stack>
            </Box>

            <Typography
              sx={{
                fontSize: styles.footerFontSize,
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
