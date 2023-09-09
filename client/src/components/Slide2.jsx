import React, { useState } from 'react'
import { useStateContext } from '../context'

const members = [
    {
        avatar: "/public/la.jpeg",
        name: "John lorin",
        email: "chri...mple.co"
    }, {
        avatar: "/public/la.jpeg",
        name: "Chris bondi",
        email: "chri...mple.co"
    }, {
        avatar: "/public/la.jpeg",
        name: "yasmine",
        email: "chri...mple.co"
    }, {
        avatar: "/public/la.jpeg",
        name: "Joseph",
        email: "chri...mple.co"
    },
]


const Slide2 = () => {
    const { history, setRequestor, setOpenFriend, account, name } = useStateContext()

    const excludedAddress = account
    const uniqueNameAddress = new Set();
    const filteredList = [];
    
    history?.forEach(entry => {
        if (entry.otherPartyAddress !== excludedAddress) {
            const nameAddress = `${entry.otherPartyName}-${entry.otherPartyAddress}`;
    
            if (!uniqueNameAddress.has(nameAddress)) {
                uniqueNameAddress.add(nameAddress);
                filteredList.push({ name: entry.otherPartyName, address: entry.otherPartyAddress });
            }
        }
    });
    console.log(filteredList)

    const handleClick = (address) => async(e) => {
        e.preventDefault()
        setRequestor(address)
        setOpenFriend('scale-100')
    }

return (
    <div className='pt-20'>
        <div className="avatar flex items-center justify-center">
            <div className="w-[150px] mask mask-hexagon">
                <img src={'identi.png'} alt='Profile'/>
            </div>
            
        </div>
        <div className="flex flex-col items-center text-white justify-center">
            <p className='text-lg '>Username : { name || 'Username not set'}</p>
            <p className='text-sm '>Address : {account?.slice(0,6) +'....' + account?.slice(38) || '0x...'}</p>
        </div>
        <div className=" mx-auto p-4">

         <ul className="mt-5 bg-[#b6e810] glass border border-gray-300 rounded-xl px-2 overflow-none">
            <div className="flex items-center pt-3 justify-center my-5 sm:flex">
                <p className="font-bold text-[28px] px-1 capitalize">friend list</p>
            </div>
            {   
                filteredList?.map((item, idx) => (
                    <li key={idx} className="py-3 flex  flex-wrap items-start justify-between">
                        <div className="flex p-1 gap-3 items-center">
                            <img src='profi.svg' alt='user' className=" w-12 h-12 bg-black rounded-full" />
                            <div>
                                <span className="block text-sm text-black font-semibold">{item.name}</span>
                                <span className="block text-sm text-gray-600">{(item.address).slice(0,6) + '....' + (item.address).slice(38)}</span>
                            </div>
                        </div>
                        <button className='btn px-4 glass bg-[#11ade6]' onClick={handleClick(item.address)}>Request</button>
                    </li>
                ))
            }
        </ul>
        </div>
    </div>
  )
}

export default Slide2