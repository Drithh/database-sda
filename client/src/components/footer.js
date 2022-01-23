import React from 'react';

const Footer = () => {
  return (
    <div className="footer h-28 relative mt-4  w-screen border border-solid border-secondary border-opacity-50 flex place-items-center place-content-center">
      <div className="flex flex-col">
        <a
          target="_blank"
          href="https://github.com/Drithh/database-sda"
          rel="noreferrer"
          className="font-PT text-xl text-center font-medium mb-2 "
        >
          <div className="hover:underline">Data Verse</div>
        </a>
        <p className="navbar-container font-Josefin text-xs tracking-widest">
          Basis Data Sumber Daya Alam di Indonesia
        </p>
      </div>
    </div>
  );
};
export default Footer;
