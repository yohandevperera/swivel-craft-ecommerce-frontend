import Form from "../../components/templates/employees-add-edit-form";

/**
 * Usage - This component will directly call the Form template component.
 *
 * Description - The component is build based on custom components
 *
 */

const EmployeeForm: React.FC<{ type: "add" | "edit" }> = (props) => (
  <Form type={props.type} />
);

export default EmployeeForm;
