import Header from "./Header";
import SearchBar from "./SearchBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageCardItem from "./ImageCardItem";
import { imageList } from "../store/store";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function Index() {
	const navigate = useNavigate();

	async function control() {

		const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
		if (cookies?.[0] == "") {
			navigate('/');
			return
		}
		var cookiesList = cookies[0].split("=")[1].split("-")[1].split("&")
		const baseURL = 'http://localhost:3001';
		try {
			const response = await axios.get(`${baseURL}/users?username=${cookiesList[0]}&password=${cookiesList[1]}`);
			const users = response.data;
			if (users.length === 1) {
				navigate('/dashboard');
			} else {
				navigate('/');
				return null;
			}
		} catch (error) {
			console.error('Oturum açma sırasında bir hata oluştu:', error);
			throw error;
		}
	}

	const searchResults = imageList((state) => state.searchResults);
	useEffect(() => { }, [searchResults]); // searchResults değiştiğinde bu etki yeniden çalışır
	useEffect(() => {
		control()
	}, []);


	return (
		<>
			<Container>
				<Row>
					<Col md={{ span: 6, offset: 3 }} className="headerPosition">
						<Header />
						<SearchBar />
					</Col>
				</Row>
				<Row>
					{searchResults.photos?.map((item, index) => (
						<ImageCardItem key={index} item={item} />
					))}
				</Row>
			</Container>
		</>
	);
}

export default Index;
