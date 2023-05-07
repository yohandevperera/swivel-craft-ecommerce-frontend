import _ from "lodash";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FormFeild from "../../atoms/form-text-feild";
import FormOptionFeild from "../../atoms/form-option-feild";

/**
 * Usage - This component is used as a dynamic form feild mapper.
 *
 * Description - The component is build based on the react custom components
 *
 * @props id @typedef string
 * @props name @typedef string
 * @props label @typedef string
 * @props type @typedef function
 * @props required @typedef boolean
 * @props validate @typedef boolean
 * @props valuesAndLabels @typedef any[]
 */

export type formFeildType = {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  validate: boolean;
  valuesAndLabels?: any[];
};

const FormFeilds: React.FC<{ feilds: formFeildType[] }> = (props) => {
  if (!_.isEmpty(props.feilds) || !_.isUndefined(props.feilds)) {
    const feilds: any = props.feilds.map((feild, index: number) => {
      if (!_.isEmpty(feild.type)) {
        switch (feild.type) {
          case "text":
            return <FormFeild {...feild} key={index} />;
          case "email":
            return <FormFeild {...feild} key={index} />;
          case "number":
            return <FormFeild {...feild} key={index} />;
          case "options":
            return <FormOptionFeild {...feild} />;
          default:
            return <></>;
        }
      }
      return <></>
    });
    return feilds;
  } else {
    return <CircularProgress />;
  }
};

export default FormFeilds;
