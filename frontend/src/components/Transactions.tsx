import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";



type Transaction = {
    id: string;
    type: string;
    amount: string;
    status: 'Approved' | 'Pending' | 'Liquidated';
    date: string;
  };

  // Sample data
  const initialTransactions: Transaction[] = [
    { id: 'TXN0012345', type: 'Liquidation', amount: '200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Awaiting Approval', amount: '200,000.00', status: 'Liquidated', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Withdrawal', amount: '200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Collateral', amount: '200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Collateral', amount: '200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Approved', amount: '200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Collateral', amount: '200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Stock Investment', amount: '200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Collateral', amount: '200,000.00', status: 'Approved', date: '2024-09-12' },
    { id: 'TXN0012345', type: 'Collateral', amount: '200,000.00', status: 'Approved', date: '2024-09-12' },
  ];



const TableHead:Array<string> =[

    "Transaction Id",
    "Transaction Type",
    "Amount (₦)",
    "Status",
    "Date",
    "Action"


] 

  const TransactionHistory =  () => {
      // State for transactions and filters
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [filterType, setFilterType] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

   // Pagination logic



   const totalPages = Math.ceil(transactions.length / itemsPerPage);
   const paginatedTransactions = transactions.slice(
     (currentPage - 1) * itemsPerPage,
     currentPage * itemsPerPage
   );

   return(
    <main className=" border-l border-[#C8CBD9] pl-10  ">
        <h1 className="text-[16px] font-semibold">Transaction History</h1>
        <section className="flex items-center justify-between mt-5 gap-2">
            <div className=" flex  items-center justify-between  gap-2">
                {
                ["3 years", "Approved", "Pending", "History"].map((iten)=>(
                    <button className="btn px-4 py-[6px] btn-lg text-[#8C8C89]   h-8 text-xs font-medium">
                      {iten}
                    </button>
                ))
                }
            </div>
            <div className="text-[#8C8C89]" >
                Filter by <select name="spot" id="" className="text-xs font-medium border  rounded-md h-8 px-2 ml-2">
                    <option selected value="spot">Spot</option>
                    <option value="future">Future</option>
                    <option value="options">Options</option>
                </select>
            </div>
        </section>

        {/* table */}
     <div className="text-xs mt-5 " style={{letterSpacing:"-1%"}}>
        <table className="w-full ">
            <thead>
                <tr className="border-y border-[#D9D8D5]  ">
                    {TableHead.map((item)=>(
                        <th key={item} className="py-[6px]">{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {paginatedTransactions.map((transaction, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.id}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.type}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">₦{transaction.amount}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    ● {transaction.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className=" btn btn-sm bg-white hover:text-blue-900">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     </div>

                {/* Pagination */}
        <div className="flex items-center text-xs mt-4 justify-end w-full">
          <p className="font-medium mr-2">Page 1 of 30</p>
          <div className="flex items-center gap-2">
      
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                className={`px-3 ${currentPage==n ? "border border-[#FFC130] p-1 rounded":""}`}
              >
                {n}
              </button>
            ))}
          <button disabled className="btn btn-sm -mr-3">
              <BiChevronLeft className="h-4 w-4" />
            </button>
            <button className="btn btn-sm" >
              <BiChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
    </main>
   )
  }

  

  export default TransactionHistory