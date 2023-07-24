import React from "react";
import { useEffect, useState } from "react";

const NavBar = (props) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategory(json));
  }, []);

  return (
    <nav className="bg-[#F4F5F9] border-gray-200 px-2 sm:px-4 py-2.5 ">
      <div className="pl-14 pt-4 container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex items-center">
          <span className=" pl-4 pr-4 self-center text-xl font-semibold whitespace-nowrap">
            E-KART
          </span>
          <span className=" pl-4 pr-4 self-center text-xl font-semibold whitespace-nowrap">
            HOME
          </span>
          {/* {category.map((c) => {
            <button
              className={`pl-4 pr-4 hover:rounded-full hover:bg-[#CFD2DC] text-justify text-xl `}
            >
              {c}
            </button>;
          })} */}
          <div className="flex pl-72 ">
            <input
              className=" float-right w-[400px] rounded-xl text-center p-0.5 border-2 border-black"
              placeholder="Search"
              onChange={props.onChange}
            ></input>
          </div>
        </div>
        <div>
          <img className=" h-12" src={require("../shopping-cart.png")} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
