import styled from "styled-components";
import { Icon } from "../../../../components";

const SpecialPanelContainer = ({ className, publishedAt, editButton }) => {
  return (
    <div className={className}>
      <div className="published-at">
        <Icon id="fa-calendar-o" margin="0 6px 0 0" onClick={() => {}} />
        {publishedAt}
      </div>
      <div className="buttons">
        {editButton}
        <Icon id="fa-trash-o" onClick={() => {}} />
      </div>
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
