// store.js
import { create } from 'zustand';
import { addToFavoriteList, removeToFavoriteList } from '../api/api'; // api.js dosyasını içe aktarın
import { useNavigate } from 'react-router-dom';


const imageList = create((set) => ({
  searchResults: '', // API'den gelen sonuçları saklamak için bir dizi
  setSearchResults: (results) => set({ searchResults: results }), // Sonuçları güncellemek için bir işlev
}));

const favoriStore = create((set) => ({
  favoriList: [], // Favorileri tutacak dizi
  totalFavoriler: 0, // Toplam favori sayısı

  // Favorilere eklemek için bir işlev
  addToFavorites: async (id) => {
    try {
      const result = await addToFavoriteList(id);
      if (result == "loginHata") {

      }
      set((state) => ({
        favoriList: result,
        totalFavoriler: result.length,
      }));
    } catch (error) {
      console.error('API isteği başarısız oldu:', error);
    }
  },

  removeFromFavorites: async (id) => {
    try {
      const result = await removeToFavoriteList(id);
      set((state) => ({
        favoriList: result,
        totalFavoriler: result.length,
      }));
    } catch (error) {
      console.error('API isteği başarısız oldu:', error);
    }
  },
}));

export { imageList, favoriStore };