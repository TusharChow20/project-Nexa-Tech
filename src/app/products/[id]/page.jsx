"use client";

import React, { useEffect, useState, use, useMemo } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Tag,
  DollarSign,
  Pencil,
  Trash2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ProductDetailsPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = use(params);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Check if current user owns the product
  const isOwner = useMemo(() => {
    return (
      product &&
      session?.user?.email &&
      session?.user?.email === product.userEmail
    );
  }, [product, session?.user?.email]);

  const handleUpdateProduct = () => {
    router.push(`/update-product/${product._id}`);
  };

  const handleDeleteProduct = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      return;
    }

    if (!session?.user?.email) {
      toast.error("You must be logged in to delete products");
      return;
    }

    setDeleting(true);
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${product._id}`, {
        data: { userEmail: session.user.email },
      });
      toast.success("Product deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      // Delay navigation to show the toast
      setTimeout(() => {
        router.push("/products");
      }, 2000);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(
        error.response?.data?.error ||
          "Failed to delete product. Please try again.",
        {
          position: "top-right",
          autoClose: 4000,
        }
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <button
            onClick={() => router.push("/products")}
            className="btn btn-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-base-100">
      <ToastContainer />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => router.push("/products")}
          className="btn btn-ghost gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Large Image */}
          <div className="relative w-full h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {product.title}
                </h1>
                {isOwner && (
                  <div className="badge badge-success gap-1">
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
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span
                  className={`badge ${getPriorityColor(
                    product.meta.priority
                  )} badge-lg capitalize`}
                >
                  {product.meta.priority} Priority
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="card bg-gradient-to-br from-primary to-secondary text-white shadow-xl">
              <div className="card-body py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-6 h-6" />
                    <span className="text-lg font-medium">Price</span>
                  </div>
                  <span className="text-4xl font-bold">${product.price}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-3">Description</h2>
                <p className="text-base leading-relaxed opacity-80">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Meta Information */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  Product Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm opacity-60">Listed Date</p>
                      <p className="font-semibold">{product.meta.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                    <Tag className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm opacity-60">Product ID</p>
                      <p className="font-semibold font-mono text-xs">
                        {product._id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {isOwner ? (
                <>
                  <button
                    onClick={handleUpdateProduct}
                    className="btn btn-primary btn-lg flex-1 gap-2"
                  >
                    <Pencil className="w-5 h-5" />
                    Update Product
                  </button>
                  <button
                    onClick={handleDeleteProduct}
                    disabled={deleting}
                    className="btn btn-error btn-lg flex-1 gap-2"
                  >
                    {deleting ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-5 h-5" />
                        Delete Product
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-primary btn-lg flex-1">
                    Add to Cart
                  </button>
                  <button className="btn btn-outline btn-lg flex-1">
                    Buy Now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
