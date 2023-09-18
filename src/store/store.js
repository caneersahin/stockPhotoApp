// store.js
import { create } from 'zustand'
const useStore = create((set) => ({
  searchResults: "", // API'den gelen sonuçları saklamak için bir dizi
  setSearchResults: (results) => set({ searchResults: results }), // Sonuçları güncellemek için bir işlev
}));

export default useStore;
