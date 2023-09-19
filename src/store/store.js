// store.js
import { create } from 'zustand';

const imageList = create((set) => ({
  searchResults: '', // API'den gelen sonuçları saklamak için bir dizi
  setSearchResults: (results) => set({ searchResults: results }), // Sonuçları güncellemek için bir işlev
}));

const favoriStore = create((set) => ({
  favoriList: [], // Favorileri tutacak dizi
  totalFavoriler: 0, // Toplam favori sayısı

  // Favorilere eklemek için bir işlev
  addToFavorites: (id) => {
    set((state) => ({
      favoriList: [...state.favoriList, id],
      totalFavoriler: state.totalFavoriler + 1,
    }));
  },
  // Favorilerden çıkartmak için bir işlev
  removeFromFavorites: (id) => {
    set((state) => ({
      favoriList: state.favoriList.filter((itemId) => itemId !== id),
      totalFavoriler: state.totalFavoriler - 1,
    }));
  },
}));

export { imageList, favoriStore };