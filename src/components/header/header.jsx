import styled from "styled-components";

import { Logo, ControlPanel } from "./components";

const Dicription = styled.div`
  font-style: italic;
`;

const HeaderContainer = ({ className }) => (
  <header className={className}>
    <Logo />
    <Dicription>
      Веб-технологии
      <br /> Написание кода
      <br /> Разбор ошибок
    </Dicription>
    <ControlPanel />
  </header>
);

export const Header = styled(HeaderContainer)`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  height: 120px;
  width: 1000px;
  padding: 20px 40px;
  box-shadow: 0px -2px 17px #000;
  background-color: white;
`;
