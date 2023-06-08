import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { CraftType } from "../../../services/crafts";
import GlobalImg from "../../atoms/image";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import GlobalIconButton from "../../atoms/icon-button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

/**
 * Usage - This component is used for to display a single item in the created grid view.
 *
 * Description - The component is build based on the Material Ui Paper, Grid and other components
 *
 * @props item @typedef EmployeeType
 * @props handleAddToCart @typedef function
 */

const GridItem: React.FC<{
  item: CraftType;
  handleAddToCart: (itemId: string) => void;
}> = (props) => {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Box
            sx={{
              width: 128,
              height: 128,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <GlobalImg
              imageAlt="complex"
              imageStyle={{
                margin: "auto",
                display: "block",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              imageSrc={props.item.photo}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {`${props.item.name}`}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {/* Later change this to category name */}
                {`${props.item.categoryName}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.item.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Items available  ${props.item.qty}`}
              </Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" sx={{ float: "right" }}>
                <GlobalIconButton
                  color="primary"
                  divStyle={{}}
                  icon={<AddShoppingCartIcon />}
                  isButtonDisabled={true}
                  divOnClick={(event) => props.handleAddToCart(props.item._id)}
                />
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default GridItem;
