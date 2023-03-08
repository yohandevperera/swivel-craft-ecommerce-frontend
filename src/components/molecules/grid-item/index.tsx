import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { EmployeeType } from "../../../services/employee";
import GlobalImg from "../../atoms/image";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import _ from "lodash";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GlobalIconButton from "../../atoms/icon-button";
import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteEmployeeDialog from "../delete-employee-dialog";
import { NavLink as RouterLink } from "react-router-dom";

const GridItem: React.FC<{
  item: EmployeeType;
  handleDelete: (employeeId: string) => void;
}> = (props) => {
  const [deleteDialogVisiblity, setDeleteDialogVisiblity] =
    useState<boolean>(false);

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
                {`${props.item.firstname}   ${props.item.lastname}`}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {_.truncate(props.item.email, {
                  length: 25,
                  omission: "..",
                })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.item.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.item.gender == "M" ? "Male" : "Female"}
              </Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" sx={{ float: "right" }}>
                <Button
                  disableRipple
                  component={RouterLink}
                  to={`/employee-edit/${props.item._id}`}
                >
                  <EditIcon />
                </Button>

                <GlobalIconButton
                  color="primary"
                  divStyle={{}}
                  icon={<DeleteIcon />}
                  isButtonDisabled={true}
                  divOnClick={() => setDeleteDialogVisiblity(true)}
                />
              </Stack>
              <DeleteEmployeeDialog
                openState={deleteDialogVisiblity}
                setOpenState={setDeleteDialogVisiblity}
                employeeId={props.item._id}
                handleDelete={props.handleDelete}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default GridItem;
