const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs")
const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")

// console.log(time)
// console.log("______________________________")
// console.log(loadFixture)

describe("MyTest", async () => {
    async function runEvryTime() {
        const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60
        const ONE_GWEI = 1000000000
        const unlockedTime = (await time.latest()) + ONE_YEAR_IN_SECONDS
        const lockAmount = ONE_GWEI.toString()


        const [owner, otherAccount] = await ethers.getSigners()

        const MyTest = await ethers.getContractFactory("MyTest")
        const myTest = await MyTest.deploy(unlockedTime, {value: lockAmount})

        return {myTest, unlockedTime, lockAmount, owner, otherAccount}
    } 

    describe("deployment", async () => {

        it("it should check unlock time", async () => {
            const {myTest, unlockedTime} = await loadFixture(runEvryTime)

            //assert.equal( await myTest.unlockedTime(), unlockedTime)
            // expect(await myTest.unlockedTime()).to.equal(unlockedTime)
            const ab = expect(await myTest.unlockedTime()).to.equal(unlockedTime)
            console.log(ab)

        })

        it("should set the right owner", async () => {
            const {myTest, owner} = await loadFixture(runEvryTime)

            expect(await myTest.owner()).to.equal(owner.address)
        })

        it("should receive and store fund in to MyTest", async () => {
            const { myTest, lockAmount} = await loadFixture(runEvryTime)

            //const contractBal = await ethers.provider.getBalance(myTest.address)


            assert.equal( await ethers.provider.getBalance(myTest.address), lockAmount)
        })

        it("should fail if unlockTime in not in the future", async () => {
            const latestTime = await time.latest()    
            
            const MyTest = await ethers.getContractFactory("MyTest")


            await expect( MyTest.deploy(latestTime, { value: 1})).to.be.revertedWith("Unlocked time should be in future")
        })
    })

    runEvryTime() 

})