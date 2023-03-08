import { TextField } from "@mui/material";
import { Field, ErrorMessage } from "formik";

interface FormFeildProps {
  id: string;
  name: string;
  label: string;
  isRequired?: boolean;
  type?: React.InputHTMLAttributes<unknown>["type"];
}

const FormFeild: React.FC<FormFeildProps> = (props) => (
  <>
    <Field
      key={props.id}
      id={props.id}
      name={props.name}
      label={props.label}
      fullWidth
      margin={"normal"}
      as={TextField}
      helperText={<ErrorMessage name={props.name} />}
      type={props.type}
    />
  </>
);

export default FormFeild;
