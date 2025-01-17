import styled from "styled-components";
import { Icon } from "../../../../components";
import { Link } from "react-router-dom";

const LargeText = styled.div`
  font-size: 48px;
  font-weight: 600px;
  line-height: 48px;
  margin-top: 17px;
`;

const SmallText = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const LogoContainer = ({ className }) => (
  <Link to="/" className={className}>
    <Icon id="fa-code" size="79px" margin="0 10px 0 0" />
    <div>
      <LargeText>Блог</LargeText>
      <SmallText>Веб-разработчика</SmallText>
    </div>
  </Link>
);

export const Logo = styled(LogoContainer)`
  display: flex;
  margin-top: -21px;
`;
