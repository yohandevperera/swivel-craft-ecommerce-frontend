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
  editEmployees,
  createEmployees,
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
  const { employees } = useSelector((state: any) => state);
  const formRef = useRef<FormikProps<any>>(null);
  const navigate = useNavigate();

  useEffect(
    () => dispatch(getSingleEmployee(id) as any),
    [dispatch, props.type, id]
  );

  useEffect(() => {
    if (props.type === "edit") {
      let employee = employees.employee;
      const feildNames = Object.keys(employee || {}).slice(1, -1);
      if (!_.isEmpty(feildNames)) {
        feildNames.map((feildName: string) => {
          employee = {
            ...employee,
            phone: Number(employee["phone"]),
          };
          formRef.current?.setFieldValue(feildName, employee[feildName], false);
          return employee;
        });
      }
    }
  }, [employees.employee]);

  const notifyUser = () => {
    if (
      _.has(employees, "employee.message") &&
      !_.isEmpty(employees.employee)
    ) {
      const createdResponse = employees.employee;
      toast.success(createdResponse.message, { position: "bottom-right" });
    }
  };

  useEffect(() => notifyUser(), [employees, employees.employee]);

  const handleFormSubmit = (
    values: Omit<EmployeeType, "photo" | "_id">,
    helpers: FormikHelpers<Omit<EmployeeType, "photo" | "_id">>
  ) => {
    if (props.type === "add") {
      dispatch(createEmployees(values) as any);
    }
    if (props.type === "edit" && !_.isUndefined(id)) {
      dispatch(editEmployees(values, id) as any);
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
        onFormSubmit={handleFormSubmit}
        type={props.type}
        formRef={formRef}
      />
    </Box>
  );
};

export default EmployeesAddEditForm;
