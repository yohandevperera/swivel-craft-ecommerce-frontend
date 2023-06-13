import React from "react";
import Sidebar from "../../atoms/sidebar";
import { NavItems } from "../../../utils/admin-navitems";
import ContentNavBar from "../../molecules/content-navbar";
import DataTable from "../../organisms/data-table";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Button,
} from "@mui/material";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import FormFeilds from "../../molecules/form-feilds";

/**
 * Usage - This component can be used as a global form container which is used in the admin dashboard.
 *
 * Description - The component is build based on the material UI and custom components
 *
 * Form manipulation props
 *
 * @props formType @typedef "add" | "edit"
 * @props formRef @typedef React.RefObject<FormikProps<any>>;
 * @props onFormSubmit @typedef function
 * @props formFeildData @typedef any
 * @props formIntialValues @typedef any
 * @props formValidationSchema @typedef any
 *
 * Datatable manipulation props
 *
 * @props tableHeadings @typedef string[]
 * @props tableData @typedef any[]
 * @props handleDelete @typedef function
 *
 * Content Navabar manipulation props
 *
 * @props onSearchRefresh @typedef React.MouseEventHandler<HTMLDivElement>
 * @props searchOnChange @typedef function
 * @props searchOnClick @typedef React.MouseEventHandler<HTMLButtonElement>
 * @props searchOptionData @typedef any[]
 * @props searchValue @typedef string
 * @props addButtonText @typedef string
 * @props navBarTitleText @typedef string
 * @props titleKey @typedef string
 * @props handleOpenEdit @typedef function
 * @props setOpenAddFormDialog @typedef React.Dispatch<React.SetStateAction<boolean>>
 * @props openAddFormDialog @typedef boolean
 */

interface FormContainerProps {
  // formProps
  formType: "add" | "edit";
  formRef?: React.RefObject<FormikProps<any>>;
  onFormSubmit: (
    values: any,
    helpers: FormikHelpers<any>
  ) => void | Promise<any>;
  formFeildData: any;
  formIntialValues: any;
  formValidationSchema: any;

  // Datatable props
  tableHeadings: string[];
  tableData: any[];
  handleDelete: (id: string) => void;

  // Content Navbar props
  onSearchRefresh: React.MouseEventHandler<HTMLDivElement>;
  searchOnChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined
  ) => any;
  searchOnClick: React.MouseEventHandler<HTMLButtonElement>;
  searchOptionData: any[];
  searchValue: string;
  addButtonText: string;
  navBarTitleText: string;
  titleKey: string;
  handleOpenEdit: (id: string) => void;
  setOpenAddFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openAddFormDialog: boolean;
}

const FormContainer: React.FC<FormContainerProps> = (props) => {
  return (
    <>
      <Sidebar
        appBarTitle="Craft E-Commerce Admin Dashboard"
        routes={NavItems}
      />
      <div>
        <ContentNavBar
          onSearchRefresh={props.onSearchRefresh}
          searchOnChange={props.searchOnChange}
          searchOnClick={props.searchOnClick}
          searchOptionData={props.searchOptionData}
          searchValue={props.searchValue}
          addButtonText={props.addButtonText}
          navBarTitleText={props.navBarTitleText}
          addButtonOnClick={() => props.setOpenAddFormDialog(true)}
        />
        <DataTable
          tableHeadings={props.tableHeadings}
          handleDelete={props.handleDelete}
          tableData={props.tableData}
          handleOpenEdit={props.handleOpenEdit}
        />
      </div>

      <Dialog
        open={props.openAddFormDialog}
        onClose={() => props.setOpenAddFormDialog(false)}
      >
        <DialogTitle>
          {props.formType === "add"
            ? `Add ${props.titleKey}`
            : `Edit ${props.titleKey}`}
        </DialogTitle>
        <Formik
          onSubmit={props.onFormSubmit}
          initialValues={props.formIntialValues}
          validationSchema={props.formValidationSchema}
          enableReinitialize
          innerRef={props.formRef}
        >
          <Form>
            <DialogContent>
              <FormFeilds feilds={props.formFeildData} />
            </DialogContent>
            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
                {props.formType === "add"
                  ? `Add ${props.titleKey}`
                  : `Edit ${props.titleKey}`}
              </Button>
              <Button onClick={() => props.setOpenAddFormDialog(false)}>
                Cancel
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </>
  );
};

export default FormContainer;
