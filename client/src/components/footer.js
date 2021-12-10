import React from 'react';

const Footer = () => {
  return (
    <div className="footer my-10 absolute bottom-0 w-full">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <a
            target="_blank"
            href="https://github.com/Drithh/database-sda"
            rel="noreferrer"
            className="font-PT text-xl text-center font-medium my-2 "
          >
            <div className="hover:underline">Data Verse</div>
          </a>
          <p className="navbar-container font-Josefin text-xs tracking-widest">
            Basis Data Sumber Daya Alam di Indonesia
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
