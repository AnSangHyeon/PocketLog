import { styled } from 'styled-components';
import {theme} from "@/app/styles/theme";

export const DashBoardWrap = styled.div`
  padding: 20px;
  max-width: 100%;
`;

export const FinanceCardWrap = styled.div`
  display: grid;
  grid-template-columns: 1.9fr 1fr;
  min-height: calc(100vh - 40px);
`;

export const LeftSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  border-radius: 20px;
  padding:20px;
  margin: 0 20px 0 0;
`;

export const RightSection = styled.aside`
  width: 100%;
`;