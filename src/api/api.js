// api.js
import axios from 'axios';
import Swal from 'sweetalert2';

const baseURL = 'http://localhost:3001'; // JSON Server'ın çalıştığı URL

export const showSweetAlert = (text) => {
	Swal.fire({
		title: '',
		text: text,
	});
};

var cookies
function controlCookie() {
	cookies = document.cookie.split(";").map((cookie) => cookie.trim());
	if (cookies?.[0] == "") {
		showSweetAlert("Aktif bir token bulunamadı, lütfen tekrar giriş yapınız.")
		return false;
	}
	return true
}


export const singUpUser = async (newUser) => {
	try {
		await axios.post(baseURL+'/users', newUser); // JSON Server URL'sini uygun şekilde güncelleyin
		showSweetAlert('Kullanıcı başarıyla eklendi.')
	} catch (error) {
		showSweetAlert('Kullanıcı eklenirken bir hata oluştu.')
		console.error('Kullanıcı eklenirken bir hata oluştu: ', error);
	}
};


export const loginUser = async (username, password) => {
	try {
		const response = await axios.get(`${baseURL}/users?username=${username}&password=${password}`);
		const users = response.data;
		if (users.length === 1) {
			var kullaniciAdiVeSifre = "123-" + username + "&" + password + "&" + users[0].id + "-123"
			document.cookie = "hash=" + kullaniciAdiVeSifre;
			return users
		} else {
			showSweetAlert("Kullanıcı adı veya şifre hatalı")
			return null; // Kullanıcı bulunamadı veya birden fazla kullanıcı var
		}
	} catch (error) {
		console.error('Oturum açma sırasında bir hata oluştu:', error);
		throw error;
	}
}


export const addToFavoriteList = async (imageId) => {
	try {
		if (!controlCookie()) {
			return;
		}
		var cookiesList = cookies[0].split("=")[1].split("-")[1].split("&")
		var userId = cookiesList[2]

		// Kullanıcının mevcut favori resimlerini alın
		const currentUserResponse = await axios.get(`${baseURL}/users/${userId}`);
		const currentUser = currentUserResponse.data;
		const currentFavImageIdList = currentUser.favImageIdList || [];

		// Yeni resim ID'sini mevcut listeye ekleyin
		if (currentFavImageIdList.includes(imageId)) {
			console.log(`${imageId} listede bulunuyor.`);
			return currentFavImageIdList
		}
		currentFavImageIdList.push(imageId);

		// Axios ile PATCH isteği göndererek favori resimleri güncelleyin
		const updateResponse = await axios.patch(`${baseURL}/users/${userId}`, {
			favImageIdList: currentFavImageIdList,
		});

		if (updateResponse.status === 200) {
			console.log('Favori resim başarıyla eklendi.');
			return updateResponse.data.favImageIdList;
		} else {
			console.error('Favori resim eklenirken bir hata oluştu.');
			return [];
		}
	} catch (error) {
		console.error('API isteği başarısız oldu:', error);
		throw error;
	}
};


export const removeToFavoriteList = async (imageId) => {
	try {
		if (!controlCookie()) {
			return;
		}
		var cookiesList = cookies[0].split("=")[1].split("-")[1].split("&")
		var userId = cookiesList[2]

		// Kullanıcının mevcut favori resimlerini alın
		const currentUserResponse = await axios.get(`${baseURL}/users/${userId}`);
		const currentUser = currentUserResponse.data;
		const currentFavImageIdList = currentUser.favImageIdList || [];

		// Çıkartılacak resmi favori listesinden kaldırın
		const updatedFavImageIdList = currentFavImageIdList.filter((id) => id !== imageId);

		// Axios ile PATCH isteği göndererek favori resimleri güncelleyin
		const updateResponse = await axios.patch(`${baseURL}/users/${userId}`, {
			favImageIdList: updatedFavImageIdList,
		});

		if (updateResponse.status === 200) {
			console.log('Favori resim başarıyla çıkartıldı.');
			return updateResponse.data.favImageIdList;
		} else {
			console.error('Favori resim çıkartılırken bir hata oluştu.');
			return [];
		}
	} catch (error) {
		console.error('API isteği başarısız oldu:', error);
		throw error;
	}
};
