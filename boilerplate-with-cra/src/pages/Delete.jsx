import React from 'react';
import { Button, Table, Input, Row, Col, Popconfirm } from 'antd';
const axios = require('axios');

class Delete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      columns: [],
      cnt: 0,
      empNum: 0,
      loading: false,
    };
  }

  getData = () => {
    this.setState({
      loading: true,
    });
    axios
      .get('http://dummy.restapiexample.com/api/v1/employees')
      .then(response => {
        let colNames = Object.keys(response.data[0]);
        let colNamesArr = [];

        for (let i in colNames) {
          colNamesArr.push({
            title: colNames[i],
            dataIndex: colNames[i],
            key: colNames[i],
          });
        }
        colNamesArr.push({
          title: 'Action',
          key: 'action',
          render: record => (
            <Popconfirm
              placement="leftTop"
              title="삭제할까요?"
              onConfirm={() => {
                this.deleteData(record.id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <a>delete</a>
            </Popconfirm>
          ),
        });

        this.setState({
          dataSource: response.data,
          columns: colNamesArr,
          cnt: response.data.length,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteData = num => {
    axios
      .delete('	http://dummy.restapiexample.com/api/v1/delete/' + num)
      .then(response => {
        console.log(response);
        console.log(num + '번 사원 삭제됨');
        this.getData();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <a href="./">Home으로</a>
        <h1>Delete 연습 페이지</h1>

        <Button onClick={this.getData}>api 호출</Button>

        <p>{this.state.cnt}개의 데이터</p>
        <Table
          loading={this.state.loading}
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          rowKey="id"
        />
      </div>
    );
  }
}

export default Delete;
