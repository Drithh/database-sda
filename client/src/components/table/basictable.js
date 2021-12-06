import MaterialTable from '@material-table/core';
import { useState, useEffect } from 'react';
import Axios from 'axios';
// import tableIcons from './materialtableicon';

const BasicTable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get/table/AIRWAYS').then(
      (response) => {
        setColumns(
          Object.keys(response.data[0]).map((key) => {
            return {
              title: key,
              field: key,
            };
          })
        );
        setData(response.data);
      }
    );
  }, []);

  return (
    <MaterialTable
      title="Basic Table"
      // icons={tableIcons}
      columns={columns}
      data={data}
      options={{ sorting: true }}
      action={[
        {
          // icon: tableIcons.Edit,
          tooltip: 'Edit',
          onClick: (event, rowData) => {
            console.log(rowData);
          },
        },
        {
          // icon: tableIcons.Delete,
          tooltip: 'Delete',
          onClick: (event, rowData) => {
            console.log(rowData);
          },
        },
      ]}
    />
  );
};

export default BasicTable;
