"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Zap, Percent } from "lucide-react";
import Link from "next/link";

const PromoBanner = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(24, 0, 0, 0);

    const difference = endOfDay - now;

    if (difference > 0) {
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold animate-offerGlow">
              <Zap className="w-4 h-4" />
              Limited Time Offer
            </div>
            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Summer Sale
              <span className="block text-yellow-300">Up to 50% Off</span>
            </h2>
            {/* Description */}
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-xl">
              Upgrade your tech game with massive discounts on laptops,
              headphones, smartwatches, and more. Do not miss out on these
              incredible deals!
            </p>
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Extra 10% Off</h4>
                  <p className="text-sm text-white/80">For new customers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Flash Deals</h4>
                  <p className="text-sm text-white/80">Hourly special offers</p>
                </div>
              </div>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={"/products"}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all hover:scale-105 focus:ring-2 focus:ring-white focus:outline-none"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={"/services"}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold border-2 border-white/50 hover:bg-white/30 transition-all focus:ring-2 focus:ring-white focus:outline-none"
              >
                Learn More
              </Link>
            </div>
            {/* Countdown or Timer */}
            <div className="flex items-center gap-4 pt-6">
              <div className="text-center bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl min-w-[70px]">
                <div className="text-3xl font-bold tabular-nums">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-xs text-white/70 mt-1">HOURS</div>
              </div>
              <div className="text-2xl font-bold">:</div>
              <div className="text-center bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl min-w-[70px]">
                <div className="text-3xl font-bold tabular-nums">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-xs text-white/70 mt-1">MINS</div>
              </div>
              <div className="text-2xl font-bold">:</div>
              <div className="text-center bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl min-w-[70px]">
                <div className="text-3xl font-bold tabular-nums">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-xs text-white/70 mt-1">SECS</div>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
              alt="Tech Products Sale"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-6 right-6 bg-yellow-400 text-gray-900 px-6 py-3 rounded-2xl font-bold text-xl shadow-2xl rotate-3 hover:rotate-0 transition-transform">
              10% OFF
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
