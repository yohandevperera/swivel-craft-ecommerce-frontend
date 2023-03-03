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
