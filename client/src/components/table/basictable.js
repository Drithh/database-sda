import MaterialTable from '@material-table/core';
import { useState, useEffect } from 'react';
import Axios from 'axios';

const failedMessage = (message) => {
  let failedMessage = JSON.stringify(message);
  failedMessage = failedMessage.match('duplicate')
    ? 'Cannot insert duplicate key'
    : failedMessage.match('truncated')
    ? 'Data too long'
    : failedMessage;
  return 'Query Failed\n' + failedMessage;
};

const BasicTable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get/table/KOTA').then((response) => {
      setColumns(
        Object.keys(response.data[0]).map((key) => {
          return {
            title: key,
            field: key,
          };
        })
      );
      setData(response.data);
    });
  }, []);

  return (
    <MaterialTable
      title="Basic Table"
      columns={columns}
      data={data}
      options={{
        sorting: true,
        actionsColumnIndex: -1,
        addRowPosition: 'first',
      }}
      editable={{
        onRowAdd: (newData) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              Axios.post(
                'http://localhost:3001/api/post/insert/KOTA',
                newData
              ).then((response) => {
                if (response.data === 1) {
                  setData([...data, newData]);
                  alert('success');
                  resolve();
                } else {
                  alert(failedMessage(response.data));
                  reject();
                }
              });
            }, 1000);
          });
        },
        onRowDelete: (oldData) => {
          return new Promise((resolve, reject) => {
            const index = oldData.tableData.id;
            setTimeout(() => {
              Axios.post(
                'http://localhost:3001/api/post/delete/KOTA',
                oldData
              ).then((response) => {
                if (response.data === 1) {
                  setData(data.filter((row, i) => i !== index));
                  alert('success');
                  resolve();
                } else {
                  alert(failedMessage(response.data));
                  reject();
                }
              });
            }, 1000);
          });
        },
        onRowUpdate: (newData, oldData) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              Axios.post('http://localhost:3001/api/post/update/KOTA', [
                newData,
                oldData,
              ]).then((response) => {
                console.log(newData, oldData);
                if (response.data === 1) {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);
                  alert('success');
                  resolve();
                } else {
                  alert(failedMessage(response.data));
                  reject();
                }
              });
            }, 1000);
          });
        },
      }}
    />
  );
};

export default BasicTable;
