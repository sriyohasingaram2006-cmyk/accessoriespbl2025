import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { ProductModal } from './components/ProductModal';
import { useCart } from './hooks/useCart';
import { Product } from './lib/supabase';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { cartItems, addToCart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={getTotalItems()} onCartClick={() => setCartOpen(true)} />
      <Hero />
      <ProductGrid onAddToCart={addToCart} onProductClick={setSelectedProduct} />
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        totalPrice={getTotalPrice()}
      />
      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
}

export default App;
