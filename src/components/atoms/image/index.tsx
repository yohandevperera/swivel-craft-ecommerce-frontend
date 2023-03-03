import { styled } from "@mui/material/styles";

const GlobalImg: React.FC<{
  imageStyle: any;
  imageSrc: string;
  imageAlt: string;
}> = (props) => {
  const Img = styled("img")(props.imageStyle);
  return <Img alt={props.imageAlt} src={props.imageSrc} />;
};

export default GlobalImg;
