import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import FormFeilds from "../../molecules/form-feilds";
import feildData from "../../../utils/form-feilds.json";
import _ from "lodash";
import { employeeValidationSchema } from "../../../validations/employee-form-validations";
import { EmployeeType } from "../../../services/employee";

/**
 * Usage - This component is used to build the add and edit form.
 *
 * Description - The component is build based on the Material Ui components
 *
 * @props type @typedef enum
 * @props onFormSubmit @typedef function
 * @props formRef @typedef React.RefObject<FormikProps<any>>
 */

interface EmployeeFormProps {
  type: "edit" | "add";
  onFormSubmit: (
    values: Omit<EmployeeType, "photo" | "_id">,
    helpers: FormikHelpers<Omit<EmployeeType, "_id" | "photo">>
  ) => void | Promise<any>;
  formRef?: React.RefObject<FormikProps<any>>;
}

const EmployeeForm: React.FC<EmployeeFormProps> = (props) => {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
  };

  return (
    <>
      <Card
        sx={{
          p: 1,
          mb: 50,
          width: "40%",
          position: "absolute",
          top: "24%",
          left: "50%",
          margin: "-70px 0 0 -300px",
        }}
        title="Add Employee"
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.type == "add" ? "Add Employee" : "Edit Employee"}
          </Typography>
          <Box>
            <Formik
              onSubmit={props.onFormSubmit}
              initialValues={initialValues}
              validationSchema={employeeValidationSchema}
              enableReinitialize
              innerRef={props.formRef}
            >
              <Form>
                <FormFeilds feilds={feildData} />
                <Button type="submit" variant="contained" color="primary">
                  {props.type == "add" ? "Add Employee" : "Edit Employee"}
                </Button>
              </Form>
            </Formik>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default EmployeeForm;
