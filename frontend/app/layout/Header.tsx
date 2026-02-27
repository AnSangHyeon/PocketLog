import {
  HeaderWrapper,
  LogoStyle,
  RightMenu
} from "@/app/layout/Header.style";
import Link from "next/link";

export default function Header() {
  return(
    <HeaderWrapper>
      <LogoStyle>Personal Finance Dashboard</LogoStyle>

      <RightMenu>
        {/*<SignBtns>*/}
        {/*  <Link href={"/"}>로그인</Link>*/}
        {/*</SignBtns>*/}
        <img
          src={"/icons/bars-solid-full.svg"}
          alt={"menu"}
          width={30}
          height={30}
        />
      </RightMenu>
    </HeaderWrapper>
  );
}