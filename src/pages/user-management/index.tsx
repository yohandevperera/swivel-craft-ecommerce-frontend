import { FormikHelpers, FormikProps } from "formik";
import FormContainer from "../../components/templates/form-container";
import userfeildData from "../../utils/form-feilds/users-form-feilds.json";
import { useSelector } from "react-redux";
import { toValidateFeilds } from "../../validations/form-validations";
import { useDispatch } from "react-redux";
import {
  createUsers,
  loadAllUsers,
  searchUsers,
  removeUser,
  editUsers,
} from "../../redux/thunks/users-thunk";
import _ from "lodash";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect, useRef, useState } from "react";
import { getAllUsers, getUser } from "../../services/users";
import * as Yup from "yup";

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
  const [openAddFormDialog, setOpenAddFormDialog] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [validationSchema, setValidationSchema] =
    useState<Yup.ObjectSchema<{}, Yup.AnyObject, {}, "">>();

  const formRef = useRef<FormikProps<any>>(null);

  const initialValues = {
    firstname: "",
    email: "",
    phone: "",
    password: "",
  };

  useEffect(() => setValidationSchema(toValidateFeilds(userfeildData)));

  const onFormSubmit = async (values: any, helpers: FormikHelpers<any>) => {
    dispatch(createUsers(values, "management") as any);
    if (!_.isEmpty(userId) && !_.isUndefined(userId)) {
      dispatch(editUsers(values, userId) as any);
      if (
        _.has(crudOperations, "errorMessage") &&
        !_.isEmpty(crudOperations.errorMessage)
      ) {
        toast.error(crudOperations.errorMessage, {
          position: "bottom-right",
        });
      }

      if (
        _.has(crudOperations, "dataSet.message") &&
        !_.isEmpty(crudOperations.dataSet)
      ) {
        const createdResponse = crudOperations.dataSet;
        toast.success(createdResponse.message, { position: "bottom-right" });
      }
    }
  };

  useEffect(() => {
    if (!_.isEmpty(userId) || !_.isUndefined(userId)) {
      getUser(userId).then((response) => {
        let data = response.data.data;
        const feildNames = Object.keys(data || {});
        if (!_.isEmpty(feildNames)) {
          feildNames.map((feildName: string) => {
            data = {
              ...data,
              phone: Number(data["phone"]),
            };
            formRef.current?.setFieldValue(feildName, data[feildName], false);
          });
        }
      });
    }
  }, [userId]);

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

  const handleOpenEdit = (id: string) => {
    !_.isEmpty(id) || !_.isUndefined(id) ? setUserId(id) : setUserId("");
    setOpenAddFormDialog(true);
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
        tableHeadings={["First name", "Email", "Phone"]}
        titleKey="User"
        formType={_.isEmpty(userId) || _.isUndefined(userId) ? "add" : "edit"}
        handleOpenEdit={handleOpenEdit}
        setOpenAddFormDialog={setOpenAddFormDialog}
        openAddFormDialog={openAddFormDialog}
        formRef={formRef}
      />
    </>
  );
};

export default UserManagement;
