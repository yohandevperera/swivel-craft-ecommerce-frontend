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
import { invoke } from "../../../utils/api-adapter";
import { useEffect, useState } from "react";

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
  optionType: "default" | "api-option";
  optionKeys?: any;
  route?: any;
}

const RenderFormOptionFeildForType: React.FC<FormOptionFeildProps> = (
  props
) => {
  const [responseOptions, setResponseOptions] = useState<any[]>([]);

  useEffect(() => {
    const getResponseOptions = async () => {
      const response = await invoke(props.route, "get", {});
      if (!_.isEmpty(response.data) && !_.isEmpty(response.data.data)) {
        setResponseOptions(response.data.data);
      }
    };
    getResponseOptions();
  }, [props.route]);

  switch (props.optionType) {
    case "default":
      return (
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
      );
    case "api-option":
      return (
        <Field
          key={props.id}
          id={props.id}
          name={props.name}
          label={props.label}
          as={Select}
        >
          {!_.isUndefined(responseOptions) ? (
            responseOptions.map((item) => (
              <MenuItem value={item[props.optionKeys.valueKey]}>
                {item[props.optionKeys.nameKey]}
              </MenuItem>
            ))
          ) : (
            <CircularProgress />
          )}
        </Field>
      );
    default:
      return <></>;
  }
};

const FormOptionFeild: React.FC<FormOptionFeildProps> = (props) => (
  <>
    <FormControl fullWidth margin="normal">
      <InputLabel id={props.id}>{props.label}</InputLabel>
      <RenderFormOptionFeildForType {...props} />
      <FormHelperText>
        <ErrorMessage name={props.name} />
      </FormHelperText>
    </FormControl>
  </>
);

export default FormOptionFeild;
