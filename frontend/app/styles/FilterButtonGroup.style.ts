import { styled } from 'styled-components';
import {theme} from "@/app/styles/theme";

export const FilterBtn = styled.button<{ $active:boolean }>`
  padding: 4px 0;
  width: 55px;
  font-size: 16px;
  background: ${props => 
    props.$active ?
    theme.colors.menu.activeBg :
    theme.colors.card   
  };
  border-radius: 12px;
  border: 3px solid ${(props) => 
    props.$active ?
    theme.colors.menu.activeText:
    theme.colors.menu.activeBg
  };
  margin: 4px 0;
    
  &:hover {
    background-color: ${(props) => theme.colors.menu.activeBg};
  }
`;