require('dotenv').config({ path: '../.env' }); // 상위 폴더의 .env 로드

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const INFURA_URL = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;

async function getBlockInfo() {
    try {
        // 1. 최신 블록 번호 조회 (eth_blockNumber)
        const blockNumResponse = await fetch(INFURA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "eth_blockNumber",
                params: [],
                id: 1
            })
        });
        
        const blockNumData = await blockNumResponse.json();
        const latestBlockHex = blockNumData.result;
        const latestBlockNumber = parseInt(latestBlockHex, 16); // 16진수를 10진수로 변환
        
        console.log(`[JSON-RPC] 최신 블록 번호: ${latestBlockNumber} (Hex: ${latestBlockHex})`);

        // 2. 해당 블록의 트랜잭션 수 조회 (eth_getBlockTransactionCountByNumber)
        const txCountResponse = await fetch(INFURA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "eth_getBlockTransactionCountByNumber",
                params: [latestBlockHex],
                id: 2
            })
        });

        const txCountData = await txCountResponse.json();
        const txCount = parseInt(txCountData.result, 16);
        
        console.log(`[JSON-RPC] 해당 블록의 트랜잭션 수: ${txCount}`);

    } catch (error) {
        console.error("에러 발생:", error);
    }
}

getBlockInfo();