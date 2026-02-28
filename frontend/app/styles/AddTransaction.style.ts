import { styled } from 'styled-components';
import {theme} from "@/app/styles/theme";

export const AddTransactionWrap = styled.div`
  height: 100vh;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AddTransactionForm = styled.div`
  width: 800px;
  background: #fff;
`;

export const AddTabWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

export const IncomeTab = styled.button`
  background: ${(props) => theme.colors.status.income};
  width: 370px;
`;
export const ExpenseTab = styled.button`
  background: ${(props) => theme.colors.status.expense};
  width: 370px;
  height: 50px;
`;