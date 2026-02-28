import { styled } from 'styled-components';
import {theme} from "@/app/styles/theme";

export const AddTransactionWrap = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AddTransactionForm = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 20px;
  padding:20px;
`;

export const AddTabWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0 30px 0;
`;

export const IncomeTab = styled.button`
  background: ${(props) => theme.colors.status.income};
  width: 49%;
  border-radius: 12px;
  font-size: 16px;
`;

export const ExpenseTab = styled.button`
  background: ${(props) => theme.colors.status.expense};
  width: 49%;
  height: 50px;
  border-radius: 12px;
  font-size: 16px;
`;

export const InputGroup = styled.div`
  position: relative;
  padding: 20px 0 0 0;
`;

export const CustomMount = styled.input`
  border: 3px solid ${(props) => theme.colors.menu.activeBg};
  height: 40px;
  width: 100%;
  outline: none;
  transition: all 0.8s;
  border-radius: 12px;
  padding: 10px;
  font-size: 20px;

  &:focus, &:hover {
    border: 3px solid ${(props) => theme.colors.menu.activeText};
    background-color: ${(props) => theme.colors.menu.activeBg};
  }
`;

export const WonIcon = styled.img`
  position: absolute;
  width: 28px;
  right: 7px;
  bottom: 6px;
  pointer-events: none;
`;

export const GroupTitle = styled.div`
  height: 25px;
  padding-left: 3px;
`;

export const CustomDateInput = styled.input`
  border: 3px solid ${(props) => theme.colors.menu.activeBg};
  height: 40px;
  width: 100%;
  border-radius: 12px;
  font-size: 18px;
  padding: 8px;
  outline: none;
  transition: all 0.8s;

  &::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    color: transparent;
    cursor: pointer;
  }

  &:focus, &:hover {
    border: 3px solid ${(props) => theme.colors.menu.activeText};
    background-color: ${(props) => theme.colors.menu.activeBg};
  }
`;

export const CalendarIcon = styled.img`
  position: absolute;
  width: 28px;
  right: 7px;
  bottom: 6px;
  pointer-events: none;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const CategoryChip = styled.button<{ $isActive: boolean }>`
  padding: 10px 18px;
  border-radius: 12px;
  border: 3px solid ${(props) => (props.$isActive ? theme.colors.menu.activeText : theme.colors.menu.activeBg)};
  background-color: ${(props) => (props.$isActive ? theme.colors.menu.activeBg : "white")};
  color: ${(props) =>
    (props.$isActive ? theme.colors.menu.activeText : theme.colors.text.primary)
  };
  font-size: 14px;
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => theme.colors.menu.activeBg};
  }
`;

export const Memo = styled.textarea`
  width: 100%;
  min-height: 100px; /* 최소 높이 설정 */
  padding: 12px;
  border: 3px solid ${theme.colors.menu.activeBg};
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  resize: none; /* 중요: 사용자가 마음대로 크기 조절하는 것 방지 (디자인 깨짐 방지) */
  transition: all 0.3s;
  background-color: white;

  /* 글자가 너무 길어지면 안 되니까 적당한 높이 고정 */
  line-height: 1.5;

  &::placeholder {
    color: ${theme.colors.text.secondary};
    font-size: 14px;
  }

  &:focus {
    border: 3px solid ${theme.colors.menu.activeText};
    background-color: #fff;
  }
`;