"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Tech Enthusiast",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80",
      rating: 5,
      text: "Amazing quality products! The laptop I purchased exceeded all my expectations. Fast shipping and excellent customer service.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Developer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
      rating: 5,
      text: "Best tech store I've ever used. The product descriptions are accurate and the prices are competitive. Highly recommend!",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Content Creator",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80",
      rating: 5,
      text: "Fantastic experience from start to finish. The headphones I bought have incredible sound quality. Will definitely shop here again!",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Photographer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80",
      rating: 5,
      text: "The camera equipment is top-notch. Great selection and the support team helped me choose the perfect gear for my needs.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Do not just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                <Quote className="w-5 h-5" />
              </div>

              {/* Profile */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-gray-200 group-hover:ring-blue-600 transition-all">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed text-sm">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
