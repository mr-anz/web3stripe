import React, { useEffect, useState } from 'react'
import { FaTimes } from "react-icons/fa";
import { useStateContext } from '../context';
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'


const SetUsername = () => {
    const {openModal, account, setName, setOpenModal, contractAddress, contractAbi} = useStateContext()
    const [username, setUsername] = useState()

    const { config } = usePrepareContractWrite({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'addName',
      args: [username]
    })
    
    const { write,data } = useContractWrite(config)

    const { isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    const { refetch: refetchName } = useContractRead({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'getMyName',
      args: [account],
      onSuccess(data) {
        setName(data.name)
      },
    });

 
    const handleSubmit = async (e) => {
      e.preventDefault()
      if(account){
        if (!username) return
        await write()
        onClose()
    } else{
        alert('Connect to metamask')
    }   

    }

    const onClose = () => {
        setOpenModal('scale-0')
        reset()
    }

    const reset = () => {
        setUsername('')
    }

    useEffect(()=> {
      if(isSuccess){
        refetchName()
      }
    },[isSuccess])

    
  return (
    <div
    className={`fixed top-0 left-0 w-screen h-screen flex
      items-center justify-center z-50 bg-black bg-opacity-50
      transform transition-transform duration-300 ${openModal}`}
    >
    <div
      className="bg-white shadow-xl shadow-black
      rounded-xl w-11/12 md:w-2/5 h-7/12 p-6"
    >
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Set UserName</p>
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
            type="text"
            name="title"
            placeholder="Title"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </div>

        <button
          type="submit"
          className="inline-block px-6 py-2.5 bg-green-500
          text-white font-medium text-md leading-tight
          rounded-full shadow-md hover:bg-green-700 mt-5"
        >
          Submit 
        </button>
      </form>
    </div>
  </div>
  )
}

export default SetUsername