import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
			staleTime: 1000 * 30,
		},
		mutations: {
			retry: 0,
		},
	},
});

//Aquí configuramos el queryClient de react-query, que es el cliente que maneja todas las consultas
//Se reintentan solo una vez las queries, no hace la consulta cuando se vuelve a la ventana y los datos 
//se consideran "frescos" por 30 segundos. Las mutaciones no se reintentan.
