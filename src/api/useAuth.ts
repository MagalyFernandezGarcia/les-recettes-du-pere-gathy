import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";
import { UserContext } from "../hooks/userContext";
import { useContext } from "react";

const allowedUsers = [
  "arno.firefox@gmail.com",
  "fernandezgarciamagaly@gmail.com",
];

export const useAuth = () => {
  const { user, setUser } = useContext(UserContext);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const login = async () => {
    const {
      user: { providerData },
    } = await signInWithPopup(auth, provider);
    const userData = providerData[0];
    if (userData.displayName && userData.email) {
      setUser({
        name: userData.displayName,
        mail: userData.email,
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(undefined);
  };

  return {
    login,
    logout,
    user,
    isUserAllowed: user && allowedUsers.includes(user.mail),
  };
};
