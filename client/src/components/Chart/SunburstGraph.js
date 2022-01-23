import React, { useEffect } from 'react';
import { Sunburst } from './Sunburst';

import Axios from 'axios';
import { urlLink } from '../urlLink.js';

const templateData = {
  name: 'SDA12',
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
    Axios.get(urlLink + 'get/totalHasil').then((response) => {
      templateData.children[1].children = response.data[0];
      templateData.children[2].children = response.data[3];
      templateData.children[0].children[0].children = response.data[1];
      templateData.children[0].children[1].children = response.data[4];
      templateData.children[0].children[2].children = response.data[2];
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
