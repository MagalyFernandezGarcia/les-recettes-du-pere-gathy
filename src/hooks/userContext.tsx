import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export type User = {
  name: string;
  mail: string;
};

export const UserContext = createContext<{
  setUser: Dispatch<SetStateAction<User | undefined>>;
  user: User | undefined;
}>({ setUser: () => {}, user: undefined });

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
