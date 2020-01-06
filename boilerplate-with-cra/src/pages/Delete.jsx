import React from 'react';
import { Button, Table, Input, Row, Col } from 'antd';
const axios = require('axios');

class Delete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      columns: [],
      cnt: 0,
      empNum: 0,
    };

    this.getData = this.getData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  getData() {
    let self = this;
    axios
      .get('http://dummy.restapiexample.com/api/v1/employees')
      .then(function(response) {
        let colNames = Object.keys(response.data[0]);
        let colNamesArr = [];

        for (let i = 0; i < colNames.length; i++) {
          colNamesArr.push({
            title: colNames[i],
            dataIndex: colNames[i],
            key: colNames[i],
          });
        }
        colNamesArr.push({
          title: 'Action',
          key: 'action',
          render: () => <a>Delete</a>,
        });

        self.setState({
          dataSource: response.data,
          columns: colNamesArr,
          cnt: response.data.length,
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteData() {
    let num = this.state.empNum;

    let self = this;

    axios
      .delete('	http://dummy.restapiexample.com/api/v1/delete/' + num)
      .then(function(response) {
        console.log(response);
        console.log(num + '번 사원 삭제됨');
        self.getData();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <a href="./">Home으로</a>
        <h1>Delete 연습 페이지</h1>

        <Button onClick={this.getData}>api 호출</Button>
        <Row>
          <Col span={12}>
            <Input
              placeholder="삭제할 사원의 id"
              onChange={e => {
                this.setState({
                  empNum: e.target.value,
                });
              }}
            />
          </Col>
          <Col span={12}>
            <Button onClick={this.deleteData}>삭제</Button>
          </Col>
        </Row>

        <p>{this.state.cnt}개의 데이터</p>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          rowKey="id"
        />
      </div>
    );
  }
}

export default Delete;
