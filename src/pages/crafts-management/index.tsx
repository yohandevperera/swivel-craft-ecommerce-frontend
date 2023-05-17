import { FormikHelpers } from "formik";
import FormContainer from "../../components/templates/form-container";
import craftfeildData from "../../utils/form-feilds/crafts-form-feilds.json";
import { useSelector } from "react-redux";
import { validationSchema } from "../../validations/craft-form-validations";
import { useDispatch } from "react-redux";
import {
  createCrafts,
  loadAllCrafts,
  removecraft,
} from "../../redux/thunks/crafts-thunk";
import _ from "lodash";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect, useState } from "react";
import { getAllCrafts } from "../../services/crafts";
import { CraftType } from "../../services/crafts";

/**
 * Usage - This component will directly call the PageHelmet, Header and CraftDataView components.
 *
 * Description - The component is build based on custom components
 *
 */

const CraftCategoryManagement: React.FC = () => {
  const dispatch = useDispatch();

  const { imageUploader, crudOperations } = useSelector((state: any) => state);
  const [searchValue, setSearchValue] = useState<string>("");
  const [craftsList, setCraftsList] = useState<CraftType[]>([]);

  const initialValues = {
    name: "",
    categoryId: "",
    description: "",
    qty: "",
    price: "",
  };

  const onFormSubmit = async (values: any, helpers: FormikHelpers<any>) => {
    if (_.isEmpty(imageUploader.imageBase64)) {
      toast.error("Image not uploaded", { position: "bottom-right" });
    }
    values = {
      ...values,
      photo: imageUploader.imageBase64,
    };
    dispatch(createCrafts(values) as any);
  };

  useEffect(() => {
    dispatch(loadAllCrafts() as any);
  }, [dispatch]);

  useEffect(() => {
    getAllCrafts()
      .then((response) => {
        if (_.has(response, "data.data")) {
          _.isEmpty(response.data.data)
            ? setCraftsList([])
            : setCraftsList(response.data.data);
        }
      })
      .catch((error: any) => {
        throw Error(error.message);
      });
  }, []);

  console.log(craftsList);

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

  // console.log(crudOperations);

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
        onSearchRefresh={() => {}}
        searchOnChange={(
          event: React.SyntheticEvent<Element, Event>,
          value: string
        ) => setSearchValue(value)}
        searchOnClick={() => console.log(searchValue)}
        searchOptionData={craftsList}
        searchValue={searchValue}
        tableData={crudOperations.dataSet}
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
        formType="add"
      />
    </>
  );
};

export default CraftCategoryManagement;
