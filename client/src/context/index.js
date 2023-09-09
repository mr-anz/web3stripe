import { createContext, useContext, useState } from "react";
import abi from '../artifacts/abi.json'
import address from '../artifacts/contractAddress.json'
const StateContext = createContext()

export const CreateContext = ({children}) => {
    const [openModal,setOpenModal] = useState('scale-0')
    const [account, setAccount] = useState('')
    const [balance, setBalance] = useState('')
    const [name, setName] = useState('')
    const [history, setHistory] = useState([])
    const [requests, setRequests] = useState(null)
    const [openRequest, setOpenRequest] = useState('scale-0')
    const [openPay, setOpenPay] = useState('scale-0')
    const [requestor, setRequestor] = useState()
    const [openFriend, setOpenFriend] = useState('scale-0')


    
    const contractAddress = address.address
    const contractAbi = abi
    return (
        <StateContext.Provider value={{
            openModal, setOpenModal, account, setAccount, balance, setBalance, 
            contractAbi, contractAddress, name, setName, history, setHistory, 
            requests, setRequests, openRequest, setOpenRequest, openPay, setOpenPay,
            setRequestor, requestor, openFriend, setOpenFriend
        }}
        >
            {children}
        </StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext)