import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ColorModeScript } from '@chakra-ui/react';
import App from './App';
import { store } from '@/app/store';
import theme from '@/styles/theme';
import './index.css';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
