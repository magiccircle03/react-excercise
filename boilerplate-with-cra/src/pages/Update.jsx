import React from 'react';

import { Button, Table, Input, Row, Col, Modal } from 'antd';

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
      visible: false,
      loading: false,
    };

    this.getData = this.getData.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  showModal = num => {
    this.setState({
      visible: true,
      id: num,
    });
  };

  handleOk = e => {
    console.log(e);
    this.updateData(this.state.id);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

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
    self.setState({
      loading: true,
    });
    axios
      .get('http://dummy.restapiexample.com/api/v1/employees')
      .then(function(response) {
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
            <a
              onClick={() => {
                self.showModal(record.id);
              }}
            >
              수정하기
            </a>
          ),
        });
        self.setState({
          dataSource: response.data,
          columns: colNamesArr,
          cnt: response.data.length,
          loading: false,
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
        <h1>Update 연습 페이지</h1>
        <Button onClick={this.getData}>전체 api 호출</Button>

        <p>{this.state.cnt}개의 데이터</p>
        <Table
          loading={this.state.loading}
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          rowKey="id"
        />

        <Modal
          title="수정하기 Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{this.state.id}번 사원 수정</p>
          <Input
            placeholder="사원의 이름"
            onChange={e => {
              this.setState({
                name: e.target.value,
              });
            }}
          />
          <Input
            placeholder="사원의 월급"
            onChange={e => {
              this.setState({
                salary: e.target.value,
              });
            }}
          />

          <Input
            placeholder="사원의 나이"
            onChange={e => {
              this.setState({
                age: e.target.value,
              });
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default Update;
