import React, { useState } from 'react';
import { CountrySelector } from './selector';
import { VIEW } from './views';

export const Dropdown = () => {
  const myRef = React.createRef();

  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState('1');

  return (
    <div
      className={
        'my-10 w-[1000px] h-20 flex flex-col justify-center items-center'
      }
    >
      <div className={'w-[1000px] px-5 mt-auto'}>
        <CountrySelector
          id={'countries'}
          ref={myRef}
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          onChange={(val) => setCountry(val)}
          selectedValue={VIEW.find((option) => option.value === country)}
        />
      </div>
    </div>
  );
};
