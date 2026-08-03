import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import * as AuthSession from 'expo-auth-session';
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

    async function signIn() {
        try {
            setLoading(true);
            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const response = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

            if (response.type === "success" && !response.params.error) {
                const token = response.params.access_token;
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const userInfo = await api.get('/users/@me');

                const firstName = userInfo.data.username.split(' ')[0];
                const avatar = userInfo.data.avatar
                    ? `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`
                    : `https://cdn.discordapp.com/embed/avatars/0.png`;

                const userData: User = {
                    ...userInfo.data,
                    firstName,
                    avatar,
                    token: token || ''
                };

                await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
                setUser(userData);
            }
        } catch (error) {
            throw new Error("Não foi possível autenticar");
        } finally {
            setLoading(false);
        }
    }

    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(COLLECTION_USERS);
    }

    async function loadUserStorageData() {
        try {
            const storage = await AsyncStorage.getItem(COLLECTION_USERS);
            if (storage) {
                const userLogged = JSON.parse(storage) as User;
                api.defaults.headers.common['Authorization'] = `Bearer ${userLogged.token}`;
                setUser(userLogged);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUserStorageData();
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