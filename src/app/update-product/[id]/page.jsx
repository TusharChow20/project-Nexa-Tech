"use client";

import React, { useEffect, useState, use } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function UpdateProductPage({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = use(params);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    priority: "medium",
    date: "",
  });

  useEffect(() => {
    // Redirect if not authenticated
    if (status === "unauthenticated") {
      toast.error("Please login to update products");
      router.push("/login");
      return;
    }

    const fetchProduct = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await axios.get(`${API_BASE_URL}/api/products/${id}`);
        const product = res.data;

        if (!product) {
          toast.error("Product not found!");
          router.push("/products");
          return;
        }

        // Check if user owns this product
        if (session?.user?.email !== product.userEmail) {
          toast.error("You don't have permission to edit this product!");
          router.push("/products");
          return;
        }

        // Pre-fill form with existing data
        setFormData({
          title: product.title || "",
          description: product.description || "",
          price: product.price || "",
          image: product.image || "",
          priority: product.meta?.priority || "medium",
          date: product.meta?.date || "",
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product data");
        router.push("/products");
      } finally {
        setLoading(false);
      }
    };

    if (id && session?.user?.email) {
      fetchProduct();
    }
  }, [id, session, status, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.image
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!session?.user?.email) {
      toast.error("You must be logged in to update products");
      return;
    }

    setSubmitting(true);

    try {
      const updateData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
        userEmail: session.user.email, // Required for backend authorization
        meta: {
          priority: formData.priority,
          date: formData.date || new Date().toLocaleDateString(),
        },
      };

      await axios.put(`${API_BASE_URL}/api/products/${id}`, updateData);

      toast.success("Product updated successfully! Redirecting...");

      setTimeout(() => {
        router.push(`/products/${id}`);
      }, 1500);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(
        error.response?.data?.error ||
          "Failed to update product. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push(`/products/${id}`)}
            className="btn btn-ghost gap-2 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Product
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Update Product
          </h1>
          <p className="text-gray-600 mt-2">
            Edit your product information below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Product Title *
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter product title"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Description *
                  </span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  className="textarea textarea-bordered h-32"
                  required
                />
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Price ($) *</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Image URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Image URL *</span>
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                  required
                />
                {formData.image && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Priority */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Priority</span>
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              {/* Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Listed Date</span>
                </label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="MM/DD/YYYY"
                  className="input input-bordered w-full"
                />
                <label className="label">
                  <span className="label-text-alt text-gray-500">
                    Leave empty to use current date
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push(`/products/${id}`)}
              className="btn btn-outline flex-1"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1 gap-2"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
