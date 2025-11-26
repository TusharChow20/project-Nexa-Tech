"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import { ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto lg:h-[calc(100vh-6rem)] lg:flex lg:items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content - Will be on bottom on mobile, left on desktop */}
          <div className="order-2 lg:order-1 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              Discover the Latest{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Tech Innovations
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Shop premium electronics and gadgets at unbeatable prices.
              Experience quality, innovation, and exceptional service.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={"/products"}
                className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={"/services"}
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                View Services
              </Link>
            </div>
            <div className="flex flex-wrap gap-8 pt-8">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                  500+
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  Products
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                  50K+
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  Customers
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                  4.9/5
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Rating</div>
              </div>
            </div>
          </div>

          {/* Swiper Slider - Will be on top on mobile, right on desktop */}
          <div className="order-1 lg:order-2">
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              speed={800}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl"
            >
              <SwiperSlide className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=1200&h=800&fit=crop&q=80"
                  alt="Laptop"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=800&fit=crop&q=80"
                  alt="Headphones"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=800&fit=crop&q=80"
                  alt="Watch"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=800&fit=crop&q=80"
                  alt="Phone"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&h=800&fit=crop&q=80"
                  alt="Camera"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=800&fit=crop&q=80"
                  alt="Tech"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
