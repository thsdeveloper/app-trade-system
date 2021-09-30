import {createContext, useState} from 'react';
import Router from 'next/router';
import firebase from '../lib/firebase';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Realiza login no GitHubProvider.
    const signin = () => {
        try {
            setLoading(true);
            return firebase
                .auth()
                .signInWithPopup(new firebase.auth.GithubAuthProvider())
                .then((response) => {
                    setUser(response.user);
                    Router.push('/dashboard');
                });
        } finally {
            setLoading(false);
        }
    }

    //Realiza logout no firebase
    const signout = () => {
        try {
            Router.push('/');
            return firebase.auth().signOut().then(() => setUser(false));
        } finally {
            setLoading(false);
        }
    }

    return <AuthContext.Provider value={{user, loading, signin, signout}}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
