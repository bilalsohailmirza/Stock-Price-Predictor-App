import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// import {data} from './data'

const TableComponent = (props: any) => {

  const stockData = props.data

  console.log(typeof stockData)
  return (
    <>
      <Table className="w-[90%] ml-[5%]">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className="h-20">
          <TableRow>
            <TableHead className="font-black text-2xl">Date</TableHead>
            <TableHead className="font-black text-2xl">Open</TableHead>
            <TableHead className="font-black text-2xl">High</TableHead>
            <TableHead className="font-black text-2xl">Low</TableHead>
            <TableHead className="font-black text-2xl">Close</TableHead>
            <TableHead className="font-black text-2xl text-right">Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            stockData.map((d: any) => {

              return (
                <TableRow>
                  <TableCell>{d.date}</TableCell>
                  <TableCell>{d.open}</TableCell>
                  <TableCell>{d.high}</TableCell>
                  <TableCell>{d.low}</TableCell>
                  <TableCell>{d.close}</TableCell>
                  <TableCell className="text-right">{d.volume}</TableCell>
                </TableRow>
              )
            })}

        </TableBody>
      </Table>
    </>)
}

export default TableComponent