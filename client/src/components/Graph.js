import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";
import { ExpenseContext } from "../context/ExpenseContext";
import {ArcElement} from "chart.js";
import { Typography,Grid,Paper } from "@mui/material";
import Crop169Icon from '@mui/icons-material/Crop169';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
Chart.register(ArcElement);

const Graph = () => {
  //getting the state from the useContext
  const { savingAmount, expenseAmount, totalAmount, investAmount } = useContext(ExpenseContext);
   
  //data labels intialize 
  const data = {
    labels: ["Savings", "Investments", "Expenditures"],
    datasets: [
      {
        data: [savingAmount, investAmount, expenseAmount],
        backgroundColor: ["#3be84a", "#e6f540", "#f54045"],        
      },
    ],
  };
  //Options for the chart
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: 'white',
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
  };

  
  return (
    <>
    <Doughnut data={data} options={options}/>
    {/* //Describing  the donut chart and their color and als show total amount   */}
    <Paper elevation={3} style={{ padding: "16px", margin: "16px", backgroundColor: "#fff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)" }}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography>
            <Crop169Icon style={{ marginRight: "8px", color: "#3be84a", backgroundColor:'#3be84a' }} />
            Saving Amount 
          </Typography>
          <Typography>
            <Crop169Icon style={{ marginRight: "8px" ,color: "#e6f540", backgroundColor:'#e6f540' }} />
            Invest Amount 
          </Typography>
          <Typography>
            <Crop169Icon style={{ marginRight: "8px", color: "#f54045" , backgroundColor:'#f54045'}} />
            Expense Amount 
          </Typography>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <Typography>Total Amount : <CurrencyRupeeIcon style={{fontSize:'15px'}}/>{totalAmount}</Typography>
        </Grid>
      </Grid>
    </Paper>    
    </>
  )
};

export default Graph;


