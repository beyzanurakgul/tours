'use client';

import React, { useState } from 'react';
import { FiMenu, FiHeart, FiShoppingCart, FiUser, FiFilter, FiX } from 'react-icons/fi';
import { Button } from './ui';
import FilterPopup from './FilterPopup';
import { useFilterStore } from '../store/useFilterStore';

const Navbar: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useFilterStore();

  return (
    <header className="fixed top-0 left-0 right-0 bg-primary-500 text-white shadow-md z-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* 🔹 Logo */}
        <div className="text-2xl font-bold">TravelGo</div>

        {/* 🔹 Arama Çubuğu (Sadece MD ve üstü ekranlarda görünür) */}
        <div className="hidden md:flex flex-1 mx-4">
          <input
            type="text"
            placeholder="Ara (örn. Antalya, Balon, vb.)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-gray-200 rounded p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
          />
        </div>

        {/* 🔹 Masaüstü Menü Öğeleri + Filtre Butonu */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="secondary" className="flex items-center space-x-2">
            <FiHeart className="w-5 h-5 text-white" />
            <span>Favorites</span>
          </Button>
          <Button variant="secondary" className="flex items-center space-x-2">
            <FiShoppingCart className="w-5 h-5 text-white" />
            <span>Cart</span>
          </Button>
          <Button variant="secondary" className="flex items-center space-x-2">
            <FiUser className="w-5 h-5 text-white" />
            <span>Login</span>
          </Button>
          {/* 🔹 Filtre Butonu (Web Görünümüne Eklendi) */}
          <Button variant="primary" onClick={() => setShowPopup(true)} className="flex items-center space-x-2">
            <FiFilter className="w-6 h-5 text-white" />
           
          </Button>
        </div>

        {/* 🔹 Mobil Menü Butonu (Hamburger Menü) */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? (
            <FiX className="w-7 h-7 text-white" />
          ) : (
            <FiMenu className="w-7 h-7 text-white" />
          )}
        </button>

      </nav>

      {/* 🔹 Mobil Menü (Sadece Mobil Ekranlarda Açılır) */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-primary-600 shadow-lg py-4">
          <div className="flex flex-col items-center space-y-4">
            <input
              type="text"
              placeholder="Ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-4/5 border border-gray-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
            />
            <Button variant="secondary" className="w-4/5 flex items-center justify-center">
              <FiHeart className="w-5 h-5 text-white" />
              <span className="ml-2">Favorites</span>
            </Button>
            <Button variant="secondary" className="w-4/5 flex items-center justify-center">
              <FiShoppingCart className="w-5 h-5 text-white" />
              <span className="ml-2">Cart</span>
            </Button>
            <Button variant="secondary" className="w-4/5 flex items-center justify-center">
              <FiUser className="w-5 h-5 text-white" />
              <span className="ml-2">Login</span>
            </Button>
            {/* 🔹 Mobilde de Filtre Butonu Eklendi */}
            <Button variant="primary" className="w-4/5 flex items-center justify-center" onClick={() => setShowPopup(true)}>
              <FiFilter className="w-5 h-5 text-white" />
              <span className="ml-2">Filters</span>
            </Button>
          </div>
        </div>
      )}

      {/* 🔹 Filtre Popup (Tüm Ekranlar İçin) */}
      {showPopup && <FilterPopup closePopup={() => setShowPopup(false)} />}
      
    </header>
  );
};

export default Navbar;
