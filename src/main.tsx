import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { MantineProvider, createEmotionCache } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';

const container = document.getElementById('root');
const root = createRoot(container!);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionCache={createEmotionCache({
        key: 'mantine',
        prepend: false,
      })}
    >
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
);
