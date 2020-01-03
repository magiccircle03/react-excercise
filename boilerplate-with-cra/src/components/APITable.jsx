import React from 'react';
import { Table } from 'antd';

// 이렇게 뭔가 받아서 하면 될 것 같은데...
// export default function APITable(props) {
//   return <Table dataSource={props.dataSource} columns={props.columns} />;
// }

// 아직 뭘 모르니까 일단 여기에 테스트 해보자
// let dataSource;
// let columns;

// function getEmp() {
//   var empJson = fetch('http://dummy.restapiexample.com/api/v1/employees', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then(response => response.json())
//     .then(jsonData => {});

//
// }

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

export default function APITable() {
  return <Table dataSource={dataSource} columns={columns} />;
}
