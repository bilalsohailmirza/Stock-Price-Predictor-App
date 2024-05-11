
import { useEffect, useState } from "react"
import axios from 'axios'
import TableComponent from "./TableComponent"

const History = () => {

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


  const [stockData, setStockData] = useState([]);
  const [stockName, setStockName] = useState("AAPL");

  const handleSelect = (event: any) => {
    console.log(event.target.value)
    setStockName(event.target.value)
  }
  const handleApiResponse = (data: any) => {
    // console.log(data.data)
    // response.data.real = convertStrToNumber(response.data.real)
    // response.data.predicted = convertStrToNumber(response.data.predicted)
    console.log(data.data)
    setStockData(data.data)
    console.log(stockData)
  }
  const convertStrToNumber = (data: any) => {
    // console.log(data[0])
    // for (let i = 0; i < data.length; i++) {
    //   data[i].open = parseFloat(data[i].open)
    //   data[i].high = parseFloat(data[i].high)
    //   data[i].close = parseFloat(data[i].close)
    //   data[i].adj_close = parseFloat(data[i].adj_close)
    //   data[i].open = parseInt(data[i].volume)
  };
  // console.log("Values After Conversion", data[0])
  // return data

  useEffect(() => {
    try {

      axios.get(`http://localhost:8000/stocks/${stockName}/`)
        .then((results) => handleApiResponse(results))

    } catch (err) {
      console.log(err)
    }
    // if (stockData.length > 0) {
    //   console.log(stock)
    // }
  }, [stockName])
  return (
    <div>

      <select
        onChange={handleSelect}
        className="px-12 py-3 rounded-md bg-blue-700"

        name="Select a Stock" id=""
      >
        {options.map(option => (
          <option key={option.label} value={option.value}>{option.value}</option>
        ))}
      </select>

      <TableComponent data={stockData} />
    </div>
  )
}

export default History