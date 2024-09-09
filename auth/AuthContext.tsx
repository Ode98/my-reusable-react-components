import { useState, useContext, createContext, useEffect } from "react";
import { api } from "@api";

interface AuthContextType {
  user: User | null;
  handleSignIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
  handleSignUp: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
  handleSignOut: () => void;
  isPending: boolean;
  isAuthenticating: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  handleSignIn: () => {},
  handleSignUp: () => {},
  handleSignOut: () => {},
  isPending: false,
  isAuthenticating: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  useEffect(() => {
    // get current auth state
    // setUser(user)
  }, []);

  const handleSignIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsPending(true);
    try {
      const signInResponse = await api.login({
        email: email,
        password: password,
      });
      setUser(signInResponse.user);
      // toast success
    } catch (error) {
      // toast error
    } finally {
      setIsPending(false);
    }
  };

  const handleSignUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsPending(true);
    try {
      const signUpResponse = await api.signUp({
        email: email,
        password: password,
      });
      // toast success
    } catch (error) {
      // toast error
    } finally {
      setIsPending(false);
      // toast success
    }
  };

  const handleSignOut = async () => {
    setIsPending(true);
    try {
      const signOutResponse = await api.signOut();
      setUser(null);
    } catch (error) {
      // toast error
    } finally {
      setIsPending(false);
      // toast success
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSignIn,
        handleSignUp,
        handleSignOut,
        isPending,
        isAuthenticating,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export { useAuthContext };
