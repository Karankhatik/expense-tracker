import React, { createContext, useState, useEffect } from "react";
import { Get } from "../dbFetch";
import { Delete } from "../dbFetch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ExpenseContext = createContext();

function ExpenseProvider(props) {
  //All the states are defined here
  const [expenses, setExpenses] = useState([]);
  const [login, setLogin] = useState(false);
  const [savingAmount, setSavingAmount] = useState(200000);
  const [totalAmount, setTotalAmount] = useState(30500);
  const [expenseAmount, setExpenseAmount] = useState(500);
  const [investAmount, setInvestAmount] = useState(10000);
  const [showDialog, setShowDialog] = useState(false);
  //when the server load frist it get initialised
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("user");
        const response = await Get(`/api/expense/detail/${userId}`);
        setExpenses(response.expenses);
      } catch (error) {
        toast.error("Error in loading..");
      }
    };
    fetchData();
  }, []);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  //remove the the expense
  const removeExpense = async (index) => {
    try {
      //deleting the expense
      await Delete(`/api/expense/delete/${index}`);
      //handle this in state locally
      const updatedExpenses = [...expenses];
      updatedExpenses.splice(index, 1);
      setExpenses(updatedExpenses);
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Error in deleting..");
    }
  };

  return (
    // passess all the state and function throght the values
    <ExpenseContext.Provider
      value={{
        savingAmount,
        expenseAmount,
        totalAmount,
        investAmount,
        setExpenseAmount,
        setInvestAmount,
        setTotalAmount,
        setSavingAmount,
        expenses,
        addExpense,
        removeExpense,
        login,
        setLogin,
        showDialog,
        setShowDialog,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
}

export default ExpenseProvider;
