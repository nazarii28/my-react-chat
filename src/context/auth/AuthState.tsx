import {Auth, getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {FirebaseApp, initializeApp} from "firebase/app";
import {createContext, ReactNode} from "react";

export interface IAuthContext {
    app: FirebaseApp;
    auth: Auth;
    signIn: () => void;
}

interface IAuthStateProps {
    children: ReactNode
}

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const signIn = () => {
    signInWithPopup(auth, provider)
};

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthState = ({children}: IAuthStateProps) => {
    return (
        <AuthContext.Provider value={{auth, app, signIn}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthState;