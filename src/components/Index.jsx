import Header from "./Header";
import SearchBar from "./SearchBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageCardItem from "./ImageCardItem";
import { imageList } from "../store/store";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../api/api" // api.js dosyasını içe aktarın
import axios from 'axios';



function Index() {
  const navigate = useNavigate();

  async function control() {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    if (cookies?.[0] == "") {
      navigate('/');
      return
    }
    const cookiesList = cookies[0].split("=")[1].split("-")[1].split("&")
    const result = await loginUser(cookiesList[0], cookiesList[1]);
    if (result) {
      navigate('/dashboard');
    } else {
      console.log('Kullanıcı bulunamadı veya hata oluştu');
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
