const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL no está definida');
}

export const env = {
  API_URL,
};

//Aqui simplemente exportamos la variable de entorno de VITE_API_URL 