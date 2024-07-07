import { FirebaseStorage, ref } from "firebase/storage";
import FirebaseCore from "../core/FirebaseCore";

export default abstract class AbstractStorage {
    
    protected storage: FirebaseStorage;
    protected _rootRef: any;

    constructor() {
        this.storage = FirebaseCore.getInstance().getFirebase().storage;
        this._rootRef = ref(this.storage);
    }

    public abstract uploadFile(file: File, path: string): Promise<string>;
    
    public abstract deleteFile(path: string): Promise<void>;

    public getStorage(): FirebaseStorage {
        return this.storage;
    }
}