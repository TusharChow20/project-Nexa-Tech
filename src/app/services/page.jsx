"use client";
import React from "react";
import {
  Truck,
  Shield,
  Headphones,
  RefreshCw,
  CreditCard,
  Award,
  Clock,
  Package,
  CheckCircle2,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: <Truck className="w-10 h-10" />,
      title: "Fast & Free Delivery",
      description:
        "Get your tech products delivered to your doorstep quickly and securely.",
      features: [
        "Free shipping on orders over $50",
        "Express delivery available",
        "Real-time tracking",
        "Secure packaging",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Extended Warranty",
      description:
        "Protect your investment with our comprehensive warranty plans.",
      features: [
        "1-3 year warranty options",
        "Accidental damage protection",
        "Easy claim process",
        "Quick replacements",
      ],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Headphones className="w-10 h-10" />,
      title: "24/7 Customer Support",
      description: "Expert assistance whenever you need it, day or night.",
      features: [
        "Phone, chat & email support",
        "Technical assistance",
        "Product guidance",
        "Troubleshooting help",
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <RefreshCw className="w-10 h-10" />,
      title: "Easy Returns & Exchange",
      description: "Hassle-free returns within 30 days of purchase.",
      features: [
        "30-day return policy",
        "Free return shipping",
        "Quick refunds",
        "No questions asked",
      ],
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <CreditCard className="w-10 h-10" />,
      title: "Flexible Payment Options",
      description: "Multiple payment methods for your convenience.",
      features: [
        "Credit/Debit cards",
        "Digital wallets",
        "EMI options available",
        "Secure transactions",
      ],
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Authentic Products",
      description: "100% genuine products from authorized distributors.",
      features: [
        "Official warranty",
        "Verified sellers",
        "Quality assured",
        "Brand authorized",
      ],
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      text: "Same-day dispatch on most orders",
    },
    {
      icon: <Package className="w-6 h-6" />,
      text: "Secure and tamper-proof packaging",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      text: "Quality check before dispatch",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Services
            </span>
          </h1>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            We provide exceptional services to ensure the best shopping
            experience for all your tech needs
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300"
            >
              <div className="card-body">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-4 shadow-lg`}
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h2 className="card-title text-xl mb-2">{service.title}</h2>

                {/* Description */}
                <p className="text-sm opacity-70 mb-4">{service.description}</p>

                {/* Features List */}
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Benefits */}
      <div className="bg-base-200 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Shop With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-base-100 rounded-lg shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {benefit.icon}
                </div>
                <p className="font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="card bg-gradient-to-br from-primary to-secondary text-white shadow-xl">
          <div className="card-body text-center py-12">
            <h2 className="card-title text-3xl md:text-4xl font-bold justify-center mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Our expert team is ready to assist you in finding the perfect tech
              products for your needs
            </p>
            <div className="card-actions justify-center">
              <a
                href="/contact"
                className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-0"
              >
                Contact Support
              </a>
              <a
                href="/products"
                className="btn btn-lg btn-outline text-white border-white hover:bg-white/20"
              >
                Browse Products
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Service Hours */}
      <div className="bg-base-200 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-4">Customer Support Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-base-100 rounded-lg">
              <p className="font-semibold mb-1">Phone Support</p>
              <p className="opacity-70">Mon - Fri: 9:00 AM - 8:00 PM</p>
              <p className="opacity-70">Sat - Sun: 10:00 AM - 6:00 PM</p>
            </div>
            <div className="p-4 bg-base-100 rounded-lg">
              <p className="font-semibold mb-1">Live Chat & Email</p>
              <p className="opacity-70">Available 24/7</p>
              <p className="opacity-70">Response within 1 hour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
