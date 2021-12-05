import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="navbar flex flex-col place-items-center text-primary mt-20 mb-12">
        <h1 className="text-center font-PT text-7xl font-medium my-4">
          Data Verse
        </h1>
        <h2 className="navbar-container font-Josefin text-base tracking-widest">
          Basis Data Sumber Daya Alam di Indonesia
        </h2>

        <div className="navbar-container relative w-full mt-20 flex flex-row justify-center gap-8 font-Josefin text-base text-secondary tracking-widest ">
          <Link
            to="/"
            className="hover:text-primary hover:border-b-primary border-transparent border-b-[1px] border-dotted h-5"
          >
            HOME
          </Link>
          <span> / </span>
          <Link
            to="/crud"
            className="hover:text-primary hover:border-b-primary border-transparent border-b-[1px] border-dotted h-5"
          >
            CRUD
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
