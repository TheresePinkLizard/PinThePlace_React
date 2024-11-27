import { Pin } from './pin';

export interface User {
    userName: string;
    userId: string;
    email: string;
    roles?: string[];
    pins: Pin[];
}