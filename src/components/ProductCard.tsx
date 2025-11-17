import { Plus } from 'lucide-react';
import { Product } from '../lib/supabase';

type ProductCardProps = {
  product: Product;
  onAddToCart: (productId: string) => void;
  onProductClick: (product: Product) => void;
};

export const ProductCard = ({ product, onAddToCart, onProductClick }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      <div
        className="relative h-64 overflow-hidden cursor-pointer"
        onClick={() => onProductClick(product)}
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product.id)}
            className="bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 transition-colors transform hover:scale-110"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        {product.stock < 10 && product.stock > 0 && (
          <p className="text-orange-600 text-xs mt-2">Only {product.stock} left in stock</p>
        )}
        {product.stock === 0 && (
          <p className="text-red-600 text-xs mt-2">Out of stock</p>
        )}
      </div>
    </div>
  );
};
