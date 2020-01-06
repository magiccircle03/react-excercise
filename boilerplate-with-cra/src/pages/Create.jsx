import React from 'react';

import { Button, Table, Input, Row, Col } from 'antd';

const axios = require('axios');

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      columns: [],
      cnt: 0,
      name: '',
      salary: '',
      age: '',
    };

    this.getData = this.getData.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  submitData() {
    let self = this;
    const config = { headers: { 'Content-Type': 'application/json' } };

    axios
      .post('http://dummy.restapiexample.com/api/v1/create', {
        name: this.state.name,
        salary: this.state.salary,
        age: this.state.age,
      })
      .then(function(response) {
        console.log(response);
        self.getData();
      })
      .catch(function(error) {
        console.log(error);
      }, config);
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

  render() {
    return (
      <div>
        <a href="./">Home으로</a>
        <h1>Create 연습 페이지</h1>
        <Button onClick={this.getData}>api 호출</Button>
        <Row>
          <Col span={6}>
            <Input
              placeholder="사원의 이름"
              onChange={e => {
                this.setState({
                  name: e.target.value,
                });
              }}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder="사원의 월급"
              onChange={e => {
                this.setState({
                  salary: e.target.value,
                });
              }}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder="사원의 나이"
              onChange={e => {
                this.setState({
                  age: e.target.value,
                });
              }}
            />
          </Col>
          <Col span={6}>
            <Button onClick={this.submitData}>입력</Button>
          </Col>
        </Row>
        <br />
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

export default Create;
