import React, { useState } from "react";
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
import FormFeilds, { formFeildType } from "../../molecules/form-feilds";

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
}

const FormContainer: React.FC<FormContainerProps> = (props) => {
  const [openAddFormDialog, setOpenAddFormDialog] = useState<boolean>(false);

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
          addButtonOnClick={() => setOpenAddFormDialog(true)}
        />
        <DataTable
          tableHeadings={props.tableHeadings}
          handleDelete={props.handleDelete}
          tableData={props.tableData}
        />
      </div>

      <Dialog
        open={openAddFormDialog}
        onClose={() => setOpenAddFormDialog(false)}
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
              <Button onClick={() => setOpenAddFormDialog(false)}>
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
