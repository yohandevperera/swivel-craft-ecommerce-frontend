import TableContainer from "@mui/material/TableContainer";
import { EmployeeType } from "../../../services/employee";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import _ from "lodash";
import TableBody from "@mui/material/TableBody";
import { Box, Stack } from "@mui/system";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import GlobalImg from "../../atoms/image";
import { useState } from "react";
import DeleteEmployeeDialog from "../../molecules/delete-employee-dialog";
import { NavLink as RouterLink } from "react-router-dom";

const EmployeeTable: React.FC<{
  tableData: EmployeeType[];
  tableHeadings: string[];
  handleEmployeeDelete: (employeeId: string) => void;
}> = (props) => {
  const [deleteDialogVisiblity, setDeleteDialogVisiblity] =
    useState<boolean>(false);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {_.isEmpty(props.tableHeadings) ? (
              <></>
            ) : (
              props.tableHeadings.map((headingName: string) => (
                <TableCell align="center">{headingName}</TableCell>
              ))
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {_.isEmpty(props.tableData) ? (
            <></>
          ) : (
            props.tableData.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
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
                      imageSrc={row.photo}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">{row.firstname}</TableCell>
                <TableCell align="right">{row.lastname}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" alignItems="end" spacing={2}>
                    <Button
                      disableRipple
                      component={RouterLink}
                      to={`/employee-edit/${row._id}`}
                    >
                      Edit
                    </Button>
                    <div onClick={() => setDeleteDialogVisiblity(true)}>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </Stack>
                  <DeleteEmployeeDialog
                    openState={deleteDialogVisiblity}
                    setOpenState={setDeleteDialogVisiblity}
                    employeeId={row._id}
                    handleDelete={props.handleEmployeeDelete}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
