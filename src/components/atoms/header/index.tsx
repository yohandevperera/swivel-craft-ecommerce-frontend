import { styled } from "@mui/material/styles";
import { Button, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import { NavLink as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

/**
 * Usage - This component can be used as a
 * global header for to display a title.
 *
 * Description - The component is build based on the material UI Card
 *
 * @props title @typedef string
 */

const Div = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  alignItems: "center",
  alignContent: "center",
  marginTop: 4,
  color: "white",
}));

const Header: React.FC<{ title: string; cart: any }> = (props) => {
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    let count = 0;
    props.cart.forEach((item: any) => {
      count += item.qty;
    });
    setCartCount(count);
  }, [props.cart, cartCount]);

  return (
    <Card
      sx={{
        backgroundColor: "secondary.main",
        height: 50,
        marginTop: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6} md={9.8}>
          <Div>{props.title}</Div>
        </Grid>
        <Grid item xs={6} md={1} style={{ marginTop: 6, float: "right" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Button component={RouterLink} to={`/login`} variant="contained">
                Login
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                component={RouterLink}
                to={`/checkout`}
                variant="contained"
                sx={{ width: 150 }}
                startIcon={<ShoppingCartIcon />}
              >
                {`Cart   ${cartCount}`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(Header);
