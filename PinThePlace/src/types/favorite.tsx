import { User } from './user';
import {Pin} from './pin';

export interface Favorite {
    favoriteId: number;
    pinId: number;
    category?: string;
    madeby: string;
    userId: string;
    user?: User;
    pin?: Pin;
}