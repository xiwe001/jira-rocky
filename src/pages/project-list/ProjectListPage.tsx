import React, { useState, useEffect } from 'react'
import { cleanObject, useArray, useDebounce, useMount, resetRoute } from "../../utils/index";
import { useHttp } from "../../utils/http";
import { ProjectSearch, ProjectList, ButtonNoPadding, Row, ProjectModal, ProjectPopover, UserPopover } from '../../components'
import styled from "@emotion/styled";
import { Project } from '../../types/project';
import { useAuth } from "../../context/auth-context";
import { ReactComponent as SoftwareLogo } from "../../assets/software-logo.svg";
import { Button, Dropdown, Menu, Typography } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { useAsync } from '../../utils/use-async';
import { useProjects, useProjects1 } from '../../utils/project';
import { useUsers1 } from '../../utils/user';

export const ProjectListPage = () => {
  //1, Projects
  // const [list, setList] = useState([]);
  const [param, setParam] = useState<{ name: string; personId: string }>({
    name: "",
    personId: "",
  });
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<null | Error>(null);

  //const debouncedParam = useDebounce(param.name, 1000);
  const debouncedParam = useDebounce(param, 300);
  const client = useHttp();
 //  const {run,isLoading,error,data:list} = useAsync<Project[]>()
  const {isLoading,error,data:list} = useProjects1(debouncedParam)
  useEffect(() => {
    //run(client("projects", { data: cleanObject(param) }))
    //console.log(param);
    // setIsLoading(true)
    // setTimeout(() => {
    //   client("projects", { data: cleanObject(param) })
    //     .then( list => {
    //       setList(list)
    //       // throw new Error('当前时间无法执行')
          
    //       setError(null)
    //     })
    //     .catch(error=>{
    //       setList([])
    //       setError(error)
    //     })
    //     .finally(() => {
    //       setIsLoading(false)
    //     })
    // }, 0);

    // const url =`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`
    // // console.log(url);
    // fetch(url).then(async (response)=>{
    //     if(response.ok){
    //         setList(await response.json())
    //     }
    // })
    // console.log(list);
  }, [debouncedParam, param.personId]);


  //2, Users
  // const [users, setUsers] = useState([]);
  // useMount(() => {
  //   client("users", {}).then(setUsers);
  //   // fetch(`${apiUrl}/users`).then(async (response)=>{
  //   //     if(response.ok){
  //   //         setUsers(await response.json())
  //   //     }
  //   // })
  // });

  const {data:users} = useUsers1()


  return (
    <div>
      <Container>
        <PageHeader />
        <div style={{ padding: '0 10rem' }}>
          <h2 style={{ marginTop: 20 }}>项目列表</h2>
          <ProjectSearch users={users || []} param={param} setParam={setParam} />
          {error?<Typography.Text type={'danger'}>{error.message}</Typography.Text>:null}
          <ProjectList users={users || []} dataSource={list||[]} loading={isLoading} />
        </div>

      </Container>

    </div>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 6rem 1fr;
  height: 100vh;
`;


const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding>
        {/* <ProjectPopover />
        <UserPopover /> */}
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  // console.log(user);

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.username}
      </Button>
    </Dropdown>
  );
};

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
