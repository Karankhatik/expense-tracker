import React, { createContext, useState, useEffect } from "react";
import { Get } from "../dbFetch";
import { Delete } from "../dbFetch";
export const ExpenseContext = createContext();

function ExpenseProvider(props) {
  //All the states are defined here
  const [expenses, setExpenses] = useState([]);
  const [login, setLogin] = useState(false);
  const [savingAmount, setSavingAmount] = useState(200000);
  const [totalAmount, setTotalAmount] = useState(30500);
  const [expenseAmount, setExpenseAmount] = useState(500);
  const [investAmount, setInvestAmount] = useState(10000);

  //when the server load frist it get initialised
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("user");
        const response = await Get(`/api/expense/detail/${userId}`);
        setExpenses(response.expenses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  //remove the the expense
  const removeExpense = async (index) => {
    //deleting the expense 
    const res = await Delete(`/api/expense/delete/${index}`);
    const userId = localStorage.getItem("user");
    //if deleted then go for the again loading of the expense
    if (res.success) {
      try {
        const response = await Get(`/api/expense/detail/${userId}`);
        const updatedExpenses = response.expenses.filter(
          (expense, i) => i !== index
        );
        setExpenses(updatedExpenses);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Error deleting expense");
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
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
}

export default ExpenseProvider;
