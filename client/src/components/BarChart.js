import React, { useState } from 'react';
import { StackedBarGraph } from './StackedBarChart';

const data = [
  {
    name: 'Brand 0',
    Affiliate: 10,
    Social: 20,
    Media: 30,
    Makan: 40,
    Minum: 10,
    Mabar: 16,
    Siapa: 10,
    Kenapa: 13,
  },
  {
    name: 'Brand 1',
    Affiliate: 20,
    Social: 40,
    Media: 60,
    Makan: 40,
    Minum: 10,
    Mabar: 16,
    Siapa: 10,
    Kenapa: 13,
  },
  {
    name: 'Brand 2',
    Affiliate: 30,
    Social: 45,
    Media: 80,
    Makan: 40,
    Minum: 10,
    Mabar: 16,
    Siapa: 10,
    Kenapa: 13,
  },
  {
    name: 'Brand 3',
    Affiliate: 40,
    Social: 60,
    Media: 100,
    Makan: 40,
    Minum: 10,
    Mabar: 16,
    Siapa: 10,
    Kenapa: 13,
  },
  {
    name: 'Brand 4',
    Affiliate: 50,
    Social: 80,
    Media: 120,
    Makan: 40,
    Minum: 10,
    Mabar: 16,
    Siapa: 10,
    Kenapa: 13,
  },
  {
    name: 'Brand 5',
    Affiliate: 50,
    Social: 80,
    Media: 120,
    Makan: 40,
    Minum: 10,
    Mabar: 16,
    Siapa: 200,
    Kenapa: 13,
  },
];

const allKeys = [
  'Affiliate',
  'Social',
  'Media',
  'Makan',
  'Minum',
  'Mabar',
  'Siapa',
  'Kenapa',
];

const colors = {
  Affiliate: '#CFCBC9',
  Social: '#ECE8DB',
  Media: '#C1CCCA',
  Makan: '#AEBCC4',
  Minum: '#D3CBC7',
  Mabar: '#E1DACC',
  Siapa: '#F7F3E7',
  Kenapa: '#CFCFC3',
};

export const D3BarGraph = () => {
  const [keys, setKeys] = useState(allKeys);

  return (
    <div className="">
      <StackedBarGraph datasets={data} colors={colors} keys={keys} />
      <div className="fields m-auto  flex justify-evenly h-12 ">
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
};
