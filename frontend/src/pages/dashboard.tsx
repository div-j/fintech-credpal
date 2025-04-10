// src/pages/dashboard.tsx
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import WalletTransact from '../components/WalletTransact';
import TransactionHistory from './../components/Transactions';

const DashboardPage = () => {

  const { user, logout } = useAuth();




  return (
    <main className=' text-[#0C110D] flex flex-row  '>
        <div className='w-auto'><Sidebar/></div>

        <div className=' w-[80%] '>
          <Header/>
          <h1 className='font-bold text-[24px] my-10 md:ml-[83px] mx-10'>Wallet</h1>

          <section className="ml-[83px] mr-10 border-t border-gray-200 py-5 bg-white">
  <div className="flex flex-col md:flex-row gap-4 overflow-x-auto scroll-bar-hide">
    <WalletTransact />
    <TransactionHistory />
  </div>
</section>


        </div>
      
    </main>
  );
};

export default DashboardPage;
