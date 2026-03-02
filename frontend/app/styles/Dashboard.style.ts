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
  height: calc(100vh - 40px);
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  overflow: hidden;
  margin-right: 20px;
`;

export const RightSection = styled.aside`
  width: 100%;
  position: sticky;
  top: 20px;
  align-self: flex-start;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ListDetailWrap = styled.div`
    flex: 1;
    overflow-y: auto;
    min-height: 0;

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${(props) => theme.colors.text.secondary};
        border-radius: 10px;
    }
`;