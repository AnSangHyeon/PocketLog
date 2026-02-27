import { styled } from 'styled-components';

export const LogoStyle = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  letter-spacing: 1px;
`;

export const HeaderWrapper = styled.div`
  border-bottom: 1px solid #E5E7EB;
  width: 100%;
  background-color: ${(props) => props.theme.colors.card};
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

// export const SignBtns = styled.button`
  // border-radius: ${(props) => props.variables.radius.lg};

// `;

export const RightMenu = styled.div`
  display: flex;
  gap: 10px;
`;