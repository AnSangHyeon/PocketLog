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

        <MenuBtn>
          <MenuLink
            href={"/Transactions"}
            $active={path == '/Transactions'}
          >
            <HeaderIcons
              src={"/icons/arrow.svg"}
              alt={"화살표 아이콘"}
            />
            Transactions
          </MenuLink>
        </MenuBtn>

        <MenuBtn>
          <MenuLink
            href={"/AddTransaction"}
            $active={path == '/AddTransaction'}
          >
            <HeaderIcons
              src={"/icons/plus.svg"}
              alt={"더하기 아이콘"}
            />
            AddTransaction
          </MenuLink>
        </MenuBtn>
      </BtnsWrapper>
    </HeaderWrapper>
  );
}