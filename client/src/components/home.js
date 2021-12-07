import { motion } from 'framer-motion';
import { pageTransition, variants } from './motion';

const Home = () => {
  return (
    <motion.div
      initial="init"
      animate="in"
      exit="out"
      variants={variants}
      transition={pageTransition}
    >
      <h1>Home</h1>
      <p className="w-[1000px] m-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate modi
        placeat provident sed quasi pariatur, nostrum amet cumque incidunt,
        consectetur fuga. Iure numquam quidem obcaecati, dolor dolore provident
        commodi quos? Saepe debitis repudiandae officia dignissimos laudantium
        aspernatur quo maiores suscipit eum perspiciatis, tempore iste ipsa nemo
        unde molestiae itaque! Totam cum eaque fuga explicabo excepturi hic
        distinctio voluptatibus eius, vitae accusantium sint mollitia, aliquid
        similique doloremque illum voluptate repellendus, dolore doloribus
        laboriosam dolores nihil nobis perspiciatis. Ex, sint reiciendis velit
        quam asperiores perferendis nulla assumenda ratione quia optio explicabo
        modi nam facere voluptatibus vel adipisci ipsam. Deleniti eum blanditiis
        odio!
      </p>
    </motion.div>
  );
};

export default Home;
