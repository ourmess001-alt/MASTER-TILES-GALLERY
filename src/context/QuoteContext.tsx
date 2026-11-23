'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { QuoteItem } from '../types';

interface QuoteContextType {
  items: QuoteItem[];
  addItem: (item: Omit<QuoteItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, boxes: number) => void;
  clearBag: () => void;
  isWholesaleMode: boolean;
  toggleWholesaleMode: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isDigitalCardOpen: boolean;
  setIsDigitalCardOpen: (open: boolean) => void;
  totalSqft: number;
  totalBoxes: number;
  totalBDT: number;
  itemCount: number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const STORAGE_KEY = 'mtg_quote_bag_v1';
const WHOLESALE_KEY = 'mtg_wholesale_mode_v1';

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isWholesaleMode, setIsWholesaleMode] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isDigitalCardOpen, setIsDigitalCardOpen] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Load from local storage
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
      const savedWholesale = localStorage.getItem(WHOLESALE_KEY);
      if (savedWholesale !== null) {
        setIsWholesaleMode(savedWholesale === 'true');
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      localStorage.setItem(WHOLESALE_KEY, String(isWholesaleMode));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [items, isWholesaleMode, isHydrated]);

  const addItem = (itemData: Omit<QuoteItem, 'id'>) => {
    const existingIndex = items.findIndex(
      (it) => it.tileId === itemData.tileId && it.size === itemData.size && it.finish === itemData.finish
    );

    if (existingIndex > -1) {
      const updated = [...items];
      const existing = updated[existingIndex];
      const newBoxes = existing.boxes + itemData.boxes;
      const ratio = newBoxes / existing.boxes;
      const newSqft = Math.round(existing.sqft * ratio * 10) / 10;
      const newTotal = Math.round(newSqft * existing.pricePerSqft);

      updated[existingIndex] = {
        ...existing,
        boxes: newBoxes,
        sqft: newSqft,
        totalBDT: newTotal,
      };
      setItems(updated);
    } else {
      const newItem: QuoteItem = {
        ...itemData,
        id: `quote-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      };
      setItems((prev) => [newItem, ...prev]);
    }

    setIsDrawerOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, newBoxes: number) => {
    if (newBoxes <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const boxRatio = newBoxes / item.boxes;
        const newSqft = Math.round(item.sqft * boxRatio * 10) / 10;
        const newTotal = Math.round(newSqft * item.pricePerSqft);
        return {
          ...item,
          boxes: newBoxes,
          sqft: newSqft,
          totalBDT: newTotal,
        };
      })
    );
  };

  const clearBag = () => {
    setItems([]);
  };

  const toggleWholesaleMode = () => {
    setIsWholesaleMode((prev) => !prev);
  };

  const totalSqft = Math.round(items.reduce((acc, it) => acc + it.sqft, 0) * 10) / 10;
  const totalBoxes = items.reduce((acc, it) => acc + it.boxes, 0);
  const totalBDT = items.reduce((acc, it) => acc + it.totalBDT, 0);
  const itemCount = items.length;

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearBag,
        isWholesaleMode,
        toggleWholesaleMode,
        isDrawerOpen,
        setIsDrawerOpen,
        isDigitalCardOpen,
        setIsDigitalCardOpen,
        totalSqft,
        totalBoxes,
        totalBDT,
        itemCount,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};
