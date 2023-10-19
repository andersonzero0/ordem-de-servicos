import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState, useCallback, useContext, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, ResponsiveContainer, YAxis, Tooltip, CartesianGrid } from "recharts";
import { OrderContext } from "../../contexts/Order";

import "./style.css";

export default function Charts({ setMonth }) {
  const { dataYears } = useContext(OrderContext);

  const [ageSelected, setAgeSelected] = useState({
    dataMes: [],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = useCallback(
    (entry, index) => {
      setMonth(entry);
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setActiveIndex(0)
    setAge(event.target.value);

    const select = dataYears.find((data) => data.year == event.target.value);
    setAgeSelected(select);
    setMonth(select.dataMes[0]);
  };

  useEffect(() => {
    const select = dataYears[0];

    if (!select) {
      return;
    }

    setAgeSelected(select);
    setAge(select.year);
    setMonth(select.dataMes[0]);
  }, []);

  return (
    <div className="conteinerCharts">
      <ResponsiveContainer height={400} width={"100%"}>
        <BarChart
          className="test"
          data={ageSelected.dataMes}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="valorTotal"
            onClick={handleClick}
            alignmentBaseline="center"
            barSize={30}
          >
            {ageSelected.dataMes.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={index === activeIndex ? "#0E213E" : "#3485FF33"}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis/>
        </BarChart>
      </ResponsiveContainer>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Ano</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {dataYears.map((data, key) => {
            return (
              <MenuItem key={key} value={data.year}>
                {data.year}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
