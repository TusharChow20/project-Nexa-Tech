"use client";

import React from "react";
import { Truck, ShieldCheck, Headphones, CreditCard } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: Truck,
      title: "Free Shipping",
      description:
        "Free delivery on orders over $50. Fast and reliable shipping worldwide.",
      color: "bg-blue-100 text-blue-600",
      hoverColor: "group-hover:bg-blue-600",
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "Secure Payment",
      description:
        "100% secure payment with SSL encryption. Your data is protected.",
      color: "bg-green-100 text-green-600",
      hoverColor: "group-hover:bg-green-600",
    },
    {
      id: 3,
      icon: Headphones,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support. We're here to help anytime.",
      color: "bg-purple-100 text-purple-600",
      hoverColor: "group-hover:bg-purple-600",
    },
    {
      id: 4,
      icon: CreditCard,
      title: "Easy Returns",
      description:
        "30-day money back guarantee. No questions asked return policy.",
      color: "bg-orange-100 text-orange-600",
      hoverColor: "group-hover:bg-orange-600",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience exceptional service and quality with every purchase
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 focus-within:ring-2 focus-within:ring-blue-500 cursor-pointer"
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 ${feature.color} ${feature.hoverColor} rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:text-white`}
                >
                  <Icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
