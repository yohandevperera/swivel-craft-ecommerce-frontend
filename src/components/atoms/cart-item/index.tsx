import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export type CartItemType = {
  photo: string;
  name: string;
  price: number;
  _id?: number;
  qty: number;
};

export interface CartItemProps {
  cartItem: CartItemType;
  onDeleteClick: (itemId: any) => void;
  adjustQty: (id: any, value: number) => void;
}

const CartItem: React.FC<CartItemProps> = (props) => {
  const [qtyInput, setQtyInput] = useState<number>(props.cartItem.qty);

  return (
    <>
      <Card sx={{ display: "flex", width: "80%", marginTop: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 100 }}
          image={props.cartItem.photo}
          alt="System cannot load the image"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" style={{ float: "left" }} variant="h5">
              {props.cartItem.name}
            </Typography>
            <div
              style={{ float: "right", marginLeft: 70, marginTop: 30 }}
              onClick={() => props.onDeleteClick(props.cartItem._id)}
            >
              <IconButton
                color="error"
                aria-label="upload picture"
                component="label"
              >
                <DeleteIcon />
              </IconButton>
            </div>
            <TextField
              label="Qty"
              id="qty"
              sx={{ width: "10ch", float: "right", marginLeft: 10, top: 25 }}
              defaultValue={qtyInput}
              type="number"
              onChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setQtyInput(Number(event.target.value));
                props.adjustQty(props.cartItem._id, Number(event.target.value));
              }}
            />
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 2, pb: 3 }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {`Rs ${props.cartItem.price}`}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};
export default CartItem;
