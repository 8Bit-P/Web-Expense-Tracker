import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const useExpenses = () => {
  const MAX_EXPENSES_DISPLAY = 5;

  /* INFO: Pagination */
  const [currentPage, setCurrentPage] = useState(1); // 1 - total
  const [totalPages, setTotalPages] = useState(1);

  /* INFO: Raw expense data */
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [isExpensesLoading, setIsExpensesLoading] = useState(true);

  /* INFO: auth session */
  const { data: session, status } = useSession();

  const fetchExpenses = async () => {
    /* STILL NO INFO ABOUT USER */
    if (status === "loading") return;
    setIsExpensesLoading(true);
    axios
      .post("http://localhost:3000/api/getExpenses", {
        email: session.user.email,
      })
      .then((res) => {
        setExpenses(res.data);
        /*TODO: MAYBE SOME KIND OF SORTING METHOD */

        //set corresponding pages (min 1, max numberPages/displayNumber)
        let tempTotalPages = Math.max(
          Math.ceil(res.data.length / MAX_EXPENSES_DISPLAY),
          1
        );
        setTotalPages(tempTotalPages);
        adjustCurrentExpenses(res.data);

        if (currentPage > tempTotalPages) {
          let temp = currentPage - 1;
          setCurrentPage(temp);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsExpensesLoading(false);
      });
  };

  //load expenses once page has loaded
  useEffect(() => {
    fetchExpenses();
  }, [session]);

  const [currentExpenses, setCurrentExpenses] = useState([]);

  const adjustCurrentExpenses = (exp) => {
    const beginingIndex = (currentPage - 1) * MAX_EXPENSES_DISPLAY;
    const endingIndex = Math.min(
      beginingIndex + MAX_EXPENSES_DISPLAY,
      exp.length
    );
    setCurrentExpenses(exp.slice(beginingIndex, endingIndex));
  };

  return {
    expenses,
    isExpensesLoading,
    error,
    fetchExpenses,
    totalPages,
    currentPage,
    setCurrentPage,
    currentExpenses,
    adjustCurrentExpenses,
  };
};

export default useExpenses;
