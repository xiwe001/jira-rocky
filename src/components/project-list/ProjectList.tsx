import { Table, TableProps } from "antd";
import React from "react";
import { User } from "../../types/user";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps extends TableProps<any> {
  // list: Project[];
  users: User[];
  // isloading: boolean;
}

export const ProjectList = ({ users, ...props}: ListProps) => {



  return (
    <Table
      pagination={false}
      {...props}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          key: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          key: 'responsiblePerson',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.username || "未知"}
              </span>
            );
          },
        },
      ]}
      // dataSource={list}
    />
  );

  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>名称</th>
  //         <th>负责人</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => (
  //         <tr key={project.id}>
  //           <td>{project.name}</td>
  //           <td>
  //             {users.find((user) => user.id === project.personId)?.name ||
  //               "未知"}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // )
};