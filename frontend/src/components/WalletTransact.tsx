import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";

export default function WalletTransact() {
  const [selected, setSelected] = useState<string>("card");

  return (
    <>
      <main className="w-[369px] h-[459px]">
        <div className="text-[#595957] bg-[#F9F9F7] rounded-lg shadow-md mb-[18px] w-full">
          <section className="flex px-5 flex-col justify-center gap-4 tracking-wider">
            <div className="w-full flex flex-row items-center justify-between gap-4 mt-6">
              <h1 className="capitalize text-xs">account balance</h1>
              <img src="wallet.png" alt="account" className="w-6 h-6" />
            </div>
            <hr className="text-gray-500 w-full" />
            <div className="my-3">
              <span className="font-semibold text-black text-2xl">₦200,000</span>
              <span className="text-black">.00</span>
            </div>
            <hr className="text-gray-500 w-full" />
            <div className="flex gap-[10px]">
              <img src="bank.png" alt="" className="w-[18px] h-[18px]" />
              <p className="font-medium text-xs">Wema Bank 010 210 2020</p>
              <img src="copy.png" alt="" className="w-[18px] h-[18px]" />
            </div>
          </section>

          <section className="px-5 pb-12 mt-[27px] flex flex-col justify-center gap-4 tracking-wider border-t border-dashed border-[#C4C4C4]">
            <div className="w-full flex flex-row items-center justify-between gap-4 mt-6">
              <h1 className="capitalize text-xs">pending amount</h1>
              <img src="clock.png" alt="account" className="w-6 h-6" />
            </div>
            <hr className="text-gray-500 w-full" />
            <div className="my-3">
              <span className="font-semibold text-black text-2xl">0</span>
              <span className="text-black">.00</span>
            </div>
          </section>
        </div>

        <div className="flex items-center justify-between w-full gap-2">
          <button
            className="btn btn-lg bg-[#FFDE02] w-[178px] h-8 text-xs font-medium"
            onClick={() => document.getElementById("payment_option")?.showModal()}
          >
            Add Funds
          </button>
          <button className="btn btn-lg w-[178px] h-8 text-xs font-medium">
            Withdrawal
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <button className="btn btn-lg h-8 text-xs font-medium">PND Amount</button>
          <button className="btn btn-lg h-8 text-xs font-medium">Pace Lien</button>
          <button className="btn btn-lg h-8 text-xs font-medium">Freeze Wallet</button>
        </div>
      </main>

      {/* Modals */}
      <PaymentOption selected={selected} setSelected={setSelected} />
      <PaymentDetails />
    </>
  );
}

export function PaymentOption({ selected, setSelected }: { selected: string; setSelected: (val: string) => void }) {
  return (
    <dialog id="payment_option" className="modal">
      <div className="modal-box max-w-md rounded-xl p-0 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="font-semibold text-lg">Payment Option</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>
        </div>

        <div className="space-y-3 px-5 py-4">
          <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <img src="bank.png" alt="Bank" className="w-5 h-5" />
            <span className="text-[16px] font-medium flex-1">Bank Transfer</span>
            <input type="radio" name="payment" className="radio radio-xs" />
          </div>

          <div
            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer ${
              selected === "card" ? "border-black" : "border-gray-200"
            }`}
            onClick={() => setSelected("card")}
          >
            <img src="card.png" alt="Card" className="w-5 h-5" />
            <span className="text-sm font-medium flex-1">Add Debit/Credit Card</span>
            <input
              type="radio"
              name="payment"
              className="radio radio-sm"
              checked={selected === "card"}
              onChange={() => setSelected("card")}
            />
          </div>

          <div className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:underline text-sm">
            <IoAddCircleOutline className="h-5 w-5" />
            <span>Add Payment Method</span>
          </div>
        </div>

        <div className="p-4 mt-[78px]">
          <button
            className="btn w-full bg-[#f9d900] hover:bg-yellow-500 text-black font-semibold rounded-md"
            onClick={() => document.getElementById("payment_details")?.showModal()}
          >
            Continue
          </button>
        </div>
      </div>
    </dialog>
  );
}

export function PaymentDetails() {
  return (
    <dialog id="payment_details" className="modal">
      <div className="modal-box max-w-md rounded-2xl p-0 overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div>
            <h3 className="font-semibold text-lg">Payment details</h3>
          <p className="text-sm text-gray-500 mt-1">Please confirm the margin details</p>

          </div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>
        </div>
    

        <div className="px-6 pt-5 pb-6 space-y-4 text-[#474D66] ">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card details</label>
            <div className="relative">
              <input
                type="text"
                placeholder="5399"
                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-black"
              />
              <img src="card-color.png" alt="card" className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-10" />
            </div>
            
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry date</label>
            <input
              type="text"
              placeholder="DD/MM/YY"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
            <input
              type="text"
              placeholder="546"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="px-6 pb-6">
          <button className="w-full py-3 bg-[#f9d900] hover:bg-yellow-400 rounded-lg font-semibold text-black text-sm">
            Pay Now
          </button>
        </div>
      </div>
    </dialog>
  );
}
