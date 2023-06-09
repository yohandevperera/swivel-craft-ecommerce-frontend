import { Box, Button, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { NavLink as RouterLink } from "react-router-dom";

/**
 * Usage - This component is used to Error Statuses if the authentication is failed.
 *
 * Description - The component is build based on the Material Ui components and custom components
 *
 * @props statusCode @typedef number
 * @props errorText @typedef string
 */

const ErrorTemplate: React.FC<{ statusCode: number; errorText: string }> = (
  props
) => {
  const primary = purple[500]; // #f44336
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: primary,
        }}
      >
        <Typography variant="h1" style={{ color: "white" }}>
          {props.statusCode}
        </Typography>
        <Typography variant="h6" style={{ color: "white" }}>
          {props.errorText}
        </Typography>
        <Button
          component={RouterLink}
          to={`/`}
          variant="contained"
          sx={{ width: 150 }}
        >
          Back Home
        </Button>
      </Box>
    </>
  );
};

export default ErrorTemplate;
