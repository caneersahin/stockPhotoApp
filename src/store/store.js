// store.js
import { create } from 'zustand'
const imageList = create((set) => ({
  searchResults: "", // API'den gelen sonuçları saklamak için bir dizi
  setSearchResults: (results) => set({ searchResults: results }), // Sonuçları güncellemek için bir işlev
}));

export default imageList;
