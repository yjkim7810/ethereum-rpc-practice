<<<<<<< HEAD
# Ethereum RPC Practice

## 프로젝트 설명
이 프로젝트는 Infura API를 사용하여 이더리움 메인넷의 최신 블록 번호와 해당 블록의 트랜잭션 수를 조회하는 실습입니다.
순수 JSON-RPC 통신 방식과 `ethers.js` 라이브러리를 사용한 방식을 비교합니다.

## 의존성 설치 방법
\`\`\`bash
npm install
\`\`\`

## 환경 변수 (.env) 설정 방법
루트 디렉토리에 \`.env\` 파일을 생성하고 아래와 같이 Infura API Key를 입력하세요.
\`\`\`env
INFURA_API_KEY=your_infura_api_key_here
\`\`\`

## 실행 방법
### 1. JSON-RPC 방식 실행
\`\`\`bash
node ./json-rpc/index.js
\`\`\`

### 2. ethers.js 방식 실행
\`\`\`bash
node ./ethers/index.js
\`\`\`
=======
