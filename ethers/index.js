// 환경 변수 로드를 위한 모듈
const path = require('path');
// 상위 폴더에 있는 .env 파일을 절대 경로로 정확히 지집합니다.
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { ethers } = require('ethers');

// .env 파일에서 API 키를 가져옵니다.
const INFURA_API_KEY = process.env.INFURA_API_KEY;
// 이 주소에 들어가는 키는 'API Key Secret'이 아니라 반드시 'API Key'여야 합니다.
const INFURA_URL = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;

// ethers v6 기준 Provider 생성 (블록체인 읽기 전용 연결)
const provider = new ethers.JsonRpcProvider(INFURA_URL);

async function getBlockInfo() {
    try {
        console.log("이더리움 네트워크에 연결 중...");

        // 1. 최신 블록 번호 조회
        const latestBlockNumber = await provider.getBlockNumber();
        console.log(`[ethers.js] 최신 블록 번호: ${latestBlockNumber}`);

        // 2. 해당 블록의 상세 정보 조회
        const block = await provider.getBlock(latestBlockNumber);
        
        if (block) {
            // 블록 내의 transactions 배열 길이를 통해 트랜잭션 수를 확인합니다.
            const txCount = block.transactions.length;
            console.log(`[ethers.js] 해당 블록의 트랜잭션 수: ${txCount}`);
        } else {
            console.log("블록 정보를 가져올 수 없습니다.");
        }

    } catch (error) {
        // 네트워크 에러나 API 키 오류 시 에러 메시지 출력
        console.error("에러 발생:", error.message);
        if (error.message.includes("401")) {
            console.log("힌트: Infura API Key가 올바른지 확인하세요 (Secret이 아닌 API Key 사용).");
        }
    }
}

// 함수 실행
getBlockInfo();