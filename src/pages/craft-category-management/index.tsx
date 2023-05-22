import { FormikHelpers, FormikProps } from "formik";
import FormContainer from "../../components/templates/form-container";
import craftCategoryfeildData from "../../utils/form-feilds/crafts-category-form-feilds.json";
import { useSelector } from "react-redux";
import { validationSchema } from "../../validations/form-validations";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect, useRef, useState } from "react";
import {
  createCraftCategories,
  removeCraftCategory,
  searchCrafts,
  loadAllCraftsCategories,
  editCraftCategories,
} from "../../redux/thunks/craft-category-thunk";
import {
  getAllCraftCategories,
  getCraftCategory,
} from "../../services/craft-categories";

/**
 * Usage - This component will directly call the PageHelmet, Header and CraftDataView components.
 *
 * Description - The component is build based on custom components
 *
 */

const CraftCategoryManagement: React.FC = () => {
  const dispatch = useDispatch();

  const { crudOperations } = useSelector((state: any) => state);
  const [searchValue, setSearchValue] = useState<any>("");
  const [craftCategoriesList, setCraftCategoriesList] = useState<any[]>([]);
  const [openAddFormDialog, setOpenAddFormDialog] = useState<boolean>(false);
  const [craftCategoryId, setCraftCategoryId] = useState<string>("");
  const formRef = useRef<FormikProps<any>>(null);

  const initialValues = {
    name: "",
  };

  const onFormSubmit = async (values: any, helpers: FormikHelpers<any>) => {
    dispatch(createCraftCategories(values) as any);

    if (!_.isEmpty(craftCategoryId) && !_.isUndefined(craftCategoryId)) {
      dispatch(editCraftCategories(values, craftCategoryId) as any);
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
    dispatch(loadAllCraftsCategories() as any);
  }, [dispatch]);

  useEffect(() => {
    getAllCraftCategories()
      .then((response) => {
        if (_.has(response, "data.data")) {
          const craftCategories: any[] = response.data.data;
          const optionCraftCategories = craftCategories.map((craft) => ({
            value: craft._id,
            label: craft.name,
          }));
          _.isEmpty(optionCraftCategories)
            ? setCraftCategoriesList([])
            : setCraftCategoriesList(optionCraftCategories);
        }
      })
      .catch((error: any) => {
        throw Error(error.message);
      });
  }, []);

  const handleDelete = (id: string) => {
    if (!_.isEmpty(id) && !_.isUndefined(id)) {
      dispatch(removeCraftCategory(id) as any);
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
      dispatch(loadAllCraftsCategories() as any);
    } else {
      dispatch(searchCrafts(searchValue.label) as any);
    }
  };

  const handleOpenEdit = (id: string) => {
    !_.isEmpty(id) || !_.isUndefined(id)
      ? setCraftCategoryId(id)
      : setCraftCategoryId("");
    setOpenAddFormDialog(true);
  };

  useEffect(() => {
    if (!_.isEmpty(craftCategoryId) || !_.isUndefined(craftCategoryId)) {
      getCraftCategory(craftCategoryId).then((response) => {
        let data = response.data.data;
        const feildNames = Object.keys(data || {});
        if (!_.isEmpty(feildNames)) {
          feildNames.map((feildName: string) => {
            formRef.current?.setFieldValue(feildName, data[feildName], false);
          });
        }
      });
    }
  }, [craftCategoryId]);

  return (
    <>
      <ToastContainer />
      <FormContainer
        addButtonText="Add Craft Category"
        navBarTitleText="Craft Category Management"
        formFeildData={craftCategoryfeildData}
        formIntialValues={initialValues}
        formValidationSchema={validationSchema}
        handleDelete={handleDelete}
        onFormSubmit={onFormSubmit}
        onSearchRefresh={() => dispatch(loadAllCraftsCategories() as any)}
        searchOnClick={handleOnSearchClick}
        searchOptionData={craftCategoriesList}
        searchValue={searchValue}
        tableData={crudOperations.dataSet}
        searchOnChange={(
          event: React.SyntheticEvent<Element, Event>,
          value: string
        ) => setSearchValue(value)}
        tableHeadings={["Name"]}
        titleKey="Craft Category"
        formType={
          _.isEmpty(craftCategoryId) || _.isUndefined(craftCategoryId)
            ? "add"
            : "edit"
        }
        handleOpenEdit={handleOpenEdit}
        setOpenAddFormDialog={setOpenAddFormDialog}
        openAddFormDialog={openAddFormDialog}
        formRef={formRef}
      />
    </>
  );
};

export default CraftCategoryManagement;
