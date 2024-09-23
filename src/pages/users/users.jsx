import styled from "styled-components";
import { Content, H2 } from "../../components";
import { TableRow, UserRow } from "./components";
import { useServerRequest } from "../../hooks";
import { useEffect, useState } from "react";
import { ROLE } from "../../constans/role";

const UsersContainer = ({ className }) => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const requestServer = useServerRequest();
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

  useEffect(() => {
    Promise.all([
      requestServer("fetchUsers"),
      requestServer("fetchRoles"),
    ]).then(([usersRes, rolesRes]) => {
      if (usersRes.error || rolesRes.error) {
        setErrorMessage(usersRes.error || rolesRes.error);
        return;
      }

      setUsers(usersRes.res);

      setRoles(rolesRes.res);
    });
  }, [requestServer, shouldUpdateUserList]);

  const onUserRemove = (userId) => {
    requestServer("removeUser", userId).then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList);
    });
  };

  return (
    <div className={className}>
      <Content error={errorMessage}>
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
              roles={roles.filter(
                ({ id: roleid }) => Number(roleid) !== ROLE.GUEST
              )}
              onUserRemove={() => onUserRemove(id)}
            />
          ))}
        </div>
      </Content>
    </div>
  );
};

export const Users = styled(UsersContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 570px;
  font-size: 18px;
`;