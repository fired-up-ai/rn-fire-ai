// /src/routes/_layout.tsx
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../ctx/AuthContext';
import React from 'react';

const RootLayout = () => {
    const { user } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const inAuthGroup = segments[0] ==='(auth)';
        if (!user && !inAuthGroup) {
            router.replace('/login');
        } else if (user && inAuthGroup) {
            router.replace('/');
        }
    }, [user, segments]);

    return (
        <Slot />
    );
}

export default RootLayout;