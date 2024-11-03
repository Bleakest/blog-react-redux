import styled from "styled-components";
import PropTypes from "prop-types";

const h2Container = ({ className, children }) => {
  return <h2 className={className}>{children}</h2>;
};

export const H2 = styled(h2Container)`
  margin: 40px 0;
`;

H2.propTypes = {
  children: PropTypes.node.isRequired,
};
