import _ from "lodash";
import * as Yup from "yup";

/**
 *
 * Description & Usage  - This file willhandle all the
 * form validations using yup and the created dynamic feild list
 *
 */

/**
 *
 * Description - The map that will validate the
 * form feilds according to its feild type
 *
 */

/**
 * Description - Restructuring the feild validation
 * map
 *
 */

export const toValidateFeilds = (formFeilds: any[]) => {
  let mappedformValidations = {};
  const formValidationsFeilds: any = formFeilds.map((feild) => {
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
            [feild.name]: Yup.string()
              .typeError("Enter a valid phone number")
              .required("This feild is required"),
          };
        case "options":
          return {
            [feild.name]: Yup.string().required("This feild is required"),
          };
        case "password":
          return {
            [feild.name]: Yup.string()
              .min(6, "The entered value is short")
              .max(10, "The entered value is too long")
              .required("This feild is required"),
          };
        default:
          return {};
      }
    } else {
      return {};
    }
  });
  formValidationsFeilds.forEach((value: any) => {
    const validationKeys = Object.keys(value);
    mappedformValidations = {
      [validationKeys[0]]: value[validationKeys[0]],
      ...mappedformValidations,
    };
  });
  return Yup.object().shape(mappedformValidations);
};

/**
 * Description - structuring and shaping the feild validation
 * map as a Yup object
 *
 */
