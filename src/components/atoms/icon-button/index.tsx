import IconButton from "@mui/material/IconButton";

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
