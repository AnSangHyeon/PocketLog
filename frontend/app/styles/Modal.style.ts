import styled from "styled-components";

// 모달 바깥 어두운 배경
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 검정
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // 최상단에 뜨도록
`;

// 실제 모달 하얀 박스
export const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 16px;
  width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;

  h2 {
    margin-bottom: 10px;
    font-size: 1.25rem;
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #666;
    display: flex;
    justify-content: space-between;
    
    // 라벨 부분 강조 (예: 날짜, 금액 등)
    &::before {
      content: attr(data-label);
      font-weight: bold;
      color: #333;
    }
  }
`;

// 버튼 그룹 스타일링
export const ModalButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;

  button {
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
  
  .edit-btn {
    background-color: #4A90E2;
    color: white;
  }

  .delete-btn {
    background-color: #FF4D4D;
    color: white;
  }

  .close-btn {
    background-color: #eee;
    color: #666;
  }
`;