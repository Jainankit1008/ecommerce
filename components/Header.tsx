// *********************
// Role of the component: Header component
// Name of the component: Header.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Header />
// Input parameters: no input parameters
// Output: Header component
// *********************

"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { FaBell, FaSearch, FaShoppingCart } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";

const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { wishlist, setWishlist, wishQuantity } = useWishlistStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };

  // getting all wishlist items by user id
  const getWishlistByUserId = async (id: string) => {
    const response = await fetch(`http://localhost:3001/api/wishlist/${id}`, {
      cache: "no-store",
    });
    const wishlist = await response.json();
    const productArray: {
      id: string;
      title: string;
      price: number;
      image: string;
      slug:string
      stockAvailabillity: number;
    }[] = [];
    
    wishlist.map((item: any) => productArray.push({id: item?.product?.id, title: item?.product?.title, price: item?.product?.price, image: item?.product?.mainImage, slug: item?.product?.slug, stockAvailabillity: item?.product?.inStock}));
    
    setWishlist(productArray);
  };

  // getting user by email so I can get his user id
  const getUserByEmail = async () => {
    if (session?.user?.email) {
      
      fetch(`http://localhost:3001/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          getWishlistByUserId(data?.id);
        });
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email, wishlist.length]);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Company Name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">AB</span>
              <span className="text-2xl font-semibold text-gray-800 ml-1">Electro</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Right Side Navigation */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <FaShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 
              flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Auth */}
            {session ? (
              <div className="flex items-center space-x-4">
                <img 
                  src={session.user?.image || '/default-avatar.png'} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full"
                />
                <Link 
                  href="/profile"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {session.user?.name}
                </Link>
              </div>
            ) : (
              <Link 
                href="/auth/signin"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden sm:block py-2">
          <ul className="flex space-x-8">
            <li>
              <Link 
                href="/products"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Products
              </Link>
            </li>
            <li>
              <Link 
                href="/categories"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link 
                href="/deals"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Deals
              </Link>
            </li>
            <li>
              <Link 
                href="/support"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Support
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
