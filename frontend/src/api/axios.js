import axios from 'axios';

// Instancia global de Axios apuntando al servidor Express
const clienteAxios = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Interceptor para adjuntar automáticamente el Token JWT si existe
clienteAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default clienteAxios;