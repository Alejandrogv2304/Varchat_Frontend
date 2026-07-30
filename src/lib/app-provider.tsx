import type { PropsWithChildren } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from './theme';
import { queryClient } from './react-query';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}

//Sirve como envoltorio para la app, toma todo lo que se renderice dentro de App y le da acceso a herramientas globales
//sin tener que configurarlo componente a componente
