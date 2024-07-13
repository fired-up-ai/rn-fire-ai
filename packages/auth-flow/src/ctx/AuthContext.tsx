// /src/ctx/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { AuthService } from 'web-firebase';

type AuthContextType = {
    user: any | null;
    signInEmail: (email: string, password: string) => Promise<void>;
    signUpEmail: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    signInGoogle: () => Promise<void>;
    signInGitHub: () => Promise<void>;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any | null>(null);
    const router = useRouter();
    const segments = useSegments();
    const auth = new AuthService();

    useEffect(() => {
        const unsubscribe = auth.getAuth().onAuthStateChanged((user: any) => {
            setUser(user);
        });

        return () => {
            unsubscribe();
        }

    }, []);

    const signInEmail = async (email: string, password: string) => {
        await auth.signInWithEmail(email, password);
    };

    const signUpEmail = async (email: string, password: string) => {
        await auth.signUpWithEmail(email, password);
    };

    const signOut = async () => {
        await auth.signOut();
    };

    const signInGoogle = async () => {
        await auth.signInWithGoogle();
    };

    const signInGitHub = async () => {
        await auth.signInWithGithub();
    };

    return (
        <AuthContext.Provider value={
            {   user, 
                signInEmail, 
                signUpEmail, 
                signOut, 
                signInGoogle, 
                signInGitHub 
            }
        }>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};