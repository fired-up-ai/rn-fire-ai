
import {
    User, 
    UserCredential,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    signInWithCredential,
    signInAnonymously,
    AuthCredential
} from "firebase/auth";

import AbstractAuth from "../models/AbstractAuth";


export default class AuthService extends AbstractAuth {
    private user: User | null = null;
    
    constructor() {
        super();
    }

    public async signInWithEmail(
        email: string, 
        password: string
    ): Promise<UserCredential> {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    public async signOut(): Promise<void> {
        return signOut(this.auth);
    }

    public async signInWithGoogle(): Promise<UserCredential> {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(this.auth, provider);
    }

    public async signInWithGithub(): Promise<UserCredential> {
        const provider = new GithubAuthProvider();
        return signInWithPopup(this.auth, provider);
    }

    public async signUpWithEmail(
        email: string, 
        password: string
    ): Promise<UserCredential> {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    public async onAuthStateChanged(): Promise<void> {
        this.auth.onAuthStateChanged((user: User | null) => {
            if (user) {
                this.user = user;
            }
        });
    }

    public getUser(): User | null {
        return this.user;
    }

    public getCurrentUser(): User | null {
        return this.auth.currentUser;
    }

    public async getUserToken(): Promise<string | null> {
        const user = this.getCurrentUser();
        if (user) {
            return user.getIdToken();
        }
        return null;
    }

    public async signInWithCredential(
        credential: AuthCredential
    ): Promise<UserCredential> {
        return signInWithCredential(this.auth, credential);
    }

    public async signInAnonymously(): Promise<UserCredential> {
        return signInAnonymously(this.auth);
    }

}
