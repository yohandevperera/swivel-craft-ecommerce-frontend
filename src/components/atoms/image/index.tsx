import { styled } from "@mui/material/styles";

/**
 * Usage - This component can be used as a global image tag.
 *
 * Description - The component is build based on the material UI styled as a custom component
 *
 * @props imageStyle @typedef any
 * @props imageSrc @typedef string
 * @props imageAlt @typedef string
 */

const GlobalImg: React.FC<{
  imageStyle: any;
  imageSrc: string;
  imageAlt: string;
}> = (props) => {
  const Img = styled("img")(props.imageStyle);
  return <Img alt={props.imageAlt} src={props.imageSrc} />;
};

export default GlobalImg;
