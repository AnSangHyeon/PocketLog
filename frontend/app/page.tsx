'use client'

import {DashBoardWrap, FinanceCardWrap} from "@/app/styles/Dashboard.style";
import FinanceCard from "@/app/components/FinanceCard";

export default function Home() {
  return (
    <DashBoardWrap>
      <h1>Dashboard</h1>
      <FinanceCardWrap>
        <FinanceCard
          title={"히히"}
          amount={123}
          type={"balance"}
        />
      </FinanceCardWrap>
    </DashBoardWrap>
  );
}
