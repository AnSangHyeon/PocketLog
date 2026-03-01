import styled from "styled-components";

// 모달 바깥 어두운 배경
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0; 
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

// 컨텐츠 박스: AI스러운 p 태그 가상 요소 삭제
export const ModalContent = styled.div`
  background: #fff;
  padding: 40px 5px 0 5px;
  border-radius: 20px;
  width: 100%;
  max-width: 550px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const XIcon = styled.img`
  width: 35px;
  position: absolute;
  right: 5px;
  top: 5px;
`;