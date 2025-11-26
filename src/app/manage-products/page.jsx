"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Eye, Trash2, Edit, Grid3x3, List, Search, Filter } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    redirect("/login");
  }
  useEffect(() => {
    fetchProducts();
  }, [session]);

  useEffect(() => {
    filterProducts();
  }, [products, search, priorityFilter]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products`);
      // Filter to show only current user's products
      const userProducts = res.data.filter(
        (product) => product.userEmail === session?.user?.email
      );
      setProducts(userProducts);
      setFilteredProducts(userProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Search filter
    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Priority filter
    if (priorityFilter) {
      filtered = filtered.filter((p) => p.meta.priority === priorityFilter);
    }

    setFilteredProducts(filtered);
  };

  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeleteLoading(productId);
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${productId}`, {
        data: { userEmail: session?.user?.email },
      });

      // Remove from state
      setProducts(products.filter((p) => p._id !== productId));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error.response?.data?.error || "Failed to delete product");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleView = (productId) => {
    router.push(`/products/${productId}`);
  };

  const handleEdit = (productId) => {
    router.push(`/update-product/${productId}`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "badge-error";
      case "medium":
        return "badge-warning";
      case "low":
        return "badge-success";
      default:
        return "badge-ghost";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600">Loading your products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Manage Products
        </h1>
        <p className="text-gray-600">
          View, edit, and delete your products. You have {products.length}{" "}
          product
          {products.length !== 1 ? "s" : ""}.
        </p>
      </div>

      {/* Filters and View Toggle */}
      <div className="card bg-base-100 shadow-lg mb-6">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>

            <div className="flex gap-2 items-center w-full md:w-auto">
              {/* Priority Filter */}
              <div className="relative flex-1 md:flex-initial">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="select select-bordered w-full pl-10"
                >
                  <option value="">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="join">
                <button
                  className={`btn join-item ${
                    viewMode === "table" ? "btn-active" : ""
                  }`}
                  onClick={() => setViewMode("table")}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  className={`btn join-item ${
                    viewMode === "grid" ? "btn-active" : ""
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p className="text-gray-600 mb-6">
              {search || priorityFilter
                ? "Try adjusting your filters"
                : "Start by adding your first product"}
            </p>
            {!search && !priorityFilter && (
              <button
                onClick={() => router.push("/add-product")}
                className="btn btn-primary mx-auto"
              >
                Add Product
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && filteredProducts.length > 0 && (
        <div className="card bg-base-100 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Priority</th>
                  <th>Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover">
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">{product.title}</div>
                      <div className="text-sm opacity-50 line-clamp-1">
                        {product.description}
                      </div>
                    </td>
                    <td className="font-semibold text-primary">
                      ${product.price}
                    </td>
                    <td>
                      <div
                        className={`badge ${getPriorityColor(
                          product.meta.priority
                        )} capitalize`}
                      >
                        {product.meta.priority}
                      </div>
                    </td>
                    <td className="text-sm opacity-70">{product.meta.date}</td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleView(product._id)}
                          className="btn btn-ghost btn-sm"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(product._id)}
                          className="btn btn-ghost btn-sm text-info"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="btn btn-ghost btn-sm text-error"
                          disabled={deleteLoading === product._id}
                          title="Delete Product"
                        >
                          {deleteLoading === product._id ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && filteredProducts.length > 0 && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
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
                <p className="text-sm opacity-70 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 my-2">
                  <div
                    className={`badge ${getPriorityColor(
                      product.meta.priority
                    )} capitalize`}
                  >
                    {product.meta.priority}
                  </div>
                  <span className="text-xs opacity-60">
                    {product.meta.date}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-primary">
                    ${product.price}
                  </span>
                </div>

                <div className="card-actions justify-end gap-2">
                  <button
                    onClick={() => handleView(product._id)}
                    className="btn btn-sm btn-ghost"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="btn btn-sm btn-info"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-sm btn-error"
                    disabled={deleteLoading === product._id}
                    title="Delete"
                  >
                    {deleteLoading === product._id ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
