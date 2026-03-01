'use client'

import {
  BtnsWrapper,
  HeaderIcons,
  HeaderWrapper,
  LogoStyle,
  MenuBtn, MenuLink
} from "@/app/styles/Header.style";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Header() {
  const path = usePathname();

  return(
    <HeaderWrapper>
      <LogoStyle>
        PocketLog
      </LogoStyle>

      <BtnsWrapper>
        <MenuBtn>
          <MenuLink
            href={"/"}
            $active={path == '/'}
          >
            <HeaderIcons
              src={"/icons/home.svg"}
              alt={"홈 아이콘"}
            />
            Dashboard
          </MenuLink>
        </MenuBtn>
      </BtnsWrapper>
    </HeaderWrapper>
  );
}