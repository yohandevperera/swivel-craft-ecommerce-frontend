import FormContainer from "../../components/templates/form-container";

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
      <FormContainer />
    </>
  );
};

export default CraftCategoryManagement;
