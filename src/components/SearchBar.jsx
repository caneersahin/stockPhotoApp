import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modals from "./Modal";
import { imageList, favoriStore } from "../store/store";


function SearchBar() {
  const { totalFavoriler } = favoriStore();
  const [searchValue, setSearchValue] = useState("");
  const { setSearchResults } = imageList();

  const [modalShow, setModalShow] = useState(false);
  const openModal = () => {
    setModalShow(true);
  };

  const handleSearch = async () => {
    if (searchValue.trim() == "") {
      alert("Lütfen aramak istediğiniz kelimeyi yazınız.");
      return;
    }
    try {
      var api_key = "MW7V83I2xdw0xM8njHRntkFIF5ZvyjDK2EMmxEoZvC2X1qejgOUrxHJl";
      const headers = {
        Authorization: api_key,
      };
      axios
        .get(
          `https://api.pexels.com/v1/search?query=${searchValue}&key=${api_key}`,
          { headers }
        )
        .then((response) => {
          setSearchResults(response.data); // Zustand'daki state'i güncelle
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("API hatası:", error);
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: "100%" }}>
        <TextField
          className="mt-2 searchInputArea"
          fullWidth
          label="Arama"
          id="searchKeyInput"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleEnterPress}
        />
        <Badge
          onClick={openModal}
          badgeContent={totalFavoriler}
          className="mt-3"
          color="primary"
        >
          <FavoriteIcon style={{ color: "red" }} />
        </Badge>
      </Box>
      <Button
        style={{ marginTop: "1rem" }}
        onClick={handleSearch}
        variant="contained"
        endIcon={<SearchIcon />}
      >
        Arama Yap
      </Button>
      <Modals show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default SearchBar;
