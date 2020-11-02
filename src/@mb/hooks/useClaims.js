import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { utils } from "@mb";

const useClaims = (query) => {
  const userClaims = useSelector(({ auth }) => auth.userClaims);
  const [claims, setClaims] = useState(query);
  const [rights, setRights] = useState([false]);

  useEffect(() => {
    if (utils.isEmpty(claims)) return [false];
    setRights(
      Array.isArray(claims)
        ? claims.filter((c) => userClaims.includes(c))
        : userClaims.some((uc) => uc == claims)
    );
  }, [claims]);

  return rights;
};

export default useClaims;
