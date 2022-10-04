import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const useExpenses = (sortMethod) => {
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
      .post(`${process.env.NEXT_PUBLIC_API_URL}getExpenses`, {
        email: session.user.email,
      })
      .then((res) => {
        let data = res.data;
        setExpenses(data);

        /* INFO: array sorting */
        if (sortMethod === "recent") {
          data.sort((a, b) =>
            new Date(a.date) > new Date(b.date)
              ? -1
              : new Date(a.date) < new Date(b.date)
              ? 1
              : 0
          );
        } else if (sortMethod === "least") {
          
          data.sort((a, b) =>
            a.amount > b.amount ? 1 : a.amount < b.amount ? -1 : 0
          );
        } else if (sortMethod === "most") {
          data.sort((a, b) =>
            a.amount > b.amount ? -1 : a.amount < b.amount ? 1 : 0
          );
        } else {
          if(sortMethod.slice(0,5) === "TYPE-"){
            const type = sortMethod.slice(5,sortMethod.length);
            data = data.filter(expense => expense.type === type);
          }
          
        }

        //set corresponding pages (min 1, max numberPages/displayNumber)
        let tempTotalPages = Math.max(
          Math.ceil(data.length / MAX_EXPENSES_DISPLAY),
          1
        );
        setTotalPages(tempTotalPages);
        adjustCurrentExpenses(data);

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
  }, [session, sortMethod]);

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
