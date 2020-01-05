import React from 'react';
import { Button, Table } from 'antd';
const axios = require('axios');

let dataSource;
let columns;
let cnt;

class Read extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      columns: [],
      cnt: 0,
    };

    this.getData = this.getData.bind(this);
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
        <h1>read 연습 페이지</h1>
        <Button onClick={this.getData}>api 호출</Button>
        <p>{this.state.cnt}개의 데이터</p>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

export default Read;
