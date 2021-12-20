// create a method that will be called by the web server

// in this method:
// - read the accounts.txt file DONE
// put the N accounts into an array DONE
// get the totalsupply remaining for the token owner
// calculate 5% of that totalSupply
// loop N times, and execute N transactions transferring the token from owner to address in array
// collect tea and medals

let fs = require("fs");

let BigNumber = require("big-number")

let method = require('./method.js');
let contract = require('./contract.js');

// this sets up my .env file
require('dotenv').config()

// let's load our environment variables
infuraToken = "a60f5e73c65844da8378c277bd86c418"
contractAddress = "0x1d7f2091dc565664feff440712c95569b73b1679"
ownerAddress = "0x4EB3c311Cd849CB15dF4a8272DB029e080276f1d"
privateKey = Buffer.from("be89933aed448788784f91c6ccdc3990d82d557b29c3e8e123b41ccac1100d69", 'hex')

const distribute = async() => {
    // read in the file
    let distributionAddresses = fs.readFileSync('accounts.txt', 'utf8').split(' ');

    console.log(`distro addresses are: ${ distributionAddresses}`);

    // get the balance of the token owner
    let ownerBalance = await contract.getBalanceOfAccount(ownerAddress);
    let ob = new BigNumber(ownerBalance);
    console.log(`owner balance is ${ob}`);


    // get the symbol of the token
    let tokenSymbol = await contract.getSymbol();
    console.log(`symbol is ${tokenSymbol}`);

    // get five percent of this balance
    let fivePerCent = ob.div(20);
    console.log(`five per cent of owner balance is ${fivePerCent}`);

    // work out how many addresses in file (N)
    let numberOfAddresses = distributionAddresses.length;
    console.log(`number of addresses in file is ${numberOfAddresses}`);

    // divide the 5% by N to get distroAmount
    let distributionAmount = fivePerCent.div(numberOfAddresses)
    console.log(`distribution amount per address is ${distributionAmount}`);

    for (looper = 0; looper < numberOfAddresses; looper++) {
        console.log(`about to distribute ${tokenSymbol}, ${distributionAmount} tokens go to ${distributionAddresses[looper]}`)
        // execute a ERC20transfer(ownerAddress, distributionAddresss[looper], distributionAmount);
        let retval = await method.transferToken(distributionAddresses[looper], distributionAmount)
    }
}

distribute()
//module.exports = { distribute }