import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    CollectionReference,
    DocumentReference,
    getDoc,
    DocumentData,
} from 'firebase/firestore';
import AbstractFirestore from '../models/AbstractFirestore';

export default class DBService extends AbstractFirestore {
    
    constructor() {
        super();
    }

    public async createDoc(
        collectionName: string, 
        data: any
    ): Promise<DocumentReference | null> {
        try {
            const docRef = await addDoc(collection(this.db, collectionName), data);
            if (docRef) {
                return docRef;
            }
            return null;
        } catch (error: any) {
            throw new Error("Could not create document: " + error);
        }    
    }

    public async createDocWithId(
        collectionName: string, 
        docId: string,
        data: any
    ): Promise<void> {
        try {
            const docRef = doc(this.db, collectionName, docId);
            await setDoc(docRef, data);
        } catch (error: any) {
            throw new Error("Could not create document: " + error);
        }    
    }

    public async updateDoc(
        collectionName: string, 
        docId: string, 
        data: any
    ): Promise<void> {
        try {
            const docRef = doc(this.db, collectionName, docId);
            await updateDoc(docRef, data);
        } catch (error: any) {
            throw new Error("Could not update document: " + error);
        }
    }

    public async deleteDoc(
        collectionName: string, 
        docId: string
    ): Promise<void> {
        try {
            const docRef = doc(this.db, collectionName, docId);
            await deleteDoc(docRef);
        } catch (error: any) {
            throw new Error("Could not delete document: " + error);
        }
    }

    public async getDoc(
        collectionName: string, 
        docId: string
    ): Promise<DocumentData | null> {
        try {
            const docRef = doc(this.db, collectionName, docId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            }
            return null;
        } catch (error: any) {
            throw new Error("Could not get document: " + error);
        }
    }

    public async getDocs(
        collectionName: string
    ): Promise<DocumentData[] | null> {
        try {
            const querySnapshot = await getDocs(collection(this.db, collectionName));
            const docs: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
                docs.push(doc.data());
            });
            return docs;
        } catch (error: any) {
            throw new Error("Could not get documents' data: " + error);
        }
    }
    
    

    
}