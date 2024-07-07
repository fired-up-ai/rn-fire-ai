import {
    FirebaseStorage,
    StorageReference,
    deleteObject,
    getBytes,
    getDownloadURL,
    ref,
    uploadBytes
} from "firebase/storage";

import AbstractStorage from "../models/AbstractStorage";

export default class CloudStorageService extends AbstractStorage {
    
    
    constructor() {
        super();
    }

    public async uploadFile(
        file: File,
        path: string
    ): Promise<string> {
        try {
            const fileRef = await this.createPathRef(path);
            await uploadBytes(fileRef, file);
            return getDownloadURL(fileRef);
        } catch (error) {
            throw error;
        }
    }

    public async deleteFile(path: string): Promise<void> {
        try {
            const fileRef = ref(this.storage, path);
            await deleteObject(fileRef);
        } catch (error) {
            throw error;
        }
    }

    public async createPathRef(path: string): Promise<StorageReference> {
        return ref(this.storage, path);
    }

    public async downloadFile(
        path: string
    ): Promise<ArrayBuffer | null> {
        // For this to work we need to configure cors on the bucket
        // https://cloud.google.com/storage/docs/configuring-cors
        try  {
            const fileRef = ref(this.storage, path);
            const fileBytes = await getBytes(fileRef);
            if (fileBytes) {
                return fileBytes;
            }
            return null; 
        } catch (error) {
            throw error;
        }
    }

}