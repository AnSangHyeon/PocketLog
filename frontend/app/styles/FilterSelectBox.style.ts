import {styled} from "styled-components";
import {theme} from "@/app/styles/theme";

export const FilterSelectWrap = styled.select`
  padding: 4px 4px;
  width: 130px;
  font-size: 16px;
  background-color: ${(props) => theme.colors.menu.activeBg};
  border-radius: 12px;
  border: 3px solid ${(props) => theme.colors.menu.activeText};
  margin: 4px 5px 4px 0;
  outline: none;
  height: 38px;
`;