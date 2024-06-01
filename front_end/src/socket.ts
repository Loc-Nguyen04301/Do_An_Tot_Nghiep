import { io } from 'socket.io-client';
const URL = import.meta.env.VITE_SERVER_PORT;
export const socket = io(URL);

