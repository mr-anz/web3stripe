import React, { useEffect, useState } from 'react'
import { FaTimes } from "react-icons/fa";
import { useStateContext } from '../context';
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'


const CreateRequest = () => {
    const {openModal, account, name, setOpenRequest, openRequest, setRequests, setHistory, setName, setOpenModal, contractAddress, contractAbi} = useStateContext()
    const [user, setUser] = useState()
    const [amount, setAmount] = useState()
    const [message,setMessage] = useState()

    const { config } = usePrepareContractWrite({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'createRequest',
      args: [user, amount, message]
    })

    const {write, data} = useContractWrite(config)

    const { isSuccess } = useWaitForTransaction({
      hash: data?.hash,
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


    const handleSubmit = async (e) => {
      if(account){
        e.preventDefault()
        if (!user || !amount || !message) return
        await write()         
        onClose()
    } else{
        alert('Connect to metamask')
    }   

    }
    console.log(name)
    
    const onClose = () => {
        setOpenRequest('scale-0')
        reset()
    }

    const reset = () => {
        setUser('')
        setAmount('')
        setMessage('')
      }

    useEffect(()=> {
      if(isSuccess){
        refetchHistory()
        refetchRequests()
      }
    },[isSuccess])
    
  return (
    <div
    className={`fixed top-0 left-0 w-screen h-screen flex
  items-center justify-center z-50 bg-black bg-opacity-50
  transform transition-transform duration-300 ${openRequest}`}
  >
    <div
      className="bg-white shadow-xl shadow-black
      rounded-xl w-11/12 md:w-2/5 h-7/12 p-6"
    >
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Create Request</p>
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
          <input
            className="block w-full bg-transparent pl-3 p-1
          border-0 text-sm text-slate-500 focus:outline-none
          focus:ring-0"
            
            placeholder="User"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
        </div>

        <div
          className="flex justify-between items-center
        bg-gray-300 rounded-xl mt-5"
        >
          <input
            className="block w-full bg-transparent pl-3 p-1
          border-0 text-sm text-slate-500 focus:outline-none
          focus:ring-0"
            type="number"
            name="amount"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
          />
        </div>

        <div
          className="flex justify-between items-center
        bg-gray-300 rounded-xl mt-5"
        >
          <input
            className="block w-full bg-transparent pl-3 p-1
          border-0 text-sm text-slate-500 focus:outline-none
          focus:ring-0"
            type="text"
            name="message"
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            required
          />
        </div>

        <button
          type="submit"
          className="inline-block px-6 py-2.5 bg-green-500
          text-white font-medium text-md leading-tight
          rounded-full shadow-md hover:bg-green-700 mt-5"
        >
          Submit Project
        </button>
      </form>
    </div>
  </div>
  )
}

export default CreateRequest