import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import {data} from './data'

const TableComponent = (props: any) => {
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
    {data.map((d) => {
        return (
        <TableRow>
            <TableCell>{d.Date}</TableCell>
            <TableCell>{d.Open}</TableCell>
            <TableCell>{d.High}</TableCell>
            <TableCell>{d.Low}</TableCell>
            <TableCell>{d.Close}</TableCell>
            <TableCell className="text-right">{d.Volume}</TableCell>
        </TableRow>
    )})}
    
  </TableBody>
</Table>
</>)    
}

export default TableComponent