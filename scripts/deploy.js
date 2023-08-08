const  hre = require("hardhat");

//console.log(hre)

async function main() {
  const currentTimestampInSecond = Math.round(Date.now() / 1000)
  const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60
  const unlockTime = currentTimestampInSecond + ONE_YEAR_IN_SECONDS
  const lockAmount = hre.ethers.utils.parseEther("1").toString()

//   console.log(currentTimestampInSecond)
//   console.log(ONE_YEAR_IN_SECONDS)
//   console.log(unlockTime)
//   console.log(lockAmount.toString())

const MyTest = await hre.ethers.getContractFactory("MyTest");
const myTest = await MyTest.deploy(unlockTime, {value: lockAmount})

await myTest.deployed()

console.log(`contract contain 1 ETH and address ${myTest.address}`)
console.log(myTest)

}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })