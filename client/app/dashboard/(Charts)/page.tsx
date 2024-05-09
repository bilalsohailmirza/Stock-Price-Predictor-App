'use client'  

import { FormEvent, FormEventHandler, useEffect, useState, ChangeEvent, ChangeEventHandler } from "react";
import ChartComponent from "./ChartComponent";
import {allData} from "./data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Charts = (props: any) => {

  const options = [
    {
      value: "APPLE",
      label: "AAPL"
    }, {
      value: "Google",
      label: "GOOG"
    }, {
      value: "CISCO",
      label: "CSCO"
    },
  ]
  const [stockName, setStockName] = useState(options[0].value);
  const handleSelect = (event: any) => {
    console.log(event.target.value)
    setStockName(event.target.value)
  }
  // useEffect(() => {
  //   handleSelect(event)

  // }, [stockName])
  
    return (

      <div className="mt-8">
      <div className="flex my-8 p-4 float-right">

        {/* <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Stock" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup onChange={(e) => handleSelect(e)}>
              <SelectLabel>Available Stocks</SelectLabel>
              <SelectItem value="Apple Inc. (AAPL)">AAPL</SelectItem>
              <SelectItem value="Alphabet Inc. (GOOG)">GOOG</SelectItem>
              <SelectItem value="Cisco Systems, Inc. (CSCO)">CSCO</SelectItem>
              <SelectItem value="International Business Machines Corporation (IBM)">IBM</SelectItem>
              <SelectItem value="Amazon.com, Inc. (AMZN)">AMZN</SelectItem>
              <SelectItem value="Microsoft Corporation (MSFT)">MSFT</SelectItem>
              <SelectItem value="General Electric Company (GE)">GE</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}
      

       <select 
        onChange={handleSelect}
        className="px-12 py-3 rounded-md bg-blue-700"
        name="Select a Stock" id=""
        >
          {options.map(option => (
            <option key={option.label} value={option.value}>{option.label}</option>
          ))}
        {/* <option 
        className="focus:bg-blue-9500 rounded-md"
        value="" 
        >
          GOOG
        </option>
        <option value="">AAPL</option>
        <option value="">CSCO</option>
        <option value="">IBM</option> */}
       </select>

      </div>

      <ChartComponent data={allData.reversedData} predData={allData.predData} className = 'w-[90%] h-screen ml-[5%]' Name = {stockName}></ChartComponent>
      
      </div>

    );
};

export default Charts