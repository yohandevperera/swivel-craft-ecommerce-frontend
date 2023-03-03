import _ from "lodash";
import * as Yup from "yup";
import formFeilds from "../utils/form-feilds.json";

const formValidations: any = formFeilds.map((feild) => {
  if (!_.isEmpty(feild) && !_.isEmpty(feild.type)) {
    switch (feild.type) {
      case "text":
        return {
          [feild.name]: Yup.string()
            .min(6, "The entered value is short")
            .max(10, "The entered value is too long")
            .required("This feild is required"),
        };
      case "email":
        return {
          [feild.name]: Yup.string()
            .email("Enter a valid email")
            .required("This feild is required"),
        };
      case "number":
        return {
          [feild.name]: Yup.number()
            .typeError("Enter a valid phone number")
            .required("This feild is required"),
        };
      case "options":
        return {
          [feild.name]: Yup.string().required("This feild is required"),
        };
      default:
        return {};
    }
  } else {
    return {};
  }
});

let mappedformValidations = {};
formValidations.forEach((value: any) => {
  const validationKeys = Object.keys(value);
  mappedformValidations = {
    [validationKeys[0]]: value[validationKeys[0]],
    ...mappedformValidations,
  };
});

export const employeeValidationSchema = Yup.object().shape(
  mappedformValidations
);

// {
//   firstname: Yup.string().min(6, "The entered value is short").required("Sdsd"),
//   lastname: Yup.string().required("Sdsd"),
// }
