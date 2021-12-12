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
    Siapa: 10,
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
  Affiliate: 'rgba(69, 0, 0, 1)',
  Social: 'rgba(240, 72, 19, 1)',
  Media: 'rgba(255, 199, 128, 1)',
  Makan: 'rgba(200, 199, 128, 1)',
  Minum: 'rgba(50, 199, 128, 1)',
  Mabar: 'rgba(155, 199, 128, 1)',
  Siapa: 'rgba(255, 99, 128, 1)',
  Kenapa: 'rgba(255, 199, 28, 1)',
};

export const D3BarGraph = () => {
  const [keys, setKeys] = useState(allKeys);

  return (
    <div>
      <StackedBarGraph datasets={data} colors={colors} keys={keys} />
      <div className="fields m-auto  flex justify-evenly h-12 border-b border-solid border-secondary border-opacity-50">
        {allKeys.map((key) => (
          <div key={key} className="field flex font-PT font-light">
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
