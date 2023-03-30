import { Img } from "./Logo.styles";
import LogoImg from "assets/intuit_logo.png";

type Props = {
  width?: number;
  height?: number;
};

const Logo = ({ width, height }: Props) => {
  return <Img src={LogoImg} width={width} height={height} />;
};

export default Logo;
