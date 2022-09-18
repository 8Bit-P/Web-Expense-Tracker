import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UtilsContext } from "../context/UtilsContext";

export default function useMonthlyLimit() {
  const utils = useContext(UtilsContext);

  const [isLimitLoading, setLimitIsLoading] = useState(true);
  const [monthlyLimit, setMonthlyLimit] = useState(0);
  const [error, setError] = useState(null);

  function fetchMonthlyLimit(){
    if(utils.email){

      axios
        .post("http://localhost:3000/api/getUser", { email: utils.email })
        .then((res) => {
          /* console.log(res.data) */
          setMonthlyLimit(res.data.balance);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => setLimitIsLoading(false));
  }
  }

  useEffect(() => {
    fetchMonthlyLimit()
  }, [utils.email]);

  return {isLimitLoading,monthlyLimit,error,fetchMonthlyLimit};
}
