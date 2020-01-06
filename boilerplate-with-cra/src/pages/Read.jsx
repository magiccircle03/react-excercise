import React from 'react';
import { Button, Table } from 'antd';
const axios = require('axios');

class Read extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      columns: [],
      cnt: 0,
      loading: false,
    };

    this.getData = this.getData.bind(this);
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
        <h1>Read 연습 페이지</h1>
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

export default Read;
