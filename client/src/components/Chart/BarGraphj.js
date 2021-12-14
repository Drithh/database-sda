import React, { useState, useEffect } from 'react';
import { StackedBarGraph } from './StackedBarGraph';

import Axios from 'axios';

const url = 'https://api.apasih.site/';

const allKeys = [
  'Jawa',
  'Kalimantan',
  'KepulauanMaluku',
  'KepulauanSundaKecil',
  'Papua',
  'Sulawesi',
  'Sumatera',
];

const colors = {
  Jawa: '#CFCBC9',
  Kalimantan: '#ECE8DB',
  KepulauanMaluku: '#C1CCCA',
  KepulauanSundaKecil: '#AEBCC4',
  Papua: '#D3CBC7',
  Sulawesi: '#E1DACC',
  Sumatera: '#F7F3E7',
};

export const D3BarGraph = () => {
  const [keys, setKeys] = useState(allKeys);
  const [data, setData] = useState();
  useEffect(() => {
    Axios.get(url + 'get/topPotensi').then((response) => {
      setData(response.data);
    });
  }, []);
  if (data) {
    return (
      <div className="">
        <StackedBarGraph datasets={data} colors={colors} keys={keys} />
        <div className="fields m-auto flex justify-evenly h-12 ">
          {allKeys.map((key) => (
            <div key={key} className="field flex font-Source font-light">
              <input
                className="relative top-[.4rem]"
                id={key}
                type="checkbox"
                checked={keys.includes(key)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setKeys(Array.from(new Set([...keys, key])));
                  } else {
                    setKeys(keys.filter((_key) => _key !== key));
                  }
                }}
              />
              <label htmlFor={key} style={{ color: colors[key] }}>
                {key}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
