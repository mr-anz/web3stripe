'use client'
import React, { useEffect, useState } from 'react'
import { FaTimes } from "react-icons/fa";
import { useStateContext } from '../context';
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { parseEther } from 'viem';


const PayRequest = () => {
    const {openPay, account, setOpenPay , requests, setRequests, setHistory, contractAddress, contractAbi} = useStateContext()
  
    const { write, data } = useContractWrite({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'payRequest',
        args: [0],
        account,
        value: parseEther(String(Number(requests?.[1][0] || 5 )))
    })

    const { write: reject, data:rejectData } = useContractWrite({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'rejectRequest',
        args: [account,0],
        account,
    })
    
   
    const { isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    const { isSuccess: isSuccessReject } = useWaitForTransaction({
      hash: rejectData?.hash,
    })

    const { refetch: refetchHistory } = useContractRead({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'getHistory',
      args: [account],
      onSuccess(data) {
        setHistory(data)
      },
      onError(error) {
        alert("Error", error);
      },
    });

    const { refetch: refetchRequests } = useContractRead({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'getMyRequests',
      args: [account],
      onSuccess(data) {
        setRequests(data)
      },
      onError(error) {
        alert("Error", error);
      },
    });
    



    const handleSubmit = async(e) => {
      if(account){
        e.preventDefault()
        await write()   
        onClose()
      } else{
          alert('Connect to metamask')

      }
    }

    const handleClick = async(e) => {
      if(account){
        e.preventDefault()
        await reject()
        onClose()
      } else{
        alert('Connect to metamask')
    } 

    }
    
    const onClose = () => {
        setOpenPay('scale-0')
       
    }

    useEffect(()=> {
      if(isSuccess){
        refetchHistory()
        refetchRequests()
      }
    },[isSuccess, isSuccessReject])


  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
      items-center justify-center z-50 bg-black bg-opacity-50
      transform transition-transform duration-300 ${openPay}`}
    >
    <div
      className="bg-white shadow-xl shadow-black
      rounded-xl w-11/12 md:w-2/5 h-7/12 p-6"
    >
      <form className="flex flex-col">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Pay Requests</p>
          <button
            onClick={onClose}
            type="button"
            className="border-0 bg-transparent focus:outline-none"
          >
            <FaTimes />
          </button>
        </div>

        <div
          className="flex justify-between items-center
        bg-gray-300 rounded-xl mt-5"
        >
          <div
            className="block w-full bg-transparent pl-3 p-3
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"  
          >
           {requests?.[0][0]}
          </div>
        </div>

        <div
          className="flex justify-between items-center
        bg-gray-300 rounded-xl mt-5"
        >
          <div
            className="block w-full bg-transparent pl-3 p-3
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
          >
            {Number(requests?.[1][0])}
          </div>
        </div>

        <div
          className="flex justify-between items-center
        bg-gray-300 rounded-xl mt-5"
        >
          <div
            className="block w-full bg-transparent pl-3 p-3
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
          >
            {requests?.[2][0]}
          </div>
        </div>

        <div
          className="flex justify-between items-center
        bg-gray-300 rounded-xl mt-5"
        >
          <div
            className="block w-full bg-transparent pl-3 p-3
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
          >
            {requests?.[3][0] ? requests?.[3][0] : 'Username not set'}
          </div>
        </div>

        <div className="flex justify-evenly">
        <button
          onClick={handleClick}
          className="inline-block px-6 py-2.5 bg-red-600
          text-white font-medium text-md leading-tight
          rounded-full shadow-md hover:bg-red-700 mt-5"
          
        >
          Reject
        </button>
        <button
          onClick={handleSubmit}
          className="inline-block px-6 py-2.5 bg-green-500
          text-white font-medium text-md leading-tight
          rounded-full shadow-md hover:bg-green-700 mt-5"
        >
          Pay
        </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default PayRequest