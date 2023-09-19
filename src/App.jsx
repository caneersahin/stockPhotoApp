import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageCardItem from "./components/ImageCardItem";
import { imageList } from "./store/store";
import { useEffect } from "react";
function App() {

  const searchResults = imageList((state) => state.searchResults);
  useEffect(() => {}, [searchResults]); // searchResults değiştiğinde bu etki yeniden çalışır
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
            <ImageCardItem key ={index} item={item} />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
