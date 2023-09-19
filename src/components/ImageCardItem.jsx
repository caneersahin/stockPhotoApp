import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Col from "react-bootstrap/Col";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { favoriStore } from "../store/store";

function ImageCardItem(item) {
  const { addToFavorites, favoriList, removeFromFavorites } = favoriStore();

  const handleAddToFavoritesOrRemoveFovorites = (imageId, favoriListStatus) => {
    if (!favoriListStatus) return addToFavorites(imageId);
    removeFromFavorites(imageId);
  };

  return (
    <>
      <Col className="mb-2" md={3}>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton
                aria-label="add to favorites"
                onClick={() =>
                  handleAddToFavoritesOrRemoveFovorites(
                    item.item.id,
                    favoriList.includes(item.item.id)
                  )
                }
                color={favoriList.includes(item.item.id) ? "error" : "default"}
              >
                <FavoriteIcon />
              </IconButton>
            }
            title={item.item.photographer}
          />
          <CardMedia
            component="img"
            height="194"
            image={item.item.src.medium}
            alt="Paella dish"
          />
          <CardContent>
            <Typography
              variant="body2"
              style={{ whiteSpace: "nowrap" }}
              color="text.secondary"
            >
              {item.item.alt}
            </Typography>
          </CardContent>
        </Card>
      </Col>
    </>
  );
}

export default ImageCardItem;
