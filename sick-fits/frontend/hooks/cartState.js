import { useContext, createContext, useState } from 'react';

const LocalSateContext = createContext();
const LocalStateProvider = LocalSateContext.Provider;

// this is my onw custom provider that will keep data accessible everywhere
// I want that state to be available

function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(true);

  const toggleCart = () => setCartOpen(!cartOpen);
  const closeCart = () => setCartOpen(false);
  const openCart = () => setCartOpen(true);

  return (
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  const all = useContext(LocalSateContext);
  return all;
}

export { CartStateProvider, useCart };
