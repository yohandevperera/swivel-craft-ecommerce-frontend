import GlobalIconButton from "../../atoms/icon-button";
import TocIcon from "@mui/icons-material/Toc";
import GlobalButton from "../../atoms/button";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { NavLink as RouterLink } from "react-router-dom";
import SearchFeild from "../../atoms/search-feild";
import { EmployeeType } from "../../../services/employee";
import TableRowsIcon from "@mui/icons-material/TableRows";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";

const ButtonGrid: React.FC<{
  viewShift: "grid" | "list";
  viewShiftOnclick: React.MouseEventHandler<HTMLDivElement>;
  redirectLink: string;
  searchOptionData: EmployeeType[];
  searchValue: NonNullable<string | EmployeeType> | null;
  searchOnClick: React.MouseEventHandler<HTMLButtonElement>;
  searchOnChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: NonNullable<string | EmployeeType> | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined
  ) => void;
  onSearchRefresh: React.MouseEventHandler<HTMLDivElement>;
  sortShift: "sort" | "disorder";
  sortShiftOnclick: React.MouseEventHandler<HTMLDivElement>;
}> = (props) => {
  return (
    <>
      <SearchFeild
        disableClearable={true}
        id="employee-search"
        optionsData={props.searchOptionData}
        searchOnChange={props.searchOnChange}
        style={{ float: "left", width: "30%", marginBottom: 10 }}
        searchLabel="Search employee by firstname"
        searchButtonText="Search"
        searchButtonOnClick={props.searchOnClick}
        searchValue={props.searchValue}
        onSearchRefresh={props.onSearchRefresh}
      />
      <GlobalIconButton
        color="primary"
        divStyle={{  }}
        icon={
          props.sortShift == "disorder" ? (
            <SortByAlphaIcon />
          ) : (
            <TableRowsIcon />
          )
        }
        isButtonDisabled={true}
        divOnClick={props.sortShiftOnclick}
      />
      <GlobalIconButton
        color="primary"
        divStyle={{ float: "right" }}
        icon={props.viewShift == "grid" ? <TocIcon /> : <ViewModuleIcon />}
        isButtonDisabled={true}
        divOnClick={props.viewShiftOnclick}
      />
      <GlobalButton
        buttonStyle={{ float: "right" }}
        buttonText={"Add Employee"}
        disableButtonRipple={false}
        component={RouterLink}
        redirectLink={props.redirectLink}
      />
    </>
  );
};

export default ButtonGrid;
