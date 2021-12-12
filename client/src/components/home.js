import { motion } from 'framer-motion';
import { pageTransition, variants } from './motion';
import React from 'react';
import { D3BarGraph } from './BarChart';

const Home = () => {
  return (
    <motion.div
      initial="init"
      animate="in"
      exit="out"
      variants={variants}
      transition={pageTransition}
    >
      <div className="w-[1024px] m-auto">
        <D3BarGraph />
      </div>
    </motion.div>
  );
};

export default Home;
