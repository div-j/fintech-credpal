import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  HiOutlineMenuAlt3 as MenuIcon,
  HiOutlineX as CloseIcon,
  HiChartSquareBar,
  HiUserGroup,
  HiPresentationChartBar,
  HiOutlineUserGroup,
  HiOutlineChartSquareBar,
} from "react-icons/hi";
import { BsFillPhoneFill } from "react-icons/bs";
import {
  FaCog as Settings,
  FaSignOutAlt as LogOut,
  FaArchive,
} from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";
import { LuArrowLeftRight, LuFileLock2, LuRocket } from "react-icons/lu";
import { PiPiggyBank, PiPresentationChart } from "react-icons/pi";
import { RiPieChartLine } from "react-icons/ri";
import { TbInfoSquareRounded, TbUsers } from "react-icons/tb";
import { BiBell, BiCog } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";
import { useTheme } from "../context/ThemeContext";


export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme(); // 🧠 get theme context

  const navItems = [
    { name: "Overview", icon: HiOutlineChartSquareBar, href: "/dashboard/overview" },
    { name: "Customers", icon: HiOutlineUserGroup, href: "/dashboard/clients" },
    { name: "Spot Orders", icon: PiPresentationChart, href: "/post" },
    { name: "Margin Orders", icon: PiPresentationChart, href: "/dashboard/schedule" },
    { name: "Transaction", icon: LuArrowLeftRight, href: "/dashboard/templates" },
    { name: "Wallet", icon: LuArrowLeftRight, href: "/dashboard/invoices" },
  ];

  const navItems2 = [
    { name: "Notifcation", icon: BiBell, href: "/dashboard/payment" },
    { name: "Settings", icon: BiCog, href: "/dashboard/settings" },
    { name: "Logout", icon: CgLogOut, href: "/dashboard/support" },
    { name: "Help", icon: TbInfoSquareRounded, href: "/dashboard/compliance" },
  ];

  return (
    <nav
      className={`w-60 sticky  bg-black h-screen text-white transform transition-transform duration-300 ease-in-out`}
    >
      {/* logo */}
      <div className="flex items-center mb-6 pl-10 pt-10">
        <div className="w-[68px] h-6">
          <img src="logo-icon.png" alt="logo" className="w-full h-full" />
        </div>
      </div>
      <div className="w-full border border-gray-200"></div>

      {/* Nav */}
      <div className="bg-black">
        <ul className="px-6 my-10">
          <h3 className="text mb-6">MAIN</h3>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 py-3 rounded-lg text-sm transition-colors duration-200 ${
                  pathname === item.href ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="w-full border mt-10 border-gray-200"></div>

        <ul className="px-6 mt-[61px] bg-black">
          <h3 className="text mb-6">OTHERS</h3>
          {navItems2.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 py-3 rounded-lg text-sm transition-colors duration-200 ${
                  pathname === item.href ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
   
          {/* 🔁 Theme toggle */}
          <section className="py-[130px] ">
              <div className="rounded  p-4 gap-2 text-black bg-white mx-2 flex items-center justify-between">
                <p className="text-xs">{isDark ? "Switch to light mode" : "Switch to dark mode"}</p>
                <div
                  className={`w-12 h-6 rounded-full cursor-pointer flex items-center transition-all duration-300 ${
                    isDark ? "bg-black" : "bg-gray-300"
                  }`}
                  onClick={toggleTheme}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                      isDark ? "translate-x-6" : "translate-x-1"
                    }`}
                  ></div>
                </div>
              </div>
          </section>
  
      </div>

    
    </nav>
  );
}
