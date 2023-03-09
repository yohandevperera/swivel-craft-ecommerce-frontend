import Grid from "@mui/material/Grid";
import React from "react";
import { EmployeeType } from "../../../services/employee";
import GridItem from "../../molecules/grid-item";
import _ from "lodash";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * Usage - This component is used to display the grid view of the employee data.
 *
 * Description - The component is build based on the Material Ui components and custom components
 *
 * @props gridDir @typedef enum
 * @props gridData @typedef EmployeeType[]
 * @props formRef @typedef function
 */

const EmployeeGrid: React.FC<{
  gridDir: "column" | "row";
  gridData: EmployeeType[];
  handleEmployeeDelete: (employeeId: string) => void;
}> = (props) => {
  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        spacing={3}
        sx={{ width: 10 }}
        direction={props.gridDir}
      >
        {_.isEmpty(props.gridData) || _.isNull(props.gridData) ? (
          <CircularProgress
            style={{
              marginLeft: "50%",
              marginTop: "10%",
            }}
          />
        ) : (
          props.gridData.map((item: EmployeeType) => (
            <Grid item xs={3}>
              <GridItem item={item} handleDelete={props.handleEmployeeDelete} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default EmployeeGrid;
