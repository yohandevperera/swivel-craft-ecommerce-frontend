import { styled } from "@mui/material/styles";
import { Button, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import { NavLink as RouterLink } from "react-router-dom";

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

const Header: React.FC<{ title: string }> = (props) => {
  return (
    <Card
      sx={{
        backgroundColor: "secondary.main",
        height: 50,
        marginTop: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6} md={10.5}>
          <Div>{props.title}</Div>
        </Grid>
        <Grid item xs={6} md={1} style={{ marginTop: 6, float: "right" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Button component={RouterLink} to={`/login`} variant="contained">
                Login
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button component={RouterLink} to={`/login`} variant="contained" >
                Cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Header;
