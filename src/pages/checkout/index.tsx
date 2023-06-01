import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { CartItemType } from "../../components/atoms/cart-item";
import _ from "lodash";
import CartItem from "../../components/atoms/cart-item";
import { connect } from "react-redux";
import reduxActions from "../../redux/reducers/cart-reducer/cart-actions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Checkout: React.FC<any> = (props) => {
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
            {_.isEmpty(props.cart) || _.isUndefined(props.cart) ? (
              <CircularProgress />
            ) : (
              props.cart.map((cartItem: CartItemType) => (
                <CartItem
                  cartItem={{ ...cartItem }}
                  onDeleteClick={(itemId: any) => props.removeFromCart(itemId)}
                  adjustQty={props.adjustQty}
                />
              ))
            )}
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Card sx={{ width: "100%", height: "50%" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Cart Summery
                </Typography>
                <b>
                  <Grid
                    container
                    justifyContent="unset"
                    direction="row"
                    style={{ fontSize: 15 }}
                  >
                    <Grid item xs={2.5}>
                      Total Price :
                    </Grid>
                    <Grid item xs={2}>
                      Rs 1000
                    </Grid>
                  </Grid>
                </b>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<ShoppingCartIcon />}
                  size="medium"
                  color="success"
                  variant="contained"
                  style={{ width: "100%", top: 180 }}
                >
                  Add Order
                </Button>
              </CardActions>
            </Card>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeFromCart: (id: string) => dispatch(reduxActions.removeFromCart(id)),
    adjustQty: (id: any, value: number) =>
      dispatch(reduxActions.adjustQty(id, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
