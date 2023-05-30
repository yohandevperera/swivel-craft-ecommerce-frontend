import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

export interface CartItemProps {
  photo: string;
  name: string;
  price: number;
  id?: number;
  qty: number;
}

const CartItem: React.FC<CartItemProps> = (props) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="system couldnt load the image" src={props.photo} />
        </ListItemAvatar>
        <ListItemText
          primary={props.name}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {`Rs ${props.price}`}
              </Typography>
              {` —  Qty : ${props.qty}`}
            </>
          }
        />
      </ListItem>
    </>
  );
};
export default CartItem;
