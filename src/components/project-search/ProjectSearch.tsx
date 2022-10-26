import { Input, Select, Form } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { User } from '../../types/user'

interface SearchProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchProps["param"]) => void;
}

export const ProjectSearch = ({ users, param, setParam }: SearchProps) => {
  return (
    <>
      <Form style={{ marginBottom: "1rem", marginTop: '2rem', display: 'flex', justifyContent: 'left' }} layout={"inline"}>
        <Form.Item>
          {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
          <Input
            placeholder={"项目名"}
            type="text"
            value={param.name}
            onChange={(evt) =>
              setParam({
                ...param,
                name: evt.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item>
          <Select
            value={param.personId}
            onChange={(value) =>
              setParam({
                ...param,
                personId: value,
              })
            }
          >
            <Select.Option value={""}>负责人</Select.Option>
            {users.map((user) => (
              <Select.Option key={user.id} value={user.id}>
                {user.username}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </>

  );
};
