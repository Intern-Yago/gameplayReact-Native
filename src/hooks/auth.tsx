import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import * as AuthSession from 'expo-auth-session';
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

const SECURE_TOKEN_KEY = '@gameplay:token';

type User = {
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
    signOut: () => Promise<void>;
};

type AuthProviderProps = {
    children: ReactNode;
};

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string;
        error?: string;
    };
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

    async function signIn() {
        try {
            setLoading(true);
            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const response = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

            if (response.type === "success" && !response.params.error) {
                const token = response.params.access_token || '';
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

                // Store sensitive token in Hardware-encrypted SecureStore
                await SecureStore.setItemAsync(SECURE_TOKEN_KEY, token);
                await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify({ ...userData, token: '' }));
                setUser(userData);
            }
        } catch (error) {
            throw new Error("Não foi possível autenticar");
        } finally {
            setLoading(false);
        }
    }

    async function loadUserStorageData() {
        try {
            const token = await SecureStore.getItemAsync(SECURE_TOKEN_KEY);
            const storage = await AsyncStorage.getItem(COLLECTION_USERS);

            if (token && storage) {
                const userLogged = JSON.parse(storage) as User;
                userLogged.token = token;
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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

        // Add 401 Unauthorized Interceptor to auto logout on expired token
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
        <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };