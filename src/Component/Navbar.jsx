"use client";
import React from "react";
import { User, Package, Settings, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const routes = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {routes.map((route) => (
              <li key={route.path}>
                <Link href={route.path}>{route.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <Link href="/" className="btn btn-ghost text-xl">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mr-2">
            <span className="text-white font-bold">N</span>
          </div>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            NexaTech
          </span>
        </Link>
      </div>

      {/* Navbar Center - Desktop Menu */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          {routes.map((route) => (
            <li key={route.path}>
              <Link href={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Navbar End - Auth Section */}
      <div className="navbar-end">
        {!isLoggedIn ? (
          <div className="flex gap-2">
            <Link href="/login" className="btn btn-ghost">
              Login
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost flex items-center gap-2"
            >
              <div className="avatar placeholder">
                <div className="bg-gradient-to-br from-primary to-secondary text-neutral-content w-8 rounded-full">
                  <User className="w-4 h-4" />
                </div>
              </div>
              <span className="hidden md:inline">{session?.user?.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-64 p-2 shadow-lg"
            >
              {/* User Info Header */}
              <li className="menu-title">
                <div className="flex flex-col gap-0.5 px-2 py-2">
                  <span className="font-semibold text-base">
                    {session?.user?.name}
                  </span>
                  <span className="text-xs opacity-60 font-normal">
                    {session?.user?.email}
                  </span>
                </div>
              </li>
              <li className="my-1">
                <div className="divider my-0"></div>
              </li>

              {/* Dashboard Link */}
              <li>
                <Link href="/dashboard">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              </li>

              {/* Menu Items */}
              <li>
                <Link href="/add-product">
                  <Package className="w-4 h-4" />
                  Add Product
                </Link>
              </li>
              <li>
                <Link href="/manage-products">
                  <Settings className="w-4 h-4" />
                  Manage Products
                </Link>
              </li>

              {/* Logout */}
              <li className="my-1">
                <div className="divider my-0"></div>
              </li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="text-error"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
