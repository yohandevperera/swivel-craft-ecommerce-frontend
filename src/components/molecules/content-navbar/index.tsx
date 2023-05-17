import SearchFeild from "../../atoms/search-feild";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import { Button, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

/**
 * Usage - This component is used as a button grid which includes a combination of the
 * custom created global button, icon button, material buttons and the custom search feild.
 *
 * Description - The component is build based on the material UI button and custom components
 *
 * @props searchOptionData @typedef any[]
 * @props searchValue @typedef string
 * @props searchOnClick @typedef React.MouseEventHandler<HTMLButtonElement>
 * @props searchOnChange @typedef function
 * @props onSearchRefresh @typedef React.MouseEventHandler<HTMLDivElement>
 */

interface ContentNavBarProps {
  searchOptionData: any[];
  searchValue: NonNullable<string> | null;
  searchOnClick: React.MouseEventHandler<HTMLButtonElement>;
  searchOnChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined
  ) => void;
  onSearchRefresh: React.MouseEventHandler<HTMLDivElement>;
  navBarTitleText: string;
  addButtonText: string;
  addButtonOnClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ContentNavBar: React.FC<ContentNavBarProps> = (props) => {
  return (
    <>
      <Card
        sx={{
          width: "90%",
          height: 90,
          marginLeft: 13,
          marginTop: 9,
          borderRadius: 5,
          borderColor: "#0276aa",
          borderStyle: "solid",
        }}
      >
        <CardContent sx={{ marginTop: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" noWrap component="div">
                {props.navBarTitleText}
              </Typography>
            </Grid>
            <Grid item xs={4} style={{ marginLeft: 80 }}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={props.addButtonOnClick}
                  >
                    {props.addButtonText}
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <SearchFeild
                    disableClearable={true}
                    id="search"
                    optionsData={props.searchOptionData}
                    searchOnChange={props.searchOnChange}
                    style={{ float: "left", width: "70%", marginBottom: 10 }}
                    searchLabel="Search record"
                    searchButtonText="Search"
                    searchButtonOnClick={props.searchOnClick}
                    searchValue={props.searchValue}
                    onSearchRefresh={props.onSearchRefresh}
                    sortComponent={<></>}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default ContentNavBar;
