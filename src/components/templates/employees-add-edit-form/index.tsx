import EmployeeForm from "../../organisms/employee-form";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import PageHelmet from "../../atoms/helmet";
import Header from "../../atoms/header";
import { NavLink as RouterLink } from "react-router-dom";
import { useParams } from "react-router";
import { EmployeeType } from "../../../services/employee";
import { FormikHelpers, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect, useRef } from "react";
import {
  createAndEditEmployees,
  createAndEditEmployeeParams,
  getSingleEmployee,
} from "../../../redux/reducers/employees/employees-thunks";
import { useNavigate } from "react-router-dom";

/**
 * Usage - This component is used for to manipulate the add and edit operations of the employees.
 *
 * Description - The component is build based on the Material Ui components and custom components
 *
 * @props type @typedef enum
 */

const EmployeesAddEditForm: React.FC<{ type: "add" | "edit" }> = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const employeeAddEditedResponse = useSelector(
    (state: any) => state.employees
  );
  const formRef = useRef<FormikProps<any>>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.type == "edit") {
      dispatch(getSingleEmployee(id) as any);

      let employee = employeeAddEditedResponse.employee;
      const feildNames = Object.keys(employee || {}).slice(1, -1);
      if (!_.isEmpty(feildNames)) {
        feildNames.map((feildName: string) => {
          employee = {
            ...employee,
            phone: Number(employee["phone"]),
          };
          formRef.current?.setFieldValue(feildName, employee[feildName], false);
        });
      }
    }
  }, [employeeAddEditedResponse.employee, id]);

  const handleAddAndEditEmployees = (
    values: Omit<EmployeeType, "photo" | "_id">,
    helpers: FormikHelpers<Omit<EmployeeType, "photo" | "_id">>
  ) => {
    if (props.type == "add") {
      const employeeCreateParams: createAndEditEmployeeParams = {
        employee: values,
        type: "add",
      };
      dispatch(createAndEditEmployees(employeeCreateParams) as any);

      if (
        _.has(employeeAddEditedResponse, "errorMessage") &&
        !_.isEmpty(employeeAddEditedResponse.errorMessage)
      ) {
        toast.error(employeeAddEditedResponse.errorMessage, {
          position: "bottom-right",
        });
      }

      if (
        _.has(employeeAddEditedResponse, "employee.message") &&
        !_.isEmpty(employeeAddEditedResponse.employee)
      ) {
        const createdResponse = employeeAddEditedResponse.employee;
        toast.success(createdResponse.message, { position: "bottom-right" });
        navigate(0);
      }
    }
    if (props.type == "edit" && !_.isUndefined(id)) {
      const employeeEditParams: createAndEditEmployeeParams = {
        employee: values,
        type: "edit",
        employeeId: id,
      };
      dispatch(createAndEditEmployees(employeeEditParams) as any);
      if (
        _.has(employeeAddEditedResponse, "errorMessage") &&
        !_.isEmpty(employeeAddEditedResponse.errorMessage)
      ) {
        toast.error(employeeAddEditedResponse.errorMessage, {
          position: "bottom-right",
        });
      }

      if (
        _.has(employeeAddEditedResponse, "employee.message") &&
        !_.isEmpty(employeeAddEditedResponse.employee)
      ) {
        const createdResponse = employeeAddEditedResponse.employee;
        toast.success(createdResponse.message, { position: "bottom-right" });
        navigate(0);
      }
    }
  };
  return (
    <Box>
      <PageHelmet />
      <Header title="Employee Manager" />
      <ToastContainer />
      <Button
        variant="contained"
        disableRipple
        component={RouterLink}
        to={`/`}
        style={{ float: "right", marginTop: 10 }}
      >
        List View
      </Button>
      <EmployeeForm
        onFormSubmit={handleAddAndEditEmployees}
        type={props.type}
        formRef={formRef}
      />
    </Box>
  );
};

export default EmployeesAddEditForm;
