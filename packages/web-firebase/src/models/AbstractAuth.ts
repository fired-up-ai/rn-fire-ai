import { Auth, User, UserCredential } from 'firebase/auth';
import  FirebaseCore from '../core/FirebaseCore';

export default abstract class AbstractAuth {
    
    protected auth: Auth;

    constructor() {
        this.auth = FirebaseCore.getInstance().getFirebase().auth;
    }

    public abstract signInWithEmail(email: string, password: string): Promise<UserCredential>;
    public abstract signOut(): Promise<void>;
    public abstract signInWithGoogle(): Promise<UserCredential>;
    public abstract signInWithGithub(): Promise<UserCredential>;
    public abstract signUpWithEmail(email: string, password: string): Promise<UserCredential>;
    public abstract getUser(): User | null;
    public abstract getUserToken(): Promise<string | null>;
    
    public getAuth(): Auth {
        return this.auth;
    }
}