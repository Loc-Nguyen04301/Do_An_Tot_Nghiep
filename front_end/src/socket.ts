import { io } from 'socket.io-client';
const URL = import.meta.env.VITE_SERVER_PORT;
export const socket = io(URL,
    {
        withCredentials: true,
        extraHeaders: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
    });

