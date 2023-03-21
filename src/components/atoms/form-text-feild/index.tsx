import { TextField } from "@mui/material";
import { Field, ErrorMessage } from "formik";

/**
 * Usage - This component can be used as a
 * global form text feild.
 *
 * Description - The component is build based on the material UI textFeild and formik feild
 *
 * @props id @typedef string
 * @props name @typedef string
 * @props label @typedef string
 * @props isRequired @typedef boolean
 * @props type @typedef React.InputHTMLAttributes<unknown>["type"]
 */

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
      helperText={
        <ErrorMessage
          render={(message) => <div style={{ color: "red" }}>{message}</div>}
          name={props.name}
        />
      }
      type={props.type}
    />
  </>
);

export default FormFeild;
