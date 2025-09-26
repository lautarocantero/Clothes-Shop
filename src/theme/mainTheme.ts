import { createTheme } from '@mui/material';

//gracias a esto puedo agregar colores custom.
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      white: string;
      gray: string;
      lightGray: string;
      accent: string;
    };
  }
  interface ThemeOptions {
    custom?: {
      white?: string;
      gray?: string;
      lightGray?: string;
      accent?: string;
    };
  }
}

export const mainTheme = createTheme({
    palette: {
        primary: {
            main: '#FF6B00'
        },
        secondary: {
            main: '#F5F5F5'
        },
        error: {
            main: '#e83766'
        }
    },
    custom: {
        white: '#eff0f8',
        gray: 'E8E5E3',
        lightGray: '#727272ff',
        accent: '#333333',
    },
    typography: {
    fontFamily: `'Montserat', sans-serif`,
    htmlFontSize: 16,
    fontSize: 16,

    h1: {
      fontSize: '3rem', // 48px
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem', // 40px
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem', // 32px
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem', // 24px
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem', // 20px
      fontWeight: 400,
    },
    body1: {
      fontSize: '1.2rem', // 16px
    },
    body2: {
      fontSize: '0.875rem', // 14px
    },
    caption: {
      fontSize: '0.75rem', // 12px
    },
  },
})


