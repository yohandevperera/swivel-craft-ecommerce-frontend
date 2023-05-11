import { FormikHelpers } from "formik";
import FormContainer from "../../components/templates/form-container";
import craftfeildData from "../../utils/form-feilds/crafts-form-feilds.json";

/**
 * Usage - This component will directly call the PageHelmet, Header and CraftDataView components.
 *
 * Description - The component is build based on custom components
 *
 */

const CraftCategoryManagement: React.FC = () => {
  const handleAddCrafts = async (event: React.FormEvent<HTMLFormElement>) => {
    // todo - if no extras handle the response

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const craft: any = {
      id: String(formData.get("txtExtraDescription")),
      name: String(formData.get("txtBoosterSeats")),
      lastName: String(formData.get("txtBabySeats")),
    };
  };

  const handleEditCrafts = async (event: React.FormEvent<HTMLFormElement>) => {
    // todo - if no extras handle the response

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const craft: any = {
      id: String(formData.get("txtExtraDescription")),
      name: String(formData.get("txtBoosterSeats")),
      lastName: String(formData.get("txtBabySeats")),
    };
  };

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

  return (
    <>
      <FormContainer
        addButtonText="Add Craft"
        navBarTitleText="Crafts Management"
        formFeildData={craftfeildData}
        formIntialValues={[]}
        formValidationSchema={[]}
        handleDelete={() => {}}
        onFormSubmit={(values: any, helpers: FormikHelpers<any>) => {
          console.log(values);
        }}
        onSearchRefresh={() => {}}
        searchOnChange={() => {}}
        searchOnClick={() => {}}
        searchOptionData={[]}
        searchValue=""
        tableData={[]}
        tableHeadings={[""]}
        tableDataKeys={[]}
        titleKey="Craft"
        formType="add"
      />
    </>
  );
};

export default CraftCategoryManagement;
