import React, { useState, useEffect } from 'react';
import { Sunburst } from './Sunburst';

import Axios from 'axios';

const url = 'http://localhost:8081/';

const templateData = {
  name: 'SDA',
  children: [
    {
      name: 'Pertambangan',
      children: [
        { name: 'Mineral', children: [] },
        { name: 'Tanah', children: [] },
        { name: 'Minyak Bumi', children: [] },
      ],
    },
    {
      name: 'Kehutanan',
      children: [],
    },
    {
      name: 'Perkebunan',
      children: [],
    },
  ],
};
export const SunburstGraph = () => {
  const [data1, setData1] = React.useState();
  useEffect(() => {
    Axios.get(url + 'get/totalHasil').then((response) => {
      templateData.children[1].children = response.data[0];
      templateData.children[2].children = response.data[3];
      templateData.children[0].children[0] = response.data[1];
      templateData.children[0].children[1] = response.data[4];
      templateData.children[0].children[2] = response.data[2];
      setData1(templateData);
    });
  }, []);
  if (data1) {
    return (
      <div>
        <Sunburst data={data1} />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
