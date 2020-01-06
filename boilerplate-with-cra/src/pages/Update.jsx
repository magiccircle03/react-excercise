import React from 'react';

import { Button, Table, Input, Row, Col } from 'antd';

const axios = require('axios');

class Update extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      columns: [],
      cnt: 0,
      name: '',
      salary: '',
      age: '',
      id: '',
    };

    this.getData = this.getData.bind(this);
    this.getDataOne = this.getDataOne.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  updateData(id) {
    let self = this;
    const config = { headers: { 'Content-Type': 'application/json' } };

    axios
      .put('http://dummy.restapiexample.com/api/v1/update/' + this.state.id, {
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
        colNamesArr.push({
          title: 'Action',
          key: 'action',
          render: () => <a>수정하기</a>,
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

  getDataOne() {
    //alert(this.state.id + '번 사원의 정보 조회');
    let self = this;
    axios
      .get('http://dummy.restapiexample.com/api/v1/employee/' + this.state.id)
      .then(function(response) {
        console.log(response);
        let colNames = Object.keys(response.data);
        //console.log(colNames);
        self.setState({});
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <a href="./">Home으로</a>
        <h1>Update 연습 페이지</h1>
        <Button onClick={this.getData}>전체 api 호출</Button>
        <Input
          placeholder="특정 사원의 id"
          onChange={e => {
            this.setState({
              id: e.target.value,
            });
          }}
        />
        {/* <Button onClick={this.getDataOne}>해당 사원 조회</Button> */}
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
            <Button onClick={this.updateData}>수정</Button>
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

export default Update;
