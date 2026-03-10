const path = require('path');
// ethers와 동일하게 절대 경로 방식으로 .env 위치를 지정합니다.
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const INFURA_URL = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;

async function getBlockInfo() {
    try {
        // 1. 최신 블록 번호 조회 (eth_blockNumber)
        const responseNumber = await fetch(INFURA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "eth_blockNumber",
                params: [],
                id: 1
            })
        });

        const dataNumber = await responseNumber.json();
        
        // 결과가 에러일 경우 처리
        if (dataNumber.error) {
            throw new Error(dataNumber.error.message);
        }

        const latestBlockHex = dataNumber.result;
        const latestBlockNumber = parseInt(latestBlockHex, 16);
        console.log(`[JSON-RPC] 최신 블록 번호: ${latestBlockNumber}`);

        // 2. 해당 블록의 트랜잭션 수 조회 (eth_getBlockTransactionCountByNumber)
        const responseCount = await fetch(INFURA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "eth_getBlockTransactionCountByNumber",
                params: [latestBlockHex],
                id: 1
            })
        });

        const dataCount = await responseCount.json();
        const txCountHex = dataCount.result;
        const txCount = parseInt(txCountHex, 16);
        console.log(`[JSON-RPC] 해당 블록의 트랜잭션 수: ${txCount}`);

    } catch (error) {
        console.error("에러 발생:", error.message);
    }
}

getBlockInfo();