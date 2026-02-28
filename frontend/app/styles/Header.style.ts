import { styled } from 'styled-components';
import Link from "next/link";
import {theme} from "@/app/styles/theme";

export const LogoStyle = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  letter-spacing: 1px;
  height: 60px;
  background: #000;
`;

export const HeaderWrapper = styled.div`
  width: 250px;
  background-color: ${(props) => props.theme.colors.card};
  min-height: 100vh;
`;

export const BtnsWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 0 0;
  gap: 7px;
`;

export const MenuBtn = styled.div`
  width: 95%;
  height: 40px;
  font-size: 23px;
`;

export const HeaderIcons = styled.img`
  width: 28px;
  height: 28px;
  display: inline;
  margin: 2px 2px 0 0;
`;

export const MenuLink = styled(Link)<{$active: boolean}>`
  display: flex;
  align-items: center;
  padding-left: 8px;
  height: 100%;
    border-radius: 7px;

  color: ${({ $active }) => 
    ($active ? (props) => theme.colors.menu.activeText : '')
  };
  background: ${({ $active }) =>
          ($active ? (props) => theme.colors.menu.activeBg : '')
  };
`;
