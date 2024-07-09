import { FirebaseApp, initializeApp } from 'firebase/app';

import {getAuth, connectAuthEmulator, Auth } from 'firebase/auth';
import portConfig from "../../../../firebase.json";

import { 
    getFirestore, 
    Firestore, 
    connectFirestoreEmulator 
} from 'firebase/firestore';

import { 
    getStorage, 
    FirebaseStorage, 
    connectStorageEmulator 
} from 'firebase/storage';

import { 
    getFunctions, 
    Functions, 
    connectFunctionsEmulator
} from 'firebase/functions';




/**
 * @interface FirebaseConfig
 * @description
 * FirebaseConfig is an interface that defines the configuration
 * required to initialize the Firebase app.
 * 
 * @property {string} apiKey - Firebase API key
 * @property {string} authDomain - Firebase auth domain
 * @property {string} projectId - Firebase project ID
 * @property {string} storageBucket - Firebase storage bucket
 * @property {string} messagingSenderId - Firebase messaging sender ID
 * @property {string} appId - Firebase app ID
 * @property {string} measurementId - Firebase measurement ID
 * 
 */
export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

/**
 * @interface Firebase
 * @description
 * Firebase is an interface that defines the Firebase services
 * that are initialized by the FirebaseCore instance.
 * 
 * @property {FirebaseApp} app - Firebase app
 * @property {Auth} auth - Firebase auth service
 * @property {Firestore} firestore - Firebase firestore service
 * @property {FirebaseStorage} storage - Firebase storage service
 * @property {Functions} functions - Firebase functions service
 * 
 */
export interface Firebase {
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
    storage: FirebaseStorage;
    functions: Functions;
}

/**
 * @singleton
 * @class FirebaseCore
 * @description
 * FirebaseCore is a singleton class that initializes the Firebase app
 * and provides access to the Firebase services.
 * 
 * @property {Firebase} firebase - Firebase services
 * @property {FirebaseCore} instance - Firebase core instance
 * 
 * @example
 * const firebaseCore = FirebaseCore.getInstance();
 * const firebase = firebaseCore.getFirebase();
 * const auth = firebase.auth;
 * const firestore = firebase.firestore;
 * const storage = firebase.storage;
 * const functions = firebase.functions;
 */
export default class FirebaseCore {
    private static instance: FirebaseCore;
    private firebase: Firebase;


    private constructor() {
        const config: FirebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY || '',
            authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
            projectId: process.env.FIREBASE_PROJECT_ID || '',
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
            appId: process.env.FIREBASE_APP_ID || '',
            measurementId: process.env.FIREBASE_MEASUREMENT_ID || ''
        };
        
        const app = initializeApp(config);
        // TODO: Add auth persistence for web and react-native
        // For web use: setPersistence(auth, browserLocalPersistence)
        // For react-native use: setPersistence(auth, reactNativePersistence)
        
        this.firebase = {
            app,
            auth: getAuth(app),
            firestore: getFirestore(app),
            storage: getStorage(app),
            functions: getFunctions(app),
        };
        if (process.env.USE_FIREBASE_EMULATOR === "true") {
            if (typeof process.env.EMULATOR_HOST !== 'string') {
                throw new Error('EMULATOR_HOST is not set');
            }
            connectAuthEmulator(
                this.firebase.auth, 
                `http://${process.env.EMULATOR_HOST}:${portConfig.emulators.auth.port}`
            );
            connectFirestoreEmulator(
                this.firebase.firestore, 
                process.env.EMULATOR_HOST, 
                portConfig.emulators.firestore.port
            );
            connectStorageEmulator(
                this.firebase.storage, 
                process.env.EMULATOR_HOST, 
                portConfig.emulators.storage.port
            );
            connectFunctionsEmulator(
                this.firebase.functions, 
                process.env.EMULATOR_HOST, 
                portConfig.emulators.functions.port
            );
        }
    }
    
    
    /**
     * Returns the FirebaseCore instance if it exists, 
     * otherwise creates a new instance and returns it.
     * @returns {FirebaseCore} FirebaseCore instance
     */
    public static getInstance(): FirebaseCore {
        if (!FirebaseCore.instance) {
            FirebaseCore.instance = new FirebaseCore();
        }
        return FirebaseCore.instance;
    }

    /**
     * firebase object that contains the Firebase services
     * initialized by the FirebaseCore instance.
     * @returns {Firebase} Firebase services
     */
    public getFirebase(): Firebase {
        return this.firebase;
    }
}