import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "'Outfit', 'Inter', system-ui, sans-serif",
    body: "'Outfit', 'Inter', system-ui, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      },
    },
  },
  colors: {
    brand: {
      50: '#e3f2ff',
      100: '#b9daff',
      200: '#8fc1ff',
      300: '#65a8ff',
      400: '#3a90ff',
      500: '#2076e6',
      600: '#165cb4',
      700: '#0d4282',
      800: '#032751',
      900: '#000f22',
    },
  },
});

export default theme;
