import styled from "styled-components";
import PropTypes from "prop-types";

const IconContainer = ({ className, id, ...props }) => (
  <div className={className} {...props}>
    <i className={`fa ${id}`} aria-hidden="true"></i>
  </div>
);

export const Icon = styled(IconContainer)`
  font-size: ${({ size = "24px" }) => size};
  margin: ${({ margin = "0" }) => margin};
  color: ${({ disabled }) => (disabled ? "#ccc" : "#000")};

  &:hover {
    cursor: pointer;
  }
`;

Icon.propTypes = {
  id: PropTypes.string.isRequired,
};
