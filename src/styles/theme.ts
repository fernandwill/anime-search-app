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
    global: (props: { colorMode: 'light' | 'dark' }) => ({
      body: {
        bg: props.colorMode === 'light' ? 'gray.50' : 'gray.900',
        color: props.colorMode === 'light' ? 'gray.900' : 'gray.50',
        transitionProperty: 'background-color, color',
        transitionDuration: '200ms',
        transitionTimingFunction: 'ease-in-out',
      },
    }),
  },
  semanticTokens: {
    colors: {
      surface: {
        default: 'white',
        _dark: 'gray.900',
      },
      surfaceMuted: {
        default: 'gray.100',
        _dark: 'blackAlpha.400',
      },
      borderSubtle: {
        default: 'blackAlpha.200',
        _dark: 'whiteAlpha.200',
      },
      textMuted: {
        default: 'gray.600',
        _dark: 'whiteAlpha.700',
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
