import { useState } from "react";

import { useContext } from "react";
import { DataContext } from "../../context/GlobalData";
import Blogs from "./Blogs";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const { gdata } = useContext(DataContext);

  const selectCategory = (e) => {
    setSelectedCategory(e.currentTarget.innerText);
  };

  return (
    <>
      <div className="w-full grid grid-cols-12">
        <div className="col-span-12 md:col-span-2 p-10 bg-primaryMain">
          <ul className="flex flex-row md:flex-col gap-10 flex-wrap justify-center md:justify-start">
            {gdata.categories.map((cat, idx) => {
              return (
                <li
                  key={idx}
                  className="text-secondaryMain font-bold hover:scale-105 transition cursor-pointer drop-shadow-xl"
                  onClick={selectCategory}
                >
                  {cat.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-span-12 min-h-screen md:col-span-10 flex flex-col items-center bg-surface">
          <p className="text-3xl font-bold my-10 text-primaryMain">
            {selectedCategory}
          </p>
          <div className="flex justify-center flex-wrap mt-5 mb-24 gap-5">
            <Blogs selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
