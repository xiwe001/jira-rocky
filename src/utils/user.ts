import { cleanObject } from './index';
import { useEffect } from 'react';
import { useAsync } from './use-async';
import { useHttp } from "./http";
import { User } from "../types/user";
import { useQuery } from "react-query";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};

export const useUsers1 = (param?: Partial<User>) => {
  const client = useHttp();
  const {run,...result} = useAsync<User[]>()
  useEffect(()=>{
    run(client("users",{data:cleanObject(param || {})}))
  },[param])
  return result;
};
