import styled from "styled-components";
import { Icon, Input } from "../../../../components";
import PropTypes from "prop-types";

const SearchContainer = ({ className, searchPhrase, onChange }) => {
  return (
    <div className={className}>
      <Input
        onChange={onChange}
        value={searchPhrase}
        placeholder="Поиск по заголовкам"
      />
      <Icon id="fa-search" size="21px" />
    </div>
  );
};

export const Search = styled(SearchContainer)`
  display: flex;
  margin: 40px auto 0;
  width: 340px;
  height: 40px;
  position: relative;

  & > div {
    position: absolute;
    right: 7px;
    top: 6px;
  }

  & > input {
    padding: 10px 38px 10px 10px;
  }
`;

Search.propTypes = {
  searchPhrase: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
