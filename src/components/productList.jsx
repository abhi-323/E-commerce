import React from "react";
import { useRecoilState } from "recoil";
import { selectedProductAtom } from "../recoil/recoil";
import { useEffect } from "react";
import ProductView from "./productView";
import { Navigate, useNavigate } from "react-router-dom";

export const Products = (props) => {
  const [selectedProduct, setSelectedProduct] =
    useRecoilState(selectedProductAtom);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const manageProduct = (p) => {
  //     setSelectedProduct(p);
  //   };
  // }, []);
  console.log(selectedProduct);

  return (
    <div
      className={`border-2 hover:drop-shadow-2xl  
    border-[#E54065] bg-white h-[430px] w-[250px] m-8 mt-1 rounded-lg overflow-hidden`}
      onClick={() => {
        setSelectedProduct(props.products);
        navigate("/productview");
        // <Navigate to="/productview" replace={true} />;
      }}
    >
      <div className=" m-4 justify-center flex">
        <img src={props.products.images[0].src} className=" h-56 w-56" />
      </div>

      <div className="flex-col align-middle text-sm m-2 overflow-hidden">
        <div className=" flow-root">
          <h2 className=" float-left font-extrabold text-2xl text-black ">
            <b>₹ {props.products.price}</b>
          </h2>
          <h2 className=" font-bold float-right mr-2 justify-end">
            {props.products.rating.toFixed(1)} ({props.products.ratingCount})
          </h2>
        </div>
        <div className="grow h-20">
          <h2>
            <b>{props.products.productName}</b>
          </h2>
          <h2>
            Category: <b>{props.products.category}</b>
          </h2>
          {/* <h2 className=" mt-1 mb-1 overflow-hidden truncate">
          {props.description}
        </h2> */}
        </div>
        <div>
          <button className="  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-1 w-[100%] rounded-full">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
