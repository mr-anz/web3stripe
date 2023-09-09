import React from 'react'
import { useStateContext } from '../context'
import { useContractRead, useWaitForTransaction } from 'wagmi'
import { Link } from 'react-router-dom'

const Slide1 = () => {
  const {setOpenPay , setRequests, requests, setHistory, history, contractAddress, contractAbi, account, name, balance, setOpenModal, setOpenRequest} = useStateContext()

  const { data } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getHistory',
    args: [account]
 })
setHistory(data)

const { data: request } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getMyRequests',
    args: [account]
 })
setRequests(request)



  return (
    <div className='p-3'>
        <div class="relative mx-auto w-full z-[1] overflow-hidden rounded-2xl bg-white shadow">
            <div className='contain z-[1] pb-4'><img src={"/polygon2.png"} className='h-[200px] z-[1]' alt="Shoes"  /></div>
            <div class="absolute inset-0 z-[1] bg-gradient-to-t from-gray-600"></div>
            <div class="absolute inset-x-0 z-[1] bottom-0 p-4">
                <p class="mb-1 text-sm text-green-50 ">Timeless •</p>
                <h3 class="text-xl font-medium text-white">Stripe clone</h3>
                <p class="mt-1 text-white text-opacity-80">Is a world wide exchange platform where you can exchande crypto with friends.</p>
            </div>
        </div>
        <div className="flex pt-6 p-10 sm:p-0 sm:flex-row flex-col mt-2 z-10  justify-center sm:justify-evenly gap-3">
            <div className="card z-10 bg-[#b6e810] glass  shadow-xl">
              <div className="card-body z-10">
                <h2 className="font-lg text-xl ml-5">Current Balance</h2>
                <div className=' ml-5 flex gap-3'>
                  <img className='rounded-full h-10 w-10' alt='lala' src={'/polygon2.png'} /> 
                  <p className="text-[32px]">{(balance?.formatted)?.slice(0,6)} Matic</p> 
                </div>
                <div className="flex flex-row justify-evenly gap-2">
                  <Link to={'https://app.uniswap.org/#/swap'} >
                    <button className="btn bg-[#11ade6] glass">Swap Token</button>
                  </Link>
                  <Link to={'https://wallet.polygon.technology/?redirectOnConnect=%2FzkEVM-Bridge%2Fbridge%3Ffaster-bridges%3Dtrue'}>
                    <button className="btn px-3 bg-[#11ade6] glass">Bridge Token</button>
                  </Link>
                </div>
              </div>
            </div> 
            <div className="card z-10 bg-[#b6e810] glass  shadow-xl">
              <div className="card-body z-10">
                  <h2 className="font-lg text-xl ml-5">Account Details</h2>
                  <div className=' ml-5 '>
                    <p className='text-lg ml-5'>Username: {name}</p>
                    <p className='text-sm ml-5'>Address: {account ? (account?.slice(0,6) + '....' + account?.slice(36)) : 'Wallet not connected'}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between  gap-3">
                    <button className="btn bg-[#11ade6] glass" onClick={() =>setOpenModal('scale-100') }>Set Username</button>
                    <button className="btn bg-[#11ade6] glass">Switch Account</button>
                </div>
              </div>
            </div> 
        </div>
        <div className="flex w-full justify-between py-4">
            <div className="w-1/2 flex justify-center">
                <button className="btn w-auto px-10 glass bg-[#d8f114]" onClick={()=>setOpenPay('scale-100')}> Pay {((requests?.[0].length)>0) && <div className="badge">+{requests?.[0].length}</div>} </button>
            </div>
            <div className="w-1/2 flex justify-center">
                <button className="btn w-auto glass bg-[#d8f114]" onClick={()=>setOpenRequest('scale-100')}>Request</button>
            </div>
        </div>
        <div className="">

        <div class="overflow-y-auto rounded-lg border border-gray-200 shadow-md">
          <table class="w-full  border-collapse bg-white glass text-left text-sm text-gray-800">
            <thead class="bg-[#b6e810] glass">
              <tr>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Address</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Message</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Amount</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Action</th>
                
              </tr>
            </thead>
            { history?.map((items,key) => (
            <tbody key={key} class="divide-y divide-gray-100 border-t border-2 border-gray-100">
              <tr class="hover:bg-[#d8f114] hover:glass">
                <th class="px-6 py-4 font-medium text-gray-900">{items.otherPartyName || '....'}</th>
                <td class="px-6 py-4">{(items.otherPartyAddress).slice(0,6) + '....' + (items.otherPartyAddress).slice(38)}</td>
                <td class="px-6 py-4">{items.message}</td>
                <td class="px-6 py-4">{(Number(items.amount))/1e18}</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-blue-600">
              
                    {items.action}
                  </span>
                </td>
              </tr>
            </tbody>
            ))}
          </table>
        </div>

        </div>

    </div>
  )
}

export default Slide1
