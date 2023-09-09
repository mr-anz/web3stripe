// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Stripe is Ownable{
    //Owner of the smart contract
   

    constructor () {
       
    }

    struct request {
        address requestor;
        uint256 amount;
        string message;
        string name;
    }

    struct sendReceive {
        string action;
        uint256 amount;
        string message;
        address otherPartyAddress;
        string otherPartyName;
    }

    struct userName {
        string name;
        bool hasName;
    }

    //Mappings
    mapping(address => userName) public names;
    mapping(address => request[]) public requests;
    mapping(address => sendReceive[]) public history;

    //Functions
    //->Adds name to the user
    function addName(string memory _name) public {

        userName storage newUserName = names[msg.sender];
        newUserName.name = _name;
        newUserName.hasName = true;
    } 

    //->Create a request
    function createRequest(address user, uint256 _amount, string memory _message) public {

        request memory newRequest;
        newRequest.requestor = msg.sender;
        newRequest.amount = _amount;
        newRequest.message = _message;
        if(names[msg.sender].hasName) {
            newRequest.name = names[msg.sender].name;
        }

        requests[user].push(newRequest);
    } 

    //->Pay for the request
    function payRequest(uint256 _request) payable public {

        require(_request < requests[msg.sender].length, 'No Such Request');
        request[] storage myRequests = requests[msg.sender];
        request storage payableRequest = myRequests[_request];

        uint256 toPay = payableRequest.amount * 1e18;
        require(msg.value == (toPay), 'Pay Correct Amount');

        payable(payableRequest.requestor).transfer(msg.value);
        addHistory(msg.sender, payableRequest.requestor, toPay, payableRequest.message);

        myRequests[_request] = myRequests[myRequests.length -1];
        myRequests.pop();
    }

    //Reject requests
    function rejectRequest(address user, uint256 requestId) public {
        require(requestId < requests[user].length, 'No Such Request');
        request[] storage userRequests = requests[user];
        request storage rejectedRequest = userRequests[requestId];

        // Move the last request in the array to the position of the rejected request
        userRequests[requestId] = userRequests[userRequests.length - 1];
        userRequests.pop(); // Remove the last element

        addHistory(user, msg.sender, rejectedRequest.amount, "Request Rejected");
    }

    //Add to history 
    function addHistory(address sender, address receiver, uint256 _amount, string memory _message) private {

        sendReceive memory newSend;
        newSend.action = 'SEND';
        newSend.amount = _amount; 
        newSend.message = _message;
        newSend.otherPartyAddress = receiver;
        if(names[receiver].hasName) {
           newSend.otherPartyName = names[receiver].name;
        }
        history[sender].push(newSend);

        sendReceive memory newReceiver;
        newReceiver.action = 'Receiver';
        newReceiver.amount = _amount;
        newReceiver.message = _message;
        newReceiver.otherPartyAddress = sender;
        if(names[sender].hasName) {
            newSend.otherPartyName = names[sender].name;
        }
        history[receiver].push(newReceiver); 
    }   

    //Get all requests send to user
    function getMyRequests(address user) public view returns(
        address[] memory,
        uint256[] memory,
        string[] memory,
        string[] memory
    ) {
        address[] memory addrs = new address[](requests[user].length);
        uint256[] memory amnt = new uint256[](requests[user].length);
        string[] memory msge = new string[](requests[user].length);
        string[] memory nme = new string[](requests[user].length);

        for(uint256 i = 0; i < requests[user].length; i++) {
            request storage myRequests = requests[user][i];
            addrs[i] = myRequests.requestor;
            amnt[i] = myRequests.amount;
            msge[i] = myRequests.message;
            nme[i] = myRequests.name;
        }

        return (addrs, amnt, msge, nme);
    }

    //get all transaction history of user
    function getHistory(address user) public view returns(sendReceive[] memory ){
        return history[user];
    }

    function getMyName(address user) public view returns(userName memory) {
        return names[user];
    }

}