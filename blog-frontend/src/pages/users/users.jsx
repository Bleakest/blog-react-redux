import styled from "styled-components";
import { PrivateContent, H2 } from "../../components";
import { TableRow, UserRow } from "./components";
import { useServerRequest } from "../../hooks";
import { useEffect, useState } from "react";
import { ROLE } from "../../constans/role";
import { checkAccess } from "../../utils/check-access";
import { useSelector } from "react-redux";
import { SelectUserRole } from "../../selectors";

const UsersContainer = ({ className }) => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const userRole = useSelector(SelectUserRole);
  const requestServer = useServerRequest();
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }
    Promise.all([
      requestServer("fetchUsers"),
      requestServer("fetchRoles"),
    ]).then(([usersRes, rolesRes]) => {
      // console.log(usersRes, rolesRes);

      if (usersRes.error || rolesRes.error) {
        setErrorMessage(usersRes.error || rolesRes.error);
        return;
      }

      setUsers(usersRes.res);

      setRoles(rolesRes.res);
    });
  }, [requestServer, shouldUpdateUserList, userRole]);

  const onUserRemove = (userId) => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }
    requestServer("removeUser", userId).then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList);
    });
  };

  return (
    <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
      <div className={className}>
        <H2>Пользователи</H2>
        <div>
          <TableRow>
            <div className="login-column">Логин</div>
            <div className="registred-at-column">Дата регистрации</div>
            <div className="role-column">Роль</div>
          </TableRow>

          {users.map(({ id, login, registredAt, roleId }) => (
            <UserRow
              key={id}
              id={id}
              login={login}
              registredAt={registredAt}
              roleId={roleId}
              roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
              onUserRemove={() => onUserRemove(id)}
            />
          ))}
        </div>
      </div>
    </PrivateContent>
  );
};

export const Users = styled(UsersContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 570px;
`;
