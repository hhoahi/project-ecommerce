import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

function CustomLineChart(props) {
  const data = props.orders;

  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Tăng giá trị tháng lên 1 để đảm bảo tháng từ 1 đến 12
    return month.toString(); // Chuyển giá trị tháng thành chuỗi
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
      <LineChart
        width={620}
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
        <YAxis yAxisId="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="quantity"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="price"
          stroke="#82ca9d"
        />
      </LineChart>
    </div>
  );
}

export default CustomLineChart;
