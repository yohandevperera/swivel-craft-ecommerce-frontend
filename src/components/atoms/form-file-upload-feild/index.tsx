import { TextField } from "@mui/material";
import { Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { getAndSetImageBase64 } from "../../../redux/thunks/image-view-uploader-thunk";

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

const FormFileUploadFeild: React.FC<FormFeildProps> = (props) => {
  const dispatch = useDispatch();

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
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
        onChange={async (e: any) => {
          e.preventDefault();
          const file = e.target.files[0];
          const base64 = await convertBase64(file);
          dispatch(getAndSetImageBase64(base64) as any);
        }}
      />
    </>
  );
};

export default FormFileUploadFeild;
