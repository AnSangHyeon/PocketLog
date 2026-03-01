import { styled } from 'styled-components';
import {theme} from "@/app/styles/theme";

export const ListWrapper = styled.div`
  border-radius: 12px;
  text-align: center;
  border: 3px solid ${(props) => theme.colors.menu.activeBg};

`;

export const ListSection = styled.div`
  border-radius: 12px;
  text-align: center;
  border: 3px solid ${(props) => theme.colors.menu.activeBg};
  margin: 10px;
  font-size: 17px;
    
  div:last-child {
    border-radius: 0 0 12px 12px;
  }
`;

export const ListHead = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;

  div {
    padding: 8px 6px;
    width: 100%;
    font-weight: bold;
    font-size: 17px;
    vertical-align: center;
  }
`;

export const ListBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  border-top: 3px solid ${(props) => theme.colors.menu.activeBg};

  div {
    padding: 8px 6px;
    width: 100%;
    font-size: 17px;
    vertical-align: center;
    word-break: break-all
  }
`;

export const FilterSection = styled.div`
  border-radius: 12px;
  text-align: center;
  border: 3px solid ${(props) => theme.colors.menu.activeBg};
  margin: 10px;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
`;