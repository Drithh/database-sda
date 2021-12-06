import { motion } from 'framer-motion';
import { pageTransition, variants } from './motion';
import BasicTable from './table/basictable';

const Crud = () => {
  return (
    <motion.div
      initial="init"
      animate="in"
      exit="out"
      variants={variants}
      transition={pageTransition}
    >
      <h1>CRUD</h1>
      <BasicTable />
    </motion.div>
  );
};

export default Crud;
