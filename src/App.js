import React from "react";
import { useEffect, useState } from "react";
import { Products } from "./components/productList";
import NavBar from "./components/navbar";
import FilterCategory from "./components/filter";
import { logDOM } from "@testing-library/react";
import Checkbox from "./components/checkbox";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState("");

  // Gender push in array
  var genderArr = [];
  products.forEach((elem) => {
    genderArr.push(elem.gender);
  });

  // Gender unique push
  genderArr = new Set(genderArr);
  var genFinal = [];
  for (let item of genderArr) {
    genFinal.push(item);
    genFinal.sort();
  }

  // Category push in array
  var catArr = [];
  products.forEach((elem) => {
    catArr.push(elem.category);
  });

  // Category unique push
  catArr = new Set(catArr);
  var catFinal = [];
  for (let item of catArr) {
    catFinal.push(item);
    catFinal.sort();
  }

  // Brand push in array
  var brandArr = [];
  products.forEach((elem) => {
    brandArr.push(elem.brand);
  });

  // Brand unique push
  brandArr = new Set(brandArr);
  var brandFinal = [];
  for (let item of brandArr) {
    brandFinal.push(item);
    brandFinal.sort();
  }

  useEffect(() => {
    fetch("https://run.mocky.io/v3/bf175661-5e9f-4112-8580-d587759ff72e")
      .then((res) => res.json())
      .then((json) => setProducts(json.products));
  }, []);
  // console.log(products);

  const genderFilter = (event) => {
    setSelectedGender(event.target.value);
  };

  const brandFilter = (event) => {
    if (event.target.checked) {
      setSelectedBrand([...selectedBrand, event.target.value]);
    } else {
      setSelectedBrand(
        selectedBrand.filter((elem) => elem !== event.target.value)
      );
    }
  };

  const catFilter = (event) => {
    if (event.target.checked) {
      setSelectedCategory([...selectedCategory, event.target.value]);
    } else {
      setSelectedCategory(
        selectedCategory.filter((elem) => elem !== event.target.value)
      );
    }
  };

  const searchFilter = (event) => {
    setSelectedSearch(event.target.value);
  };

  // Filtered Data Logic
  const filteredData = () => {
    if (
      selectedGender.length === 0 &&
      selectedBrand.length === 0 &&
      selectedCategory.length === 0 &&
      selectedSearch === ""
    ) {
      return products;
    } else if (selectedGender.length !== 0) {
      if (
        selectedGender.length !== 0 &&
        selectedBrand.length !== 0 &&
        selectedCategory.length !== 0
      ) {
        return products
          .filter((product) => selectedGender.includes(product.gender))
          .filter((product) => selectedBrand.includes(product.brand))
          .filter((product) => selectedCategory.includes(product.category));
      } else if (selectedGender.length !== 0 && selectedBrand.length !== 0) {
        return products
          .filter((product) => selectedGender.includes(product.gender))
          .filter((product) => selectedBrand.includes(product.brand));
      } else if (selectedCategory.length !== 0 && selectedGender.length !== 0) {
        return products
          .filter((product) => selectedGender.includes(product.gender))
          .filter((product) => selectedCategory.includes(product.category));
      }
      return products.filter((product) =>
        selectedGender.includes(product.gender)
      );
    } else if (selectedBrand.length !== 0) {
      if (selectedBrand.length !== 0 && selectedCategory.length !== 0) {
        return products
          .filter((product) => selectedBrand.includes(product.brand))
          .filter((product) => selectedCategory.includes(product.category));
      }
      return products.filter((product) =>
        selectedBrand.includes(product.brand)
      );
    } else if (selectedCategory.length !== 0) {
      return products.filter((product) =>
        selectedCategory.includes(product.category)
      );
    } else if (selectedSearch !== "") {
      return products.filter((product) =>
        product.product.toLowerCase().includes(selectedSearch.toLowerCase())
      );
    }
  };

  return (
    <>
      <NavBar onChange={searchFilter} />
      <main className="flex container bg-[#F4F5F9] text-[#636363]">
        <div className="text-black w-[20%] border-black border-2 ml-8 mt-8 pt-8 pl-8 bg-white ">
          <div>
            <div className=" mb-2 font-bold ">FILTER</div>
            {genFinal.map((p) => (
              <FilterCategory category={p} onClick={genderFilter} />
            ))}
          </div>
          <div>
            <div className="my-2 mt-4 font-bold">CATEGORIES</div>
            {catFinal.map((val) => {
              return <Checkbox value={val} label={val} onClick={catFilter} />;
            })}
          </div>
          <div>
            <div className="my-2 mt-4 font-bold">BRAND</div>
            {brandFinal.map((val) => {
              return <Checkbox value={val} label={val} onClick={brandFilter} />;
            })}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 m-8 w-[80%]">
          {filteredData().map((p) => (
            <Products key={p.id} products={p} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
