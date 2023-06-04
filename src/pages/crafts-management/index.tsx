import { FormikHelpers, FormikProps } from "formik";
import FormContainer from "../../components/templates/form-container";
import craftfeildData from "../../utils/form-feilds/crafts-form-feilds.json";
import { useSelector } from "react-redux";
import { toValidateFeilds } from "../../validations/form-validations";
import { useDispatch } from "react-redux";
import {
  createCrafts,
  loadAllCrafts,
  removecraft,
  searchCrafts,
  editCrafts,
} from "../../redux/thunks/crafts-thunk";
import _ from "lodash";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect, useRef, useState } from "react";
import { getAllCrafts, getCraft } from "../../services/crafts";
import * as Yup from "yup";

/**
 * Usage - This component will directly call the PageHelmet, Header and CraftDataView components.
 *
 * Description - The component is build based on custom components
 *
 */

const CraftManagement: React.FC = () => {
  const dispatch = useDispatch();

  const { imageUploader, crudOperations } = useSelector((state: any) => state);
  const [searchValue, setSearchValue] = useState<any>("");
  const [craftsList, setCraftsList] = useState<any[]>([]);
  const [craftId, setCraftId] = useState<string>("");
  const [openAddFormDialog, setOpenAddFormDialog] = useState<boolean>(false);
  const [validationSchema, setValidationSchema] =
    useState<Yup.ObjectSchema<{}, Yup.AnyObject, {}, "">>();
  const formRef = useRef<FormikProps<any>>(null);

  const initialValues = {
    name: "",
    categoryId: "",
    description: "",
    qty: "",
    price: "",
  };

  useEffect(() => setValidationSchema(toValidateFeilds(craftfeildData)));

  const onFormSubmit = async (values: any, helpers: FormikHelpers<any>) => {
    if (_.isEmpty(imageUploader.imageBase64)) {
      toast.error("Image not uploaded", { position: "bottom-right" });
    }
    values = {
      ...values,
      photo: imageUploader.imageBase64,
    };
    dispatch(createCrafts(values) as any);

    if (!_.isEmpty(craftId) && !_.isUndefined(craftId)) {
      dispatch(editCrafts(values, craftId) as any);
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
    if (!_.isEmpty(craftId) || !_.isUndefined(craftId)) {
      getCraft(craftId).then((response) => {
        let data = response.data.data;
        const feildNames = Object.keys(data || {}).slice(1, -1);
        if (!_.isEmpty(feildNames)) {
          feildNames.map((feildName: string) => {
            data = {
              ...data,
              photo: "",
            };
            formRef.current?.setFieldValue(feildName, data[feildName], false);
          });
        }
      });
    }
  }, [craftId]);

  useEffect(() => {
    dispatch(loadAllCrafts() as any);
  }, [dispatch]);

  useEffect(() => {
    getAllCrafts()
      .then((response) => {
        if (_.has(response, "data.data")) {
          const crafts: any[] = response.data.data;
          const optionCrafts = crafts.map((craft) => ({
            value: craft._id,
            label: craft.name,
          }));
          _.isEmpty(optionCrafts)
            ? setCraftsList([])
            : setCraftsList(optionCrafts);
        }
      })
      .catch((error: any) => {
        throw Error(error.message);
      });
  }, []);

  const handleDelete = (id: string) => {
    if (!_.isEmpty(id) && !_.isUndefined(id)) {
      dispatch(removecraft(id) as any);
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
      dispatch(loadAllCrafts() as any);
    } else {
      dispatch(searchCrafts(searchValue.label) as any);
    }
  };

  const handleOpenEdit = (id: string) => {
    !_.isEmpty(id) || !_.isUndefined(id) ? setCraftId(id) : setCraftId("");
    setOpenAddFormDialog(true);
  };

  return (
    <>
      <ToastContainer />
      <FormContainer
        addButtonText="Add Craft"
        navBarTitleText="Crafts Management"
        formFeildData={craftfeildData}
        formIntialValues={initialValues}
        formValidationSchema={validationSchema}
        handleDelete={handleDelete}
        onFormSubmit={onFormSubmit}
        onSearchRefresh={() => dispatch(loadAllCrafts() as any)}
        searchOnClick={handleOnSearchClick}
        searchOptionData={craftsList}
        searchValue={searchValue}
        tableData={crudOperations.dataSet}
        searchOnChange={(
          event: React.SyntheticEvent<Element, Event>,
          value: string
        ) => setSearchValue(value)}
        tableHeadings={[
          "Name",
          "Category Name",
          "Description",
          "Price",
          "Qty",
          "Photo",
          "Actions",
        ]}
        titleKey="Craft"
        formType={_.isEmpty(craftId) || _.isUndefined(craftId) ? "add" : "edit"}
        handleOpenEdit={handleOpenEdit}
        openAddFormDialog={openAddFormDialog}
        setOpenAddFormDialog={setOpenAddFormDialog}
        formRef={formRef}
      />
    </>
  );
};

export default CraftManagement;
