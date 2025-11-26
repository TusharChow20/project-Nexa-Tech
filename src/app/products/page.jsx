"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
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

  const handleViewDetails = (productId) => {
    router.push(`/products/${productId}`);
  };

  const handleEditProduct = (productId) => {
    router.push(`/update-product/${productId}`);
  };

  // Check if current user owns the product
  const isOwner = (productEmail) => {
    return session?.user?.email === productEmail;
  };

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Tech Products
        </h1>
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
          className="input input-bordered w-full md:w-1/2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full md:w-1/4"
        >
          <option value="">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      {loading && (
        <div className="text-center py-20">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">No products found.</p>
        </div>
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="card bg-base-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300"
            >
              <figure className="relative w-full h-48">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-lg">{product.title}</h2>
                <p className="text-sm opacity-70">
                  {product.description.split(".").slice(0, 2).join(".") + "."}
                </p>

                <div className="flex items-center gap-2 my-2">
                  <span className="badge badge-sm capitalize">
                    {product.meta.priority}
                  </span>
                  <span className="text-xs opacity-60">
                    {product.meta.date}
                  </span>
                </div>
                {isOwner(product.userEmail) && (
                  <div className="badge badge-success badge-sm gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Your Product
                  </div>
                )}

                <div className="card-actions flex-col items-stretch mt-2 gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => handleViewDetails(product._id)}
                      className="btn btn-primary btn-sm"
                    >
                      Details
                    </button>
                  </div>
                  {isOwner(product.userEmail) && (
                    <button
                      onClick={() => handleEditProduct(product._id)}
                      className="btn btn-outline btn-sm w-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit Product
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
