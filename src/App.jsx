import './App.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImageCardItem from './components/ImageCardItem';
function App() {

  return (
    <>
      <Container>
        <Row>
          <Col className='headerPosition'>
            <Header />
            <SearchBar />
          </Col>
        </Row>
        <ImageCardItem />
      </Container>

    </>
  )
}

export default App
