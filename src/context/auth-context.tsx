import React, { ReactNode } from "react";
import * as auth from "../utils/auth-provider";
import { User } from "../types/user";
import { http } from "../utils/http";
import { useMount } from "../utils/index";
import { useAsync } from "../utils/use-async";
import {FullPageLoading,FullPageErrorFallback} from '../components/library'

interface AuthForm {
  username: string;
  password: string;
}

//页面加载的时候，尝试读取localStorage里面的用户信息
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;

  }
  // console.log(user);
  
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
    });

  useMount(() => {
    // bootstrapUser().then(setUser);
    run(bootstrapUser())
  });

  if(isIdle || isLoading){
    return <FullPageLoading/>
  }

  if(isError){
    return <FullPageErrorFallback error={error} />
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
