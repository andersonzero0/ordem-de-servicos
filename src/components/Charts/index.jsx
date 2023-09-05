import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis } from "recharts";

import "./style.css"

export default function Charts({setMonth}) {

  
  const data = [
    {
      name: "jan",
      uv: 4000,
      total:12
    },
    {
      name: "fev",
      uv: 3000,
      total:8
    },
    {
      name: "mar",
      uv: 2000,
      total:2
    },
    {
      name: "abril",
      uv: 2780,
      total:12
    },
    {
      name: "mai",
      uv: 1890,
      total:12
    },
    {
      name: "jun",
      uv: 2390,
      total:9
    },
    {
      name: "jul",
      uv: 3490,
      total:12
    },
    {
      name: "ago",
      uv: 4000,
      total:72
    },
    {
      name: "set",
      uv: 4000,
      total:1
    },
    {
      name: "out",
      uv: 400,
      total:12
    },
    {
      name: "nov",
      uv: 600,
      total:80
    },
    {
      name: "dez",
      uv: 10000,
      total:12
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = useCallback(
    (entry, index) => {
      setMonth(entry)
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  return (
    <div className="conteinerCharts">
      <BarChart width={650} height={400} data={data}>
        <Bar dataKey="uv" onClick={handleClick} alignmentBaseline="center" barSize={30}>
          {data.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === activeIndex ? "#0E213E" : "#3485FF33"}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
        <XAxis dataKey="name" axisLine={false} tickLine={false}/>
      </BarChart>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Ano</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
