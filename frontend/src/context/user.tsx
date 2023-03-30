import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "typings/user";
import { useCurrentState } from "./global";
import { getUserDataFromToken, isClient, isSessionValid } from "helpers/auth";

export type UserProps = {
  user?: User;
};

type UserContextProps = {
  user?: User;
  refreshUser: () => Promise<User>;
};

const UserContext = createContext<UserContextProps>({
  refreshUser: () => Promise.reject("No current user."),
});

export const UserProvider = ({
  children,
  user: _user,
}: PropsWithChildren<{ user?: User }>) => {
  const [user, setUser] = useState<User | undefined>(_user);
  const { setGlobalState } = useCurrentState();

  const refreshUser = useCallback(() => {
    const data = getUserDataFromToken();
    setUser(data);
    return data;
  }, []);

  useEffect(() => {
    setGlobalState({
      isLoggedin: !!isSessionValid(),
      isClient: !!isClient(),
    });
    refreshUser();
  }, [refreshUser, setGlobalState]);

  return (
    <UserContext.Provider value={{ user, refreshUser }}>{children}</UserContext.Provider>
  );
};

export const useCurrentUser = () => {
  return useContext(UserContext);
};
