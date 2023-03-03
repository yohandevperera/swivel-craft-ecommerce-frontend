import Form from "../../components/templates/employees-add-edit-form";

const EmployeeForm: React.FC<{ type: "add" | "edit" }> = (props) => (
  <Form type={props.type} />
);

export default EmployeeForm;
