import { useState } from "react";
import { Container, Card } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ButtonGrid from "../../molecules/button-gird";
import EmployeeGrid from "../../organisms/employee-grid";
import CircularProgress from "@mui/material/CircularProgress";
import EmployeeTable from "../../organisms/employee-table";
import _ from "lodash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  loadAllEmployees,
  removeEmployee,
  searchAndSortEmployee,
} from "../../../redux/reducers/employees/employees-thunks";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import { EmployeeType, getAllEmployees } from "../../../services/employee";

const EmployeeDataView: React.FC = () => {
  const [viewShift, setViewShift] = useState<"grid" | "list">("grid");
  const [searchValue, setSearchValue] = useState<NonNullable<
    string | EmployeeType
  > | null>("");
  const [employeeList, setEmployeeList] = useState<EmployeeType[]>([]);
  const [sortOrder, setSortOrder] = useState<"sort" | "disorder">("disorder");

  const dispatch = useDispatch();
  const employeeData = useSelector((state: any) => state.employees);

  const employeeTableHeadings: string[] = [
    "Image",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Gender",
    "Actions",
  ];

  useEffect(() => {
    dispatch(loadAllEmployees() as any);
  }, [employeeData.employee]);

  useEffect(() => {
    getAllEmployees()
      .then((response) => {
        if (_.has(response, "data.data")) {
          _.isEmpty(response.data.data)
            ? setEmployeeList([])
            : setEmployeeList(response.data.data);
        }
      })
      .catch((error) => {
        throw Error(error.message);
      });
  }, []);

  const handleEmployeeDelete = (employeeId: string) => {
    if (!_.isEmpty(employeeId) && !_.isUndefined(employeeId)) {
      dispatch(removeEmployee(employeeId) as any);
    }

    if (
      _.has(employeeData, "errorMessage") &&
      !_.isEmpty(employeeData.errorMessage)
    ) {
      toast.error(employeeData.errorMessage, {
        position: "bottom-right",
      });
    }

    if (
      _.has(employeeData, "employee.message") &&
      !_.isEmpty(employeeData.employee)
    ) {
      const createdResponse = employeeData.employee;
      toast.success(createdResponse.message, { position: "bottom-right" });
    }
  };

  const handleOnSearchClick = () => {
    if (_.isUndefined(searchValue) || _.isEmpty(searchValue)) {
      dispatch(loadAllEmployees() as any);
    } else {
      dispatch(
        searchAndSortEmployee(searchValue, employeeList, "search") as any
      );
    }
  };

  const handleOnSortClick = () => {
    sortOrder == "sort" ? setSortOrder("disorder") : setSortOrder("sort");
    if (!_.isEmpty(employeeList) && !_.isUndefined(employeeList)) {
      dispatch(
        searchAndSortEmployee("", employeeList, "sort", sortOrder) as any
      );
    }
  };

  return (
    <Container maxWidth="lg">
      <Card sx={{ p: 10, mb: 10, marginTop: 2, position: "relative" }}>
        <ButtonGrid
          viewShift={viewShift}
          viewShiftOnclick={() =>
            viewShift == "grid" ? setViewShift("list") : setViewShift("grid")
          }
          redirectLink="/employee-add"
          searchOptionData={employeeList}
          searchOnChange={(
            event: React.SyntheticEvent<Element, Event>,
            value: NonNullable<string | EmployeeType> | null,
            reason: AutocompleteChangeReason,
            details?: AutocompleteChangeDetails<any> | undefined
          ) => setSearchValue(value)}
          searchOnClick={handleOnSearchClick}
          searchValue={searchValue}
          onSearchRefresh={() => dispatch(loadAllEmployees() as any)}
          sortShift={sortOrder}
          sortShiftOnclick={handleOnSortClick}
        />
        {employeeData.isLoading ||
        _.isEmpty(employeeData.employees) ||
        _.isNull(employeeData.employees) ? (
          <CircularProgress
            style={{
              marginLeft: "50%",
              marginTop: "10%",
            }}
          />
        ) : (
          <>
            {viewShift == "grid" ? (
              <EmployeeGrid
                gridData={employeeData.employees}
                gridDir={"row"}
                handleEmployeeDelete={handleEmployeeDelete}
              />
            ) : (
              <EmployeeTable
                handleEmployeeDelete={handleEmployeeDelete}
                tableData={employeeData.employees}
                tableHeadings={employeeTableHeadings}
              />
            )}
          </>
        )}
      </Card>
    </Container>
  );
};

export default EmployeeDataView;
