import styled from "styled-components";

import { Icon, Button } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SelectUserLogin,
  SelectUserRole,
  SelectUserSession,
} from "../../../../selectors";
import { ROLE } from "../../../../constans/role";
import { logout } from "../../../../actions";

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const StyledBackIcon = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();
  const roleId = useSelector(SelectUserRole);
  const login = useSelector(SelectUserLogin);
  const dispatch = useDispatch();
  const session = useSelector(SelectUserSession);

  const onLogout = () => {
    dispatch(logout(session));
    sessionStorage.removeItem("userData");
  };

  return (
    <div className={className}>
      <RightAligned>
        {roleId === ROLE.GUEST ? (
          <Button>
            <Link to="/login">Войти</Link>
          </Button>
        ) : (
          <>
            <UserName>{login}</UserName>
            <Icon
              onClick={onLogout}
              id="fa-sign-out"
              size="20px"
              margin="0 0 0 10px"
            />
          </>
        )}
      </RightAligned>
      <RightAligned>
        <StyledBackIcon onClick={() => navigate(-1)}>
          <Icon id="fa-backward" size="20px" margin="10px 0 0 0" />
        </StyledBackIcon>
        <Link to="/post">
          <Icon id="fa-file-text-o" size="20px" margin="10px 0 0 15px" />
        </Link>
        <Link to="/users">
          <Icon id="fa-users" size="20px" margin="10px 0 0 15px" />
        </Link>
      </RightAligned>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)``;
