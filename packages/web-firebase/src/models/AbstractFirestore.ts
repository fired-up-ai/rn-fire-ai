import { DocumentData, DocumentReference, Firestore } from "firebase/firestore";
import FirebaseCore from "../core/FirebaseCore";

export default abstract class AbstractFirestore {
    protected db: Firestore;

    constructor() {
        this.db = FirebaseCore.getInstance().getFirebase().firestore;
    }

    public getDb(): Firestore {
        return this.db;
    }

    public abstract createDoc(
        collectionName: string, 
        data: any
    ): Promise<DocumentReference | null>;

    public abstract updateDoc(
        collectionName: string, 
        docId: string, 
        data: any
    ): Promise<void>;

    public abstract deleteDoc(
        collectionName: string, 
        docId: string
    ): Promise<void>;

    public abstract getDoc(
        collectionName: string, 
        docId: string
    ): Promise<DocumentData | null>;
    
    public abstract getDocs(
        collectionName: string
    ): Promise<DocumentData[] | null>;
}