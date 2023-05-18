import TextField from "@mui/material/TextField";
import * as React from "react";
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Tooltip } from "@mui/material";

/**
 * Usage - This component can be used as a global search feild.
 *
 * Description - The component is build based on the material UI Autocomplete
 *
 * @props disableClearable @typedef boolean
 * @props optionsData @typedef any[]
 * @props textOnChange @typedef function
 * @props id @typedef string
 * @props style @typedef React.CSSProperties
 * @props searchLabel @typedef string
 * @props searchButtonText @typedef string
 * @props searchButtonOnClick @typedef React.MouseEventHandler<HTMLButtonElement>
 * @props searchValue @typedef any
 * @props searchOnChange @typedef function
 * @props onSearchRefresh @typedef function
 */

interface SearchFeildProps {
  disableClearable: boolean;
  optionsData: any[];
  textOnChange?: (event: any) => void;
  id: string;
  style: React.CSSProperties;
  searchLabel: string;
  searchButtonText: string;
  searchButtonOnClick: React.MouseEventHandler<HTMLButtonElement>;
  searchValue: any;
  searchOnChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: NonNullable<string> | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined
  ) => void;
  onSearchRefresh: React.MouseEventHandler<HTMLDivElement>;
  sortComponent?: React.ReactNode;
}

const SearchFeild: React.FC<SearchFeildProps> = (props) => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <div style={{ width: 300,  }}>
          <Autocomplete
            freeSolo
            id={props.id}
            disableClearable={props.disableClearable}
            options={props.optionsData}
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
        </div>
        <div style={{ marginLeft: 220 }}>
          <div
            style={{
              display: "flex",
            }}
          >
            <div style={{ flex: "0 0 15%" }}>
              <Button onClick={props.searchButtonOnClick} variant="contained">
                {props.searchButtonText}
              </Button>
            </div>
            <div style={{ flex: "0 0 7%" }}>
              <Tooltip title="Refresh">
                <div onClick={props.onSearchRefresh}>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <RefreshIcon />
                  </IconButton>
                </div>
              </Tooltip>
            </div>
            <div style={{ flex: 1 }}>{props.sortComponent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFeild;
