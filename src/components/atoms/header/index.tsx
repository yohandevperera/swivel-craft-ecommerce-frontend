import { styled } from "@mui/material/styles";
import { Card } from "@mui/material";

const Div = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  alignItems: "center",
  alignContent: "center",
  marginTop: 4,
  color: "white",
}));

const Header: React.FC<{ title: string }> = (props) => {
  return (
    <Card
      sx={{
        backgroundColor: "secondary.main",
        height: 50,
        marginTop: 1,
      }}
    >
      <Div>{props.title}</Div>
    </Card>
  );
};

export default Header;
