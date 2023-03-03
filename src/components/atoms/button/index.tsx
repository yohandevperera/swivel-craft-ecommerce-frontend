import { Button } from "@mui/material";

interface ButtonProps {
  disableButtonRipple: boolean;
  component?: any;
  buttonStyle: React.CSSProperties;
  buttonText: string;
  redirectLink: string;
}

const GlobalButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      disableRipple={props.disableButtonRipple}
      component={props.component}
      to={props.redirectLink}
      style={props.buttonStyle}
    >
      {props.buttonText}
    </Button>
  );
};

export default GlobalButton;
