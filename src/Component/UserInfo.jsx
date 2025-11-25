"use client";
import React, { useState } from "react";
import { User, Mail, LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center text-center">
            {/* Profile Image */}
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-purple-200">
                <img
                  src={session?.user?.image}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>

            {/* User Info */}
            <div className="space-y-4 w-full">
              {/* Name */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
                <div className="flex items-center justify-center gap-3">
                  <User className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Name
                    </p>
                    <p className="text-xl font-semibold text-gray-800">
                      {session?.user?.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                <div className="flex items-center justify-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Email
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              Account Active • Last login: Today
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
