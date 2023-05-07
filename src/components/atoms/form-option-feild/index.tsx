import { Field, ErrorMessage } from "formik";
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import _ from "lodash";

/**
 * Usage - This component can be used as a 
 * global form option feild.
 *
 * Description - The component is build based on the material UI option and formik option
 * 
 * @props id @typedef string
 * @props name @typedef string
 * @props label @typedef string
 * @props isRequired @typedef boolean
 * @props type @typedef React.InputHTMLAttributes<unknown>["type"]
 * @props valuesAndLabels @typedef any[]
 */

interface FormOptionFeildProps {
  id: string;
  name: string;
  label: string;
  isRequired?: boolean;
  type?: React.InputHTMLAttributes<unknown>["type"];
  valuesAndLabels?: any[];
}

const FormOptionFeild: React.FC<FormOptionFeildProps> = (props) => (
  <>
    <FormControl fullWidth margin="normal">
      <InputLabel id={props.id}>{props.label}</InputLabel>
      <Field
        key={props.id}
        id={props.id}
        name={props.name}
        label={props.label}
        as={Select}
      >
        {!_.isUndefined(props.valuesAndLabels) ? (
          props.valuesAndLabels.map((item) => (
            <MenuItem value={item.value}>{item.name}</MenuItem>
          ))
        ) : (
          <CircularProgress />
        )}
      </Field>
      <FormHelperText>
        <ErrorMessage name={props.name} />
      </FormHelperText>
    </FormControl>
  </>
);

export default FormOptionFeild;
