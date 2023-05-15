import { FormikHelpers } from "formik";
import FormContainer from "../../components/templates/form-container";
import craftfeildData from "../../utils/form-feilds/crafts-form-feilds.json";
import { useSelector } from "react-redux";
import { validationSchema } from "../../validations/craft-form-validations";
import { useDispatch } from "react-redux";
import { createCrafts, loadAllCrafts } from "../../redux/thunks/crafts-thunk";
import _ from "lodash";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect } from "react";

/**
 * Usage - This component will directly call the PageHelmet, Header and CraftDataView components.
 *
 * Description - The component is build based on custom components
 *
 */

const CraftCategoryManagement: React.FC = () => {
  const dispatch = useDispatch();

  const { imageUploader, crudOperations } = useSelector((state: any) => state);

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

  const handleDeleteCrafts = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // todo - if no extras handle the response

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const craft: any = {
      id: String(formData.get("txtExtraDescription")),
      name: String(formData.get("txtBoosterSeats")),
      lastName: String(formData.get("txtBabySeats")),
    };
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

  return (
    <>
      <ToastContainer />
      <FormContainer
        addButtonText="Add Craft"
        navBarTitleText="Crafts Management"
        formFeildData={craftfeildData}
        formIntialValues={initialValues}
        formValidationSchema={validationSchema}
        handleDelete={() => {}}
        onFormSubmit={onFormSubmit}
        onSearchRefresh={() => {}}
        searchOnChange={() => {}}
        searchOnClick={() => {}}
        searchOptionData={[]}
        searchValue=""
        tableData={crudOperations.dataSet}
        tableHeadings={[
          "Name",
          "Category Name",
          "Description",
          "Price",
          "Qty",
          "Photo",
        ]}
        tableDataKeys={[
          "name",
          "categoryName",
          "description",
          "price",
          "qty",
          "photo",
        ]}
        titleKey="Craft"
        formType="add"
      />
    </>
  );
};

export default CraftCategoryManagement;
