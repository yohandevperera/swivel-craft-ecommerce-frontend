import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { CartItemType } from "../../components/atoms/cart-item";
import _ from "lodash";
import CartItem from "../../components/atoms/cart-item";
import { connect } from "react-redux";
import reduxActions from "../../redux/reducers/cart-reducer/cart-actions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { OrderType } from "../../services/orders";
import { toast, ToastContainer } from "react-toastify";
import { createOrders } from "../../redux/thunks/orders-thunk";
import { useDispatch, useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "90Vh",
}));

const Checkout: React.FC<any> = (props) => {
  const dispatch = useDispatch();

  let orderIdCounter: number = 1;

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [orderId, setOrderId] = useState<string>("");

  const { crudOperations } = useSelector((state: any) => state);

  const generateOrderId = () => {
    const orderPrefix: string = "ORD";
    const orderID: string = `${orderPrefix}${orderIdCounter
      .toString()
      .padStart(4, "0")}`;
    orderIdCounter++;
    setOrderId(orderID);
  };

  const calculateTotalPriceAndItemsCount = () => {
    let items = 0;
    let price = 0;
    props.cart.forEach((cartItem: any) => {
      items += cartItem.qty;
      price += cartItem.price * cartItem.qty;
    });
    setTotalItems(items);
    setTotalPrice(price);
  };

  useEffect(() => {
    generateOrderId();
    calculateTotalPriceAndItemsCount();
  }, [
    props.cart,
    totalPrice,
    totalItems,
    setTotalItems,
    setTotalPrice,
    orderId,
    setOrderId,
  ]);

  const handleOrder = () => {
    const userObject = JSON.parse(localStorage.getItem("userObject") || "{}");
    if (!_.isEmpty(userObject) && userObject.userRole == "USER") {
      const orderData: OrderType[] = props.cart.map((cartItem: any) => ({
        orderId,
        userId: userObject._id,
        qtyBought: cartItem.qty,
        totalPrice: totalPrice,
        craftId: cartItem._id,
      }));
      dispatch(createOrders(orderData) as any);
      if (
        _.has(crudOperations, "errorMessage") &&
        !_.isEmpty(crudOperations.errorMessage)
      ) {
        toast.error(crudOperations.errorMessage, {
          position: "bottom-right",
        });
      }

      if (
        _.has(crudOperations, "dataSet.message") &&
        !_.isEmpty(crudOperations.dataSet)
      ) {
        const createdResponse = crudOperations.dataSet;
        toast.success(createdResponse.message, { position: "bottom-right" });
        generateOrderId();
      }
    } else {
      toast.error("Please Loging to continue order", {
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <ToastContainer />
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
                  <Grid container style={{ fontSize: 15, marginTop: 50 }}>
                    <Grid item xs={2.5}>
                      Total Price
                    </Grid>
                    <Grid item xs={3}>
                      Rs {totalPrice}
                    </Grid>
                  </Grid>
                  <Grid container style={{ fontSize: 15, marginTop: 10 }}>
                    <Grid item xs={2.5}>
                      Total Items
                    </Grid>
                    <Grid item xs={2.5}>
                      {totalItems} No's
                    </Grid>
                  </Grid>
                  <Grid container style={{ fontSize: 15, marginTop: 30 }}>
                    <Grid item xs={2}>
                      Order Id
                    </Grid>
                    <Grid item xs={3.4}>
                      {orderId}
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
                  style={{ width: "100%", top: 2 }}
                  onClick={handleOrder}
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
