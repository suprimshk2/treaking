import { BsArrowLeft } from 'react-icons/bs';
import {
  ButtonVariant,
  ButtonSize,
  Button,
} from 'shared/theme/components/Button';

interface IProps {
  onBackClick(): void;
}

export function GoBackButton({ onBackClick }: IProps) {
  return (
    <Button
      variant={ButtonVariant.TEXT}
      size={ButtonSize.SMALL}
      prefix={<BsArrowLeft />}
      onClick={onBackClick}
      fullWidth={false}
    >
      Go Back
    </Button>
  );
}
