import { styled } from 'styled-components';
import {theme} from "@/app/styles/theme";

export const MonthFilterWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 10px;
  img {
    width: 30px;
  }
  
  div {
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
  }
`;