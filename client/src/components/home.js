import { motion } from 'framer-motion';
import { pageTransition, variants } from './motion';
import React from 'react';
import { D3BarGraph } from './Chart/BarGraphj';
import { SunBurstGraph } from './Chart/Sunburst';
import { Dropdown } from './selector/dropdown';
import { LineGraph } from './Chart/LineGraph';

const Home = () => {
  return (
    <motion.div
      initial="init"
      animate="in"
      exit="out"
      variants={variants}
      transition={pageTransition}
    >
      <div className="w-[1024px] m-auto mb-60">
        <div className="BarGraph my-2 border-b border-t border-solid border-secondary border-opacity-50">
          <h2 className="mt-10 font-Source text-center font-medium text-2xl text-primary tracking-widest">
            TOP 6 POTENSI MINERAL INDONESIA
          </h2>
          <D3BarGraph />
        </div>
        <div className="LineGraph my-2 border-b border-t border-solid border-secondary border-opacity-50">
          <h2 className="mt-10 font-Source text-center font-medium text-2xl text-primary tracking-widest">
            HASIL SUMBER DAYA ALAM
          </h2>
          <LineGraph />
        </div>
        <div className="SunBurst my-2 border-b border-t border-solid border-secondary border-opacity-50">
          <h2 className="mt-10 font-Source text-center font-medium text-2xl text-primary tracking-widest">
            GDP 5 TAHUN TERAKHIR
          </h2>
          <SunBurstGraph />
        </div>
        <div className=" my-2 border-b border-t border-solid border-secondary border-opacity-50">
          <h2 className="mt-10 font-Source text-center font-medium text-2xl text-primary tracking-widest">
            QUERY QUERY QUERY
          </h2>
          <Dropdown />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
