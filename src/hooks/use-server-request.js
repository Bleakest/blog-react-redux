import { useSelector } from "react-redux";
import { server } from "../bff";
import { SelectUserSession } from "../selectors";
import { useCallback } from "react";

export const useServerRequest = () => {
  const session = useSelector(SelectUserSession);

  return useCallback(
    (operation, ...params) => {
      const request = [
        "register",
        "authorize",
        "fetchPost",
        "fetchPosts",
      ].includes(operation)
        ? params
        : [session, ...params];

      return server[operation](...request);
    },
    [session]
  );
};
