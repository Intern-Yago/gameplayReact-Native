import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    CDN_IMAGE,
    SCOPE,
    RESPONSE_TYPE,
    REDIRECT_URI,
    CLIENT_ID,
    COLLECTION_USERS
} from '../configs';
import { api } from "../services/api";

WebBrowser.maybeCompleteAuthSession();

const SECURE_TOKEN_KEY = '@gameplay:token';

export type User = {
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
};

type AuthContextData = {
    user: User;
    loading: boolean;
    signIn: () => Promise<void>;
    signInGuest: () => Promise<void>;
    signOut: () => Promise<void>;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(true);

    async function signOut() {
        setUser({} as User);
        delete api.defaults.headers.common['Authorization'];
        await AsyncStorage.removeItem(COLLECTION_USERS);
        try {
            await SecureStore.deleteItemAsync(SECURE_TOKEN_KEY);
        } catch (e) {
            console.log('SecureStore delete error:', e);
        }
    }

    async function signInGuest() {
        setLoading(true);
        try {
            const guestUser: User = {
                id: 'guest_' + Date.now(),
                username: 'Jogador Convidado',
                firstName: 'Jogador',
                avatar: 'https://github.com/identicons/app.png',
                email: 'convidado@gameplay.com',
                token: 'guest_token'
            };

            await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(guestUser));
            setUser(guestUser);
        } catch (error) {
            console.log('Erro ao entrar como convidado:', error);
        } finally {
            setLoading(false);
        }
    }

    async function signIn() {
        try {
            setLoading(true);

            const rawRedirectUri = REDIRECT_URI || 'https://auth.expo.io/@syri_cotocs/gameplayreact-native';
            const redirectUri = rawRedirectUri.includes('%3A') ? decodeURIComponent(rawRedirectUri) : rawRedirectUri;
            
            const scopeParam = SCOPE.includes('%20') ? decodeURIComponent(SCOPE) : SCOPE;
            
            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(scopeParam)}`;

            const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

            if (result.type === 'success' && result.url) {
                const paramsString = result.url.split('#')[1] || result.url.split('?')[1] || '';
                const params = new URLSearchParams(paramsString);
                const token = params.get('access_token');

                if (token) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const userInfo = await api.get('/users/@me');

                    const firstName = userInfo.data.username ? userInfo.data.username.split(' ')[0] : 'Jogador';
                    const avatar = userInfo.data.avatar
                        ? `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`
                        : `https://cdn.discordapp.com/embed/avatars/0.png`;

                    const userData: User = {
                        ...userInfo.data,
                        firstName,
                        avatar,
                        token
                    };

                    await SecureStore.setItemAsync(SECURE_TOKEN_KEY, token);
                    await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify({ ...userData, token: '' }));
                    setUser(userData);
                    return;
                }
            }

            if (result.type === 'cancel') {
                return;
            }

            throw new Error("Autenticação não concluída no navegador.");
        } catch (error: any) {
            console.log('SignIn Auth error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function loadUserStorageData() {
        try {
            const token = await SecureStore.getItemAsync(SECURE_TOKEN_KEY);
            const storage = await AsyncStorage.getItem(COLLECTION_USERS);

            if (storage) {
                const userLogged = JSON.parse(storage) as User;
                if (token) {
                    userLogged.token = token;
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
                setUser(userLogged);
            }
        } catch (error) {
            console.log('Failed to load user storage:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUserStorageData();

        const interceptor = api.interceptors.response.use(
            response => response,
            async error => {
                if (error.response && error.response.status === 401) {
                    await signOut();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(interceptor);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, signIn, signInGuest, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };