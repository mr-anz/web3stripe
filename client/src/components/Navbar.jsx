
import { Web3Button } from '@web3modal/react'
import { useStateContext } from '../context'
import { useAccount, useBalance, useContractRead } from 'wagmi'

const Navbar = () => {
  const {account, setAccount, balance, setName, contractAddress, contractAbi, setBalance} = useStateContext()
  const { address } = useAccount()
  setAccount(address)

  const { data: myName } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getMyName',
    args: [account]
 })
setName(myName?.name)

  const { data } = useBalance({
    address : account
  })
  setBalance(data)

  return (
  <div className="navbar z-50 bg-[#b6e810] glass rounded-sm">
    <div className="navbar-start z-50">
      <div className="dropdown z-50">
        <label tabIndex={0} className="btn btn-ghost z-20 lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu z-50 menu-sm dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Summary</a></li>
          <li><a>Activity</a></li>
          <li><a>Send & Request</a></li>
          <li><a>Wallet</a></li>
        </ul>
      </div>
      <a className="btn btn-ghost normal-case text-xl">Timeless</a>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li><a>Summary</a></li>
        <li><a>Activity</a></li>
        <li><a>Send & Request</a></li>
        <li><a>Wallet</a></li>
      </ul>
    </div>
    <div className="navbar-end ">
      <Web3Button/>
    </div>
  </div>
  )
}

export default Navbar