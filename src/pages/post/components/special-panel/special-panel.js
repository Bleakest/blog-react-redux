import styled from "styled-components";
import { Icon } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL, openModal, removePostAsync } from "../../../../actions";
import { useServerRequest } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { checkAccess } from "../../../../utils/check-access";
import { ROLE } from "../../../../constans";
import { SelectUserRole } from "../../../../selectors";

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const navigate = useNavigate();
  const roleId = useSelector(SelectUserRole);

  const onPostRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить статью?",
        onConfirm: () => {
          dispatch(removePostAsync(requestServer, id)).then(() => {
            navigate("/");
          });
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  const isAdmin = checkAccess([ROLE.ADMIN], roleId);

  return (
    <div className={className}>
      <div className="published-at">
        {publishedAt && <Icon id="fa-calendar-o" margin="0 6px 0 0" />}
        {publishedAt}
      </div>
      {isAdmin && (
        <div className="buttons">
          {editButton}

          {publishedAt && (
            <Icon id="fa-trash-o" onClick={() => onPostRemove(id)} />
          )}
        </div>
      )}
    </div>
  );
};

export const SpecialPanel = styled(SpecialPanelContainer)`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin: ${({ margin }) => margin};

  & .buttons {
    display: flex;
  }

  & i {
    position: relative;
    top: -8px;
    font-size: 18px;
  }

  & .published-at {
    display: flex;
    font-size: 18px;
  }
`;
