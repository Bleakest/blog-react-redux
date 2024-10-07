import { useSelector } from "react-redux";
import { Error } from "../error/error";
import { SelectUserRole } from "../../selectors";
import { checkAccess } from "../../utils/check-access";
import { ERROR } from "../../constans";

export const PrivateContent = ({ children, access, serverError = null }) => {
  const userRole = useSelector(SelectUserRole);

  const accessError = checkAccess(access, userRole)
    ? null
    : ERROR.ACCESS_DENIED;
  const error = serverError || accessError;

  return error ? <Error error={error} /> : children;
};
