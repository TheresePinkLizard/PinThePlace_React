import { User } from './user';

export interface Pin {
    pinId: number;
    name: string;
    rating: number;
    comment: string;
    imageUrl: string;
    latitude: number;
    longitude: number;
    uploadedImage: File;
    dateCreated: Date;
    userId: string;
    userName: string;
    user?: User;
}