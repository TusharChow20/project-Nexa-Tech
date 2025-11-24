"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/productData.json");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category ? p.meta.priority === category : true;
    return matchSearch && matchCategory;
  });

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Tech Products</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore our latest collection of tech gadgets, accessories, and
          premium devices.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      {loading && (
        <div className="text-center py-20 text-gray-600">
          Loading products...
        </div>
      )}

      {!loading && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-2xl shadow-sm overflow-hidden hover:shadow-xl hover:scale-105 transform transition-all duration-300 bg-white"
            >
              <div className="relative w-full h-48">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>

              <div className="p-4">
                <h2 className="font-semibold text-lg mb-1 text-black">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description.split(".").slice(0, 2).join(".") + "."}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-blue-600 text-lg">
                    ${product.price}
                  </span>
                  <button className="px-4 py-2 text-sm rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all">
                    Details
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Date: {product.meta.date}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  Priority: {product.meta.priority}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
