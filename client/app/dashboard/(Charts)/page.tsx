'use client'

import { FormEvent, FormEventHandler, useEffect, useState, ChangeEvent, ChangeEventHandler } from "react";
import axios from 'axios';
import ChartComponent from "./ChartComponent";
import { allData } from "./data";
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
      label: "Apple Inc.",
      value: "AAPL"
    }, {
      label: "Alphabet Inc. (GOOG)",
      value: "GOOG"
    }, {
      label: "Cisco Systems, Inc. (CSCO)",
      value: "CSCO"
    },
    {
      label: "International Business Machines Corporation (IBM)",
      value: "IBM"
    },
    {
      label: "Amazon.com, Inc. (AMZN)",
      value: "AMZN"
    },
    {
      label: "Microsoft Corporation (MSFT)",
      value: "MSFT"
    },
    {
      label: "General Electric Company (GE)",
      value: "GE"
    },
  ]
  const [stockName, setStockName] = useState("AAPL");
  const [stockData, setStockData] = useState([]);
  const [predData, setPredData] = useState([]);


  const handleSelect = (event: any) => {
    // console.log(event.target.value)
    setStockName(event.target.value)
  }

  const handleApiResponse = (response: any) => {
    response.data.real = convertStrToNumber(response.data.real)
    response.data.predicted = convertStrToNumber(response.data.predicted)
    setStockData(response.data.real)
    setPredData(response.data.predicted)

  }
  const convertStrToNumber = (results: any) => {
    for (let i = 0; i < results.length; i++) {
      results[i].value = parseFloat(results[i].value)
    };
    // console.log("Values After Conversion", results)
    return results
  }
  useEffect(() => {
    try {

      axios.get(`http://localhost:8000/test/${stockName}/`)
        .then((results) => (handleApiResponse(convertStrToNumber(results))))

    } catch (err) {
      console.log(err)
    }
    // if (stockData.length > 0) {
    //   console.log(stock)
    // }
  }, [stockName, setStockData, setPredData])

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
            <option key={option.label} value={option.value}>{option.value}</option>
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

      <ChartComponent stockData={stockData} predData={predData} className='w-[90%] h-screen ml-[5%]' Name={stockName}></ChartComponent>

    </div>

  );
};

export default Charts