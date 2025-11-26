"use client";

import React, { useState } from "react";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (!session) {
    redirect("/login");
  }
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
    priority: "medium",
    date: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (
      !formData.title ||
      !formData.image ||
      !formData.description ||
      !formData.price
    ) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (!session?.user?.email) {
      setError("User email not found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const productData = {
        title: formData.title,
        image: formData.image,
        description: formData.description,
        price: parseFloat(formData.price),
        userEmail: session.user.email, // Add user email
        meta: {
          date: formData.date,
          priority: formData.priority,
        },
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/products`,
        productData
      );

      setSuccess("Product added successfully!");

      // Reset form
      setFormData({
        title: "",
        image: "",
        description: "",
        price: "",
        priority: "medium",
        date: new Date().toISOString().split("T")[0],
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/products");
      }, 2000);
    } catch (err) {
      console.error("Error adding product:", err);
      setError(
        err.response?.data?.error || "Failed to add product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Add New Product
        </h1>
        <p className="text-gray-600">
          Fill in the details below to add a new product to the catalog
        </p>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="alert alert-error mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{success}</span>
        </div>
      )}

      {/* Form */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* User Email - Read Only */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">
                  Posted By (Your Email)
                </span>
              </label>
              <input
                type="email"
                value={session?.user?.email || ""}
                className="input input-bordered w-full bg-gray-100 text-black cursor-not-allowed"
                disabled
                readOnly
              />
              <label className="label">
                <span className="label-text-alt text-info text-wrap">
                  This product will be associated with your account
                </span>
              </label>
            </div>

            {/* Title */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">
                  Product Title <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Mechanical Gaming Keyboard MK-Pro"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Image URL */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Image URL</span>
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="input input-bordered w-full"
              />
              {formData.image && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">
                  Description <span className="text-error">*</span>
                </span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter detailed product description..."
                className="textarea textarea-bordered h-32"
                required
              />
            </div>

            {/* Price and Priority Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Price ($) <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="129.99"
                  step="0.01"
                  min="0"
                  className="input input-bordered w-full"
                  required
                />
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
            </div>

            {/* Date */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold">Date</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Adding Product...
                  </>
                ) : (
                  "Add Product"
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push("/products")}
                className="btn btn-outline"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
