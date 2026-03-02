import { styled } from 'styled-components';
import Link from "next/link";
import {theme} from "@/app/styles/theme";

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  margin-bottom: 40px;
  cursor: pointer;
  user-select: none;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

export const LogoText = styled.h1`
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -1.2px;
  margin: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  
  .point {
    color: ${(props) => props.theme.colors.primary};
  }

  .sub {
    color: ${(props) => props.theme.colors.text.primary};
    font-weight: 500;
  }
`;

export const HeaderWrapper = styled.div`
  width: 250px;
  background-color: ${(props) => props.theme.colors.card};
  min-height: 100vh;
  position: sticky;
  top: 0;
  align-self: flex-start;
`;

export const HeaderClock = styled.div`
  font-size: 24px;
  display: flex;
  width: 100%;
  justify-content: start;
  padding: 0 0 0 15px;
  align-items: center;
    
  img {
    width: 30px;
    padding: 2px 0 0 0;
  }
`;
