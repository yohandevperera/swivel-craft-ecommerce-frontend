import TableContainer from "@mui/material/TableContainer";
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

/**
 * Usage - This component is used to display the records of the admin section.
 *
 * Description - The component is build based on the Material Ui components
 *
 * @props tableData @typedef EmployeeType[]
 * @props tableHeadings @typedef string[]
 * @props handleDelete @typedef function
 */

const DataTable: React.FC<{
  tableData: any[];
  tableHeadings: string[];
  handleDelete: (id: string) => void;
}> = (props) => {
  const [deleteDialogVisiblity, setDeleteDialogVisiblity] =
    useState<boolean>(false);
  return (
    <>
      <TableContainer
        style={{
          width: "90%",
          marginLeft: 108,
          marginTop: 20,
          borderRadius: 10,
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650, marginTop: 5 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {_.isEmpty(props.tableHeadings) ? (
                <></>
              ) : (
                props.tableHeadings.map((headingName: string) => (
                  <TableCell>{headingName}</TableCell>
                ))
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {_.isEmpty(props.tableData) ? (
              <></>
            ) : (
              props.tableData.map((row, index) => (
                <TableRow key={index}>
                  {Object.entries(row).map(([key, value], index) => {
                    const data: any = value;
                    if (key === "photo" && value) {
                      return (
                        <TableCell key={index}>
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
                      );
                    } else if (key !== "_id") {
                      return <TableCell key={index}>{data}</TableCell>;
                    }
                  })}
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
                      id={row._id}
                      handleDelete={props.handleDelete}
                    />
                  </TableCell>
                  ;
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;
