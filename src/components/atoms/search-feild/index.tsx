import TextField from "@mui/material/TextField";
import { EmployeeType } from "../../../services/employee";
import * as React from "react";
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";

interface SearchFeildProps {
  disableClearable: boolean;
  optionsData: EmployeeType[];
  textOnChange?: (event: any) => void;
  id: string;
  style: React.CSSProperties;
  searchLabel: string;
  searchButtonText: string;
  searchButtonOnClick: React.MouseEventHandler<HTMLButtonElement>;
  searchValue: any;
  searchOnChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: NonNullable<string | EmployeeType> | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined
  ) => void;
  onSearchRefresh: React.MouseEventHandler<HTMLDivElement>;
}

const SearchFeild: React.FC<SearchFeildProps> = (props) => {
  return (
    <>
      <Autocomplete
        freeSolo
        id={props.id}
        disableClearable={props.disableClearable}
        options={props.optionsData.map(
          (employee: EmployeeType) => employee.firstname
        )}
        onChange={props.searchOnChange}
        style={props.style}
        size={"small"}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.searchLabel}
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
            onChange={props.textOnChange}
          />
        )}
      />
      <Button
        onClick={props.searchButtonOnClick}
        variant="contained"
        style={{ marginLeft: 10 }}
      >
        {props.searchButtonText}
      </Button>
      <div onClick={props.onSearchRefresh}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <RefreshIcon />
        </IconButton>
      </div>
    </>
  );
};

export default SearchFeild;
