import { useState, useEffect } from 'react';
import { supabase, Product } from '../lib/supabase';

const getSessionId = () => {
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
};

export type CartItemWithProduct = {
  id: string;
  quantity: number;
  product: Product;
};

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const sessionId = getSessionId();
    const { data, error } = await supabase
      .from('cart_items')
      .select('id, quantity, product_id, products(*)')
      .eq('session_id', sessionId);

    if (error) {
      console.error('Error fetching cart:', error);
      return;
    }

    const items: CartItemWithProduct[] = (data || []).map((item: any) => ({
      id: item.id,
      quantity: item.quantity,
      product: item.products,
    }));

    setCartItems(items);
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId: string) => {
    const sessionId = getSessionId();

    const existingItem = cartItems.find(item => item.product.id === productId);

    if (existingItem) {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + 1 })
        .eq('id', existingItem.id);

      if (error) {
        console.error('Error updating cart:', error);
        return;
      }
    } else {
      const { error } = await supabase
        .from('cart_items')
        .insert({ session_id: sessionId, product_id: productId, quantity: 1 });

      if (error) {
        console.error('Error adding to cart:', error);
        return;
      }
    }

    await fetchCart();
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);

    if (error) {
      console.error('Error updating quantity:', error);
      return;
    }

    await fetchCart();
  };

  const removeFromCart = async (itemId: string) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('Error removing from cart:', error);
      return;
    }

    await fetchCart();
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
  };
};
