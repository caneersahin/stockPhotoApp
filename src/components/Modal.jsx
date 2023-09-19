import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { favoriStore } from "../store/store";
import axios from "axios";
import ImageCardItem from "./ImageCardItem";
import Row from "react-bootstrap/Row";

function Modals(props) {
  const [status, setStatus] = useState(null);

  const favoriList = favoriStore((state) => state.favoriList);
  const [favoriListDetail, setFavoriListDetail] = useState([]);

  useEffect(() => {
    if (props.show === true) {
      const api_key =
        "MW7V83I2xdw0xM8njHRntkFIF5ZvyjDK2EMmxEoZvC2X1qejgOUrxHJl";

      Promise.all(
        favoriList.map((element) => {
          const headers = {
            Authorization: api_key,
          };
          return axios
            .get(`https://api.pexels.com/v1/photos/${element}`, { headers })
            .then((response) => response.data);
        })
      )
        .then((responses) => {
          setFavoriListDetail(responses);
        })
        .catch((error) => {
          console.error(error);
        });

        setStatus(true)
    }
  }, [props.show , status]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Favorileriniz
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {status === null ? (
          <span> bekle </span>
        ) : (
          <Row>
            {favoriListDetail?.map((item, index) => (
              <ImageCardItem key={index} item={item} />
            ))}
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Modals;
