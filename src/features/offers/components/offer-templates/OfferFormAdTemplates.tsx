import { Box, Stack, Typography, useTheme } from '@mui/material';
import { OfferTemplateCode } from 'features/offers/enums';
import { useFormContext } from 'react-hook-form';
import template1 from 'shared/assets/png/offer-template1.png';
import template2 from 'shared/assets/png/offer-template2.png';
import template3 from 'shared/assets/png/offer-template3.png';
import template4 from 'shared/assets/png/offer-template4.png';
import template5 from 'shared/assets/png/offer-template5.png';

export interface IOfferTemplate {
  id: string;
  img: string;
  code: OfferTemplateCode;
  label: string;
}

export const offerTemplates: IOfferTemplate[] = [
  {
    id: '1',
    img: template1,
    code: OfferTemplateCode.GRADIENT,
    label: 'Gradient',
  },

  {
    id: '2',
    img: template2,
    code: OfferTemplateCode.SUN_BURST,
    label: 'Sunburst',
  },
  {
    id: '3',
    img: template3,
    code: OfferTemplateCode.DARK,

    label: 'Dark',
  },
  {
    id: '4',
    img: template4,
    code: OfferTemplateCode.TURQUOISE,
    label: 'Turquoise',
  },
  {
    id: '5',
    img: template5,
    code: OfferTemplateCode.LIGHT,
    label: 'Light',
  },
];

interface IProps {
  template: IOfferTemplate;
  onChange: (template: IOfferTemplate) => void;
  selected: boolean;
}

function TemplateCard({ template, selected, onChange }: IProps) {
  const theme = useTheme();
  return (
    <Box
      onClick={() => onChange(template)}
      borderRadius="4px"
      sx={{
        cursor: 'pointer',
        border: `1px solid ${
          selected ? theme.palette.gray.main : theme.palette.common.white
        }`,
      }}
    >
      <Box
        sx={{
          height: 172,
          width: 120,
        }}
      >
        <Box
          loading="lazy"
          component="img"
          src={template.img}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '4px 4px 0 0',
          }}
        />
      </Box>
      <Box py={2} component="center">
        <Typography variant="bodyTextSmallMd">{template.label}</Typography>
      </Box>
    </Box>
  );
}

interface IFormProps {
  name: string;
}

export function OfferFormAdTemplates({ name }: IFormProps) {
  const { setValue, watch } = useFormContext();
  const selectedValue = watch(name);
  //   const [value, setValue] = useState<IOfferTemplate | null>(null);
  const handleSelect = (template: IOfferTemplate) => {
    setValue(name, template);
  };
  return (
    <Stack gap={1}>
      <Typography gutterBottom variant="bodyTextMediumMd" color="gray.dark">
        Select Ad Template
      </Typography>
      <Stack
        direction="row"
        gap={4}
        sx={{
          overflow: 'auto',
        }}
      >
        {offerTemplates.map((template) => (
          <TemplateCard
            selected={selectedValue?.code === template.code}
            key={template.id}
            template={template}
            onChange={handleSelect}
          />
        ))}
      </Stack>
    </Stack>
  );
}
