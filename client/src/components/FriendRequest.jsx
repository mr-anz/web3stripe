import React, { useState } from 'react'
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useStateContext } from '../context'
import { FaTimes } from 'react-icons/fa'

const FriendRequest = () => {
    const {openFriend, setOpenFriend, account, name, setRequestor, requestor, setOpenRequest, openRequest, setRequests, setHistory, setName, setOpenModal, contractAddress, contractAbi} = useStateContext()
    
    const [amount, setAmount] = useState()
    const [message,setMessage] = useState()

    const { config } = usePrepareContractWrite({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'createRequest',
      args: [requestor, amount, message]
    })

    const {write} = useContractWrite(config)

    const { data } = useContractRead({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getHistory',
        args: [account]
     })
    setHistory(data)
     console.log(data)

    const { data: request } = useContractRead({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getMyRequests',
        args: [account]
     })
    setRequests(request)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!requestor || !amount || !message) return
          await write()
          await setHistory(data)
          await setRequests(request)
        onClose()
      }


    const onClose = () => {
        setOpenFriend('scale-0')
        reset()
    }

    const reset = () => {
        setRequestor()
        setAmount('')
        setMessage('')
      }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
      items-center justify-center z-50 bg-black bg-opacity-50
      transform transition-transform duration-300 ${openFriend}`}
    >
    <div
      className="bg-white shadow-xl shadow-black
      rounded-xl w-11/12 md:w-2/5 h-7/12 p-6"
    >
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Add Project</p>
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
            className="block w-full bg-transparent pl-3 p-2
            border-0 text-sm text-slate-800 focus:outline-none
            focus:ring-0"
          >
          {requestor}
          </div>
        </div>

        <div
          className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
        >
          <input
            className="block w-full bg-transparent pl-3 p-1
              border-0 text-sm text-slate-500 focus:outline-none
              focus:ring-0"
            type='number'
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
          Request
        </button>
      </form>
    </div>
  </div>
  )
}

export default FriendRequest