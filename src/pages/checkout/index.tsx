import { CircularProgress, Grid, List } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { CartItemProps } from "../../components/atoms/cart-item";
import _ from "lodash";
import CartItem from "../../components/atoms/cart-item";
import { connect } from "react-redux";

const Checkout: React.FC<any> = (props) => {
  console.log(props.items);

  const cartItems: CartItemProps[] = [
    {
      imageSrc: "",
      itemName: "Test",
      price: 1000,
      qty: 10,
    },
    {
      imageSrc: "",
      itemName: "Test 1",
      price: 1000,
      qty: 10,
    },
    {
      imageSrc: "",
      itemName: "Test 2",
      price: 1000,
      qty: 10,
    },
  ];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "90Vh",
  }));

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {_.isEmpty(cartItems) || _.isUndefined(cartItems) ? (
                <CircularProgress />
              ) : (
                cartItems.map((item: CartItemProps, index: number) => (
                  <CartItem key={index} {...item} />
                ))
              )}
            </List>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    items: state.cart.items,
  };
};

export default connect(mapStateToProps)(Checkout);
