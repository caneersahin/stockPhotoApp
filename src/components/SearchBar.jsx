import React, { useState } from "react"; // useState eklemeyi unutmayın
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import imageList from "../store/store";
import axios from "axios";
function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const { setSearchResults } = imageList();

  var api_key = "MW7V83I2xdw0xM8njHRntkFIF5ZvyjDK2EMmxEoZvC2X1qejgOUrxHJl";

  const handleSearch = async () => {
    if (searchValue.trim() == "") {
      alert("Lütfen aramak istediğiniz kelimeyi yazınız.");
      return;
    }
    try {
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
        />
      </Box>
      <Button
        style={{ marginTop: "1rem" }}
        onClick={handleSearch}
        variant="contained"
        endIcon={<SearchIcon />}
      >
        Search
      </Button>
    </>
  );
}

export default SearchBar;
