"use client";
import { MenuType } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// const getData = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Fetch Categories data failed :( !!!");
//   }

//   return res.json();
// };

const MenuPage = () => {
  // const menu: MenuType = await getData();
  const [menu, setMenu] = useState<MenuType>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Fetch Categories failed :( !!!");
      }

      const data = await res.json();
      setMenu(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] 2xl:h-[calc(100vh-5rem)] flex flex-col md:flex-row items-center">
      {menu?.map((category) => (
        <Link
          href={`/pages/menu/${category.slug}`}
          key={category.id}
          className="w-full h-1/3 bg-cover p-6 md:h-1/2"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-${category.color} w-1/2`}>
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-sm my-8">{category.desc}</p>
            <button
              className={`py-2 px-4 rounded-md hidden 2xl:block bg-black text-white`}
            >
              Explore
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
