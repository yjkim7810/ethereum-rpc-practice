require('dotenv').config({ path: '../.env' });
const { ethers } = require('ethers');

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const INFURA_URL = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;

// ethers v6 기준 Provider 생성
const provider = new ethers.JsonRpcProvider(INFURA_URL);

async function getBlockInfo() {
    try {
        // 1. 최신 블록 번호 조회
        const latestBlockNumber = await provider.getBlockNumber();
        console.log(`[ethers.js] 최신 블록 번호: ${latestBlockNumber}`);

        // 2. 해당 블록의 정보 및 트랜잭션 수 조회
        const block = await provider.getBlock(latestBlockNumber);
        const txCount = block.transactions.length;
        
        console.log(`[ethers.js] 해당 블록의 트랜잭션 수: ${txCount}`);

    } catch (error) {
        console.error("에러 발생:", error);
    }
}

getBlockInfo();