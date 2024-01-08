import { GlobalStyles as GlobalThemeStyles } from '@mui/material';
import { PALETTE } from './constants/theme';

function GlobalStyles() {
  // Styles applied to react-otp-input's input

  const reactCodeInputStyles = {
    '.react-otp-input': {
      'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
      /* Firefox */
      "input[type='number']": {
        MozAppearance: 'textfield',
      },

      'input:focus': {
        outline: 'none',
      },
    },
  } as const;

  return (
    <GlobalThemeStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
          // fontSize: 'clamp(10px, 1vw, 0.35in)',
        },
        body: {
          width: '100%',
          height: '100%',
          color: PALETTE.shadeDarker,
          scrollbarGutter: 'stable both-edges',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },

        '@page': {
          size: 'A3',
        },
        '@media print': {
          body: {
            zoom: '100%',
          },
          '.print-page': {
            border: 'initial',
            borderRadius: 'initial',
            width: 'initial',
            minHeight: 'initial',
            boxShadow: 'initial',
            background: 'initial',
            pageBreakBefore: 'always',
            pageBreakAfter: 'always',
            pageBreakInside: 'avoid',
          },
          '.no-break': {
            pageBreakAfter: 'avoid',
            pageBreakInside: 'avoid',
          },
          '.no-print': {
            display: 'none !important',
          },
        },
        ...reactCodeInputStyles,
      }}
    />
  );
}

export default GlobalStyles;
