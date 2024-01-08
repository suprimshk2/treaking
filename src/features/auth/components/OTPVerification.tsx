import { HTMLParser } from 'shared/components/display/HTMLParser';
import { Box, Stack, Typography, Link } from '@mui/material';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { BsChevronLeft } from 'react-icons/bs';
import { useRef, useState } from 'react';
import { config } from 'shared/constants/config';
import CountdownTimer from 'shared/components/display/CountDownTimer';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { useNavigate } from 'react-router-dom';
import { IError } from 'shared/interfaces/http';
import uiRoute from 'shared/constants/uiRoute';
import { CodeInput } from 'shared/components/inputs/CodeInput';
import AuthLayout from '../layouts/AuthLayout';
import { MESSAGE } from '../constants/message';
import {
  useResendMFACodeMutation,
  useVerifyMFACodeMutation,
} from '../mutations';
import { ILoginData } from '../interfaces';

const { OTP_CODE_LENGTH, OTP_EXPIRATION_TIME_IN_SECS } = config;
const { OTP_SENT_TO } = MESSAGE;

interface IOTPVerificationProps {
  loginData: ILoginData;
  setLoginData: React.Dispatch<React.SetStateAction<ILoginData>>;
  onBackClick: VoidFunction;
}

export function OTPVerification({
  loginData,
  setLoginData,
  onBackClick,
}: IOTPVerificationProps) {
  const { username, otpToken } = loginData;

  const navigate = useNavigate();

  const inputRef = useRef(''); // holds the react-code-input's value

  const [isValid, setValid] = useState(true);
  const [otpExpired, setOtpExpired] = useState(false);
  const [otpError, setOtpError] = useState<IError | null>(null);
  const [resetCount, setResetCount] = useState(0);

  const verifyMFACodeMutation = useVerifyMFACodeMutation();
  const resendMFACodeMutation = useResendMFACodeMutation();

  const setAccessToken = useBoundStore.use.setAccessToken();

  const onNextClick = (otpValue: string) => {
    if (!otpValue || otpValue.length !== OTP_CODE_LENGTH) {
      setValid(false);
      return;
    }

    verifyMFACodeMutation.mutate(
      {
        data: {
          code: otpValue,
          otpToken,
        },
      },
      {
        onSuccess: (response) => {
          if (response.data?.accessToken) {
            setAccessToken(response.data.accessToken);
            navigate(uiRoute.index);
          } else {
            throw new Error('Invalid response from verify OTP token');
          }
        },
        onError: (error) => {
          setOtpError(error as IError);
        },
      }
    );
  };

  const onInputChange = (value: string) => {
    setValid(true);
    setOtpError(null);
    inputRef.current = value;

    if (value.length === OTP_CODE_LENGTH) {
      onNextClick(value);
    }
  };

  const onResendOTPClick = () => {
    resendMFACodeMutation.mutate(
      { data: { otpToken } },
      {
        onSuccess: (response) => {
          setLoginData({ ...loginData, otpToken: response.data.otpToken });
          setResetCount((prevState) => prevState + 1);
          setOtpExpired(false);
        },
        onError: (error) => {
          setOtpError(error as IError);
        },
      }
    );
  };

  const OTPSentToMessage = OTP_SENT_TO.replace(
    '{{recipient}}',
    `<span style="font-family: 'Varela Round';">${username?.toLowerCase()}</>`
  );

  return (
    <AuthLayout title="OTP Verification">
      <Box mt={8}>
        <HTMLParser
          content={OTPSentToMessage}
          variant="bodyTextLarge"
          textAlign="center"
          display="inline-block"
          color="shade.dark"
          fontWeight="fontWeightRegular"
        />

        <Stack spacing={4} mt={8}>
          <Box mx="auto">
            <CodeInput
              fields={OTP_CODE_LENGTH}
              isValid={isValid && !otpError?.message}
              onChange={onInputChange}
              disabled={verifyMFACodeMutation.isPending || otpExpired}
            />
          </Box>

          {otpError?.message && (
            <Typography
              variant="bodyTextMedium"
              color="error.main"
              textAlign="center"
            >
              {otpError.message}
            </Typography>
          )}

          {otpExpired ? (
            <Typography
              variant="bodyTextMedium"
              color="error.main"
              textAlign="center"
            >
              The verification code has expired.
            </Typography>
          ) : (
            <Typography
              variant="bodyTextMedium"
              color="shade.darker"
              textAlign="center"
            >
              Code will expire in{' '}
              <Typography component="span" fontWeight="fontWeightMedium">
                <CountdownTimer
                  timeInSecs={OTP_EXPIRATION_TIME_IN_SECS}
                  handleTimeUp={() => setOtpExpired(true)}
                  resetCount={resetCount}
                />
              </Typography>
            </Typography>
          )}
        </Stack>

        <Stack spacing={4} mt={9}>
          {otpExpired ? (
            <Button
              variant={ButtonVariant.CONTAINED}
              size={ButtonSize.MEDIUM}
              fullWidth
              buttonType={ButtonType.LOADING}
              loading={resendMFACodeMutation.isPending}
              onClick={() => onResendOTPClick()}
            >
              {resendMFACodeMutation.isPending ? 'Resending...' : 'Resend Code'}
            </Button>
          ) : (
            <Button
              variant={ButtonVariant.CONTAINED}
              size={ButtonSize.MEDIUM}
              fullWidth
              onClick={() => onNextClick(inputRef.current)}
              buttonType={ButtonType.LOADING}
              loading={verifyMFACodeMutation.isPending}
              disabled={resendMFACodeMutation.isPending}
            >
              Continue
            </Button>
          )}

          <Button
            variant={ButtonVariant.TEXT}
            size={ButtonSize.MEDIUM}
            fullWidth
            prefix={<BsChevronLeft />}
            disabled={
              verifyMFACodeMutation.isPending || resendMFACodeMutation.isPending
            }
            onClick={onBackClick}
          >
            Back to login
          </Button>
        </Stack>

        {!otpExpired && (
          <Typography
            variant="bodyTextLarge"
            color="shade.darker"
            textAlign="center"
            display="inline-block"
            mt={8}
            width="100%"
          >
            Didn&apos;t receive an OTP?&nbsp;
            {/* TODO: Consult with the design team on componentizing the link button */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link
              component="button"
              variant="bodyTextLarge"
              ml={2}
              display="inline"
              disabled={resendMFACodeMutation.isPending}
              onClick={() => onResendOTPClick()}
            >
              {resendMFACodeMutation.isPending ? 'Sending...' : 'Resend Code'}
            </Link>
          </Typography>
        )}
      </Box>
    </AuthLayout>
  );
}
