import IconButton from "@mui/material/IconButton";

/**
 * Usage - This component can be used as a global icon button.
 *
 * Description - The component is build based on the material UI IconButton
 * 
 * @props isButtonDisabled @typedef boolean
 * @props color @typedef enum
 * @props icon @typedef any
 * @props divStyle @typedef React.CSSProperties
 * @props divOnClick @typedef React.MouseEventHandler<HTMLDivElement>
 */

interface GlobalIconButtonProps {
  isButtonDisabled: boolean;
  color:
    | "inherit"
    | "default"
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning";
  icon: any;
  divStyle: React.CSSProperties;
  divOnClick: React.MouseEventHandler<HTMLDivElement>;
}

const GlobalIconButton: React.FC<GlobalIconButtonProps> = (props) => {
  return (
    <div style={props.divStyle} onClick={props.divOnClick}>
      <IconButton disabled={props.isButtonDisabled} color={props.color}>
        {props.icon}
      </IconButton>
    </div>
  );
};

export default GlobalIconButton;
