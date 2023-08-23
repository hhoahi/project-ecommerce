import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function CustomBarChart(props) {
  const data = props.orders;

  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; 
    return month.toString(); 
  };
  console.log(data);

  const monthlyData = {};
  data.data?.forEach((item) => {
    const createdAt = new Date(
      item.attributes.products[0].attributes.createdAt
    );
    const month = formatMonth(createdAt, "M"); // Lấy số tháng
    const price = item.attributes.products[0].attributes.price;
    const totalQuantity = item.attributes.products[0].attributes.quantity;

    if (monthlyData[month]) {
      monthlyData[month].price += price;
      monthlyData[month].quantity += totalQuantity;
    } else {
      monthlyData[month] = {
        price: price,
        quantity: totalQuantity,
      };
    }
  });
  

  const monthlyDataArray = Object.keys(monthlyData).map((month) => ({
    month: parseInt(month),
    price: monthlyData[month].price,
    quantity: monthlyData[month].quantity,
  }));

  return (
    <div>
      <BarChart
        width={550}
        height={400}
        data={monthlyDataArray}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="quantity" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="price" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default CustomBarChart;
