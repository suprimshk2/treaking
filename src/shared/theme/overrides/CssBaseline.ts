import VarelaRound from '../../assets/fonts/VarelaRound-Regular.ttf';
import Varela from '../../assets/fonts/Varela-Regular.ttf';

export const CssBaseline = () => ({
  MuiCssBaseline: {
    styleOverrides: `
        @font-face {
          font-family: 'Varela';
          font-style: normal;
          font-weight: normal;
          src: url(${Varela}) format('truetype');
        }
        @font-face {
          font-family: 'Varela Round';
          font-style: normal;
          font-weight: normal;
          src: url(${VarelaRound}) format('truetype');
        },
      `,
  },
});
