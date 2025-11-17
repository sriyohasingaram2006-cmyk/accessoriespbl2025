import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

type HeaderProps = {
  cartCount: number;
  onCartClick: () => void;
};

export const Header = ({ cartCount, onCartClick }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-amber-600" />
            <h1 className="ml-2 text-2xl font-bold text-gray-900">Accessories</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#all" className="text-gray-700 hover:text-amber-600 transition-colors">All Products</a>
            <a href="#bags" className="text-gray-700 hover:text-amber-600 transition-colors">Bags</a>
            <a href="#jewelry" className="text-gray-700 hover:text-amber-600 transition-colors">Jewelry</a>
            <a href="#sunglasses" className="text-gray-700 hover:text-amber-600 transition-colors">Sunglasses</a>
            <a href="#watches" className="text-gray-700 hover:text-amber-600 transition-colors">Watches</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <a href="#all" className="text-gray-700 hover:text-amber-600 transition-colors">All Products</a>
              <a href="#bags" className="text-gray-700 hover:text-amber-600 transition-colors">Bags</a>
              <a href="#jewelry" className="text-gray-700 hover:text-amber-600 transition-colors">Jewelry</a>
              <a href="#sunglasses" className="text-gray-700 hover:text-amber-600 transition-colors">Sunglasses</a>
              <a href="#watches" className="text-gray-700 hover:text-amber-600 transition-colors">Watches</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
