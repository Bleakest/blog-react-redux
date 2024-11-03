import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  selectModalIsOpen,
  selectModalText,
  selectOnCancel,
  selectOnConfirm,
} from "../../selectors";

const ModalContainer = ({ className }) => {
  const text = useSelector(selectModalText);
  const onConfirm = useSelector(selectOnConfirm);
  const onCancel = useSelector(selectOnCancel);
  const isOpen = useSelector(selectModalIsOpen);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={className}>
      <div className="overlay"></div>
      <div className="box">
        <h3>{text}</h3>
        <div className="buttons">
          <button onClick={onConfirm}>Да</button>
          <button onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export const Modal = styled(ModalContainer)`
  position: fixed;
  z-index: 20;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  & .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }

  & .box {
    position: relative;
    text-align: center;
    top: 50%;
    transform: translate(0, -50%);
    width: 400px;
    margin: auto;
    padding: 0 20px 20px;
    background-color: #fff;
    border: 3px solid #000;
    z-index: 10px;
  }

  & .buttons {
    display: flex;
    justify-content: center;
  }

  & .buttons button {
    margin: 0 5px;
  }
`;
