'use client'

import {DashBoardWrap, FinanceCardWrap, LeftSection, RightSection} from "@/app/styles/Dashboard.style";
import FinanceCard from "@/app/components/FinanceCard";
import {AddTransactionForm} from "@/app/styles/AddTransaction.style";
import AddTransaction from "@/app/components/AddTransaction";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Home() {
  // 1. 수입, 지출, 잔액을 담을 상태
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0
  });

  // 2. 요약 데이터만 가져오는 함수
  const fetchSummary = async () => {
    console.log("1. 함수 시작됨");
    try {
      const res = await axios.get('http://localhost:8080/api/dashboard');
      console.log("2. 서버 응답 성공!", res.data);
      setSummary({
        income: res.data.totalIncome,
        expense: res.data.totalExpense,
        balance: res.data.balance
      });
    } catch (err) {
      console.error("요약 데이터 로딩 실패", err);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <DashBoardWrap>
      <FinanceCardWrap>
        <LeftSection>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '20px'
            }}
          >
            <FinanceCard title={"수입"} amount={summary.income} type={"income"} />
            <FinanceCard title={"지출"} amount={summary.expense} type={"expense"} />
            <FinanceCard title={"잔액"} amount={summary.balance} type={"balance"} />
          </div>
        </LeftSection>

        <RightSection>
          <div>
            <AddTransaction onSaveSuccess={fetchSummary} />
            <div>
              그래프
            </div>
          </div>
        </RightSection>
      </FinanceCardWrap>
    </DashBoardWrap>
  );
}
