import React from "react";
import { useRecoilState } from "recoil";
import { selectedProductAtom } from "../recoil/recoil";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductView = () => {
  const [selectedProduct] = useRecoilState(selectedProductAtom);
  console.log(selectedProduct);

  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(0);

  const refs = selectedProduct.images.reduce((acc, val, i) => {
    acc[i] = React.createRef();
    return acc;
  }, {});

  const scrollToImage = (i) => {
    // First let's set the index of the image we want to see next
    setCurrentImage(i);

    if (refs[i] && refs[i].current) {
      refs[i].current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const totalImages = selectedProduct.images.length;

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  const arrowStyle =
    "absolute text-white text-2xl z-10 bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center";

  const sliderControl = (isLeft) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? " -left-8" : "-right-8"}`}
      style={{ top: "40%" }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? "left" : "right"}`}>
        {isLeft ? "◀" : "▶"}
      </span>
    </button>
  );

  return (
    <div>
      <a href="/">
        <button
          className="border-2 border-black w-20 rounded-lg ml-8 mt-8 font-bold px-1"
          // onClick={navigate("/")}
        >
          ◀ Back
        </button>
      </a>
      <div className=" flex items-center justify-center h-screen ">
        <div
          className={`border-2 hover:drop-shadow-2xl  
        border-[#E54065] bg-white h-[530px] w-[450px] m-8 mt-1 rounded-lg overflow-hidden`}
          // onClick={() => {
          //   setSelectedProduct(props.products);
          //   return <ProductView />;
          // }}
        >
          <div className=" m-4 justify-center flex">
            {/* <img src={selectedProduct.images[0].src} className=" h-72 w-72" /> */}
            <div className="p-12 flex justify-center items-center">
              <div className="relative ">
                <div className="carousel">
                  {sliderControl(true)}
                  <div className=" flex-shrink-0 ">
                    <img
                      src={selectedProduct.images[currentImage].src}
                      className="h-80 w-80"
                    />
                  </div>

                  {sliderControl()}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-col align-middle text-sm m-2 overflow-hidden">
            <div className=" flow-root">
              <h2 className=" float-left font-extrabold text-2xl text-black ">
                <b>₹ {selectedProduct.price}</b>
              </h2>
              <h2 className=" font-bold float-right mr-2 justify-end">
                {selectedProduct.rating.toFixed(1)} (
                {selectedProduct.ratingCount})
              </h2>
            </div>
            <div className="grow h-20">
              <h2>
                <b>{selectedProduct.productName}</b>
              </h2>
              <h2>
                Category: <b>{selectedProduct.category}</b>
              </h2>
              {/* <h2 className=" mt-1 mb-1 overflow-hidden truncate">
          {props.description}
        </h2> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
