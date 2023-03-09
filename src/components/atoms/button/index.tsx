import { Button } from "@mui/material";

/**
 * Usage - This component can be used as a 
 * global button along with the ablity to use as a nav link as well.
 *
 * Description - The component is build based on the material UI button
 * 
 * @props disableButtonRipple @typedef boolean
 * @props component @typedef any
 * @props buttonStyle @typedef React.CSSProperties
 * @props buttonText @typedef string
 * @props redirectLink @typedef string
 */

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
