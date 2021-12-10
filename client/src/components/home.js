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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum officia
        saepe consequatur! Necessitatibus eligendi magni totam veniam
        voluptatem, beatae, quaerat est aperiam nihil magnam repudiandae enim
        aut esse dolorum ut ad. Doloribus natus, consectetur beatae vero dolores
        error nesciunt repudiandae recusandae quos necessitatibus placeat,
        aperiam quam sunt! Ducimus autem perferendis beatae dignissimos nostrum
        modi, distinctio a eveniet quos magni atque aspernatur veniam voluptatum
        eligendi quis dolore ad officiis similique corporis deleniti. Quos
        voluptate sapiente vel error, natus laborum rem recusandae architecto in
        quia quisquam obcaecati corrupti fuga odio repellat at ut ratione eius
        omnis repellendus ullam minus pariatur maiores quibusdam. Voluptas,
        similique voluptates? Quasi maiores dolorem laborum libero! Eligendi
        quia pariatur exercitationem, laudantium sequi numquam, deserunt a optio
        ipsum hic facere, provident officia eos corporis itaque expedita. Quos
        dignissimos quod eos autem doloremque commodi animi aspernatur, est
        architecto blanditiis fuga distinctio suscipit, alias libero placeat
        incidunt neque soluta, maxime sit! Nostrum voluptates fugiat natus
        consectetur sint perspiciatis omnis dolor iste, ipsam ad officia,
        commodi explicabo aliquam velit pariatur officiis doloribus adipisci
        quas hic eligendi modi atque sapiente alias. Ex deserunt fugit sapiente
        officiis porro reprehenderit sequi repellendus numquam? Doloribus libero
        maxime quo. Dolores nihil, culpa et impedit, at dicta doloremque odit
        itaque, animi labore velit neque totam nostrum quaerat tempore quasi
        vero inventore laudantium omnis recusandae nisi minus non. Quod
        temporibus eveniet magnam! Incidunt eveniet a magni quae odio tempora ut
        rerum tenetur nemo distinctio nihil, ullam doloremque nesciunt cumque
        facilis esse nostrum fugiat reprehenderit tempore, quia earum ipsam.
        Reiciendis officia animi, commodi et mollitia ut reprehenderit nostrum
        maxime molestias culpa nesciunt ducimus, neque quidem ea officiis fuga
        nemo eos repudiandae cum architecto. Facere, molestias corrupti libero
        optio magni adipisci? Nihil id consequuntur aperiam itaque earum soluta
        voluptate, numquam quibusdam eos placeat quisquam libero adipisci
        eligendi excepturi sint hic inventore minus, quas possimus perferendis
        repudiandae. Eligendi deserunt praesentium dolores magni earum, ab
        voluptatum dolore odio dignissimos laboriosam eos quis vel! Commodi
        vitae cum est quisquam voluptatibus, architecto fuga unde laboriosam
        adipisci repudiandae. Porro aperiam eveniet maiores perferendis officia
        illum sunt obcaecati repudiandae ad eos suscipit, vel incidunt dicta
        vitae corporis. Eius vero recusandae, optio dolore distinctio ducimus
        alias, tempora quis libero laboriosam itaque, praesentium voluptates
        adipisci sunt magni necessitatibus earum a sint numquam? Sed animi
        aperiam labore velit exercitationem veritatis laboriosam cupiditate odio
        error molestiae dolor, veniam culpa minima ipsum, doloremque qui dolore
        magnam blanditiis? Eligendi distinctio minus porro, ex voluptate
        incidunt quibusdam quae suscipit provident nihil, dolorum eos dolorem
        possimus accusamus. Impedit alias similique accusamus? Libero quisquam
        laborum qui modi necessitatibus dolor quia quo aut iure dicta corrupti
        possimus facere sed quasi, error repellat aperiam eum neque incidunt at
        fugiat autem animi ipsa! Ea, doloribus eius hic nam, quod placeat amet,
        voluptatibus illum temporibus dicta consequatur praesentium similique
        atque eaque! Hic perspiciatis alias necessitatibus in sint dolores sunt
        totam ipsa laudantium non! Quas libero voluptatem, alias unde at est
        commodi sunt reiciendis consequuntur aperiam molestiae tempora illum!
        Fuga, cum odit odio iste dicta saepe ad enim dolore eveniet minus.
      </p>
    </motion.div>
  );
};

export default Home;
