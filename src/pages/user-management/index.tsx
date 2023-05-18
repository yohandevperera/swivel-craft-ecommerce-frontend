import { FormikHelpers } from "formik";
import FormContainer from "../../components/templates/form-container";
import userfeildData from "../../utils/form-feilds/users-form-feilds.json";
import { useSelector } from "react-redux";
import { validationSchema } from "../../validations/form-validations";
import { useDispatch } from "react-redux";
import {
  createUsers,
  loadAllUsers,
  searchUsers,
  removeUser,
} from "../../redux/thunks/users-thunk";
import _ from "lodash";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users";

/**
 * Usage - This component will directly call the PageHelmet, Header and CraftDataView components.
 *
 * Description - The component is build based on custom components
 *
 */

const UserManagement: React.FC = () => {
  const dispatch = useDispatch();

  const { crudOperations } = useSelector((state: any) => state);
  const [searchValue, setSearchValue] = useState<any>("");
  const [usersList, setUsersList] = useState<any[]>([]);

  const initialValues = {
    firstname: "",
    email: "",
    phone: "",
    password: "",
  };

  const onFormSubmit = async (values: any, helpers: FormikHelpers<any>) => {
    console.log(values);
    dispatch(createUsers(values) as any);
  };

  useEffect(() => {
    dispatch(loadAllUsers() as any);
  }, [dispatch]);

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        if (_.has(response, "data.data")) {
          const users: any[] = response.data.data;
          const optionUsers = users.map((user) => ({
            value: user._id,
            label: user.name,
          }));
          _.isEmpty(optionUsers) ? setUsersList([]) : setUsersList(optionUsers);
        }
      })
      .catch((error: any) => {
        throw Error(error.message);
      });
  }, []);

  const handleDelete = (id: string) => {
    if (!_.isEmpty(id) && !_.isUndefined(id)) {
      dispatch(removeUser(id) as any);
    }
    if (
      _.has(crudOperations, "dataSet.message") &&
      !_.isEmpty(crudOperations.dataSet)
    ) {
      const createdResponse = crudOperations.dataSet;
      toast.success(createdResponse.message, { position: "bottom-right" });
    }
  };

  const notifyUser = () => {
    if (
      _.has(crudOperations, "dataSet.message") &&
      !_.isEmpty(crudOperations.dataSet)
    ) {
      const createdResponse = crudOperations.dataSet;
      toast.success(createdResponse.message, { position: "bottom-right" });
    }
  };

  useEffect(() => notifyUser(), [crudOperations, crudOperations.dataSet]);

  const handleOnSearchClick = () => {
    if (_.isUndefined(searchValue) || _.isEmpty(searchValue)) {
      dispatch(loadAllUsers() as any);
    } else {
      dispatch(searchUsers(searchValue.label) as any);
    }
  };

  return (
    <>
      <ToastContainer />
      <FormContainer
        addButtonText="Add User"
        navBarTitleText="Users Management"
        formFeildData={userfeildData}
        formIntialValues={initialValues}
        formValidationSchema={validationSchema}
        handleDelete={handleDelete}
        onFormSubmit={onFormSubmit}
        onSearchRefresh={() => dispatch(loadAllUsers() as any)}
        searchOnClick={handleOnSearchClick}
        searchOptionData={usersList}
        searchValue={searchValue}
        tableData={crudOperations.dataSet}
        searchOnChange={(
          event: React.SyntheticEvent<Element, Event>,
          value: string
        ) => setSearchValue(value)}
        tableHeadings={["First name", "Email", "Phone", "User Role"]}
        titleKey="User"
        formType="add"
      />
    </>
  );
};

export default UserManagement;
