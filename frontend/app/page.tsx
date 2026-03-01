'use client'

import {DashBoardWrap, FinanceCardWrap, LeftSection, RightSection} from "@/app/styles/Dashboard.style";
import FinanceCard from "@/app/components/FinanceCard";
import {AddTransactionForm} from "@/app/styles/AddTransaction.style";
import AddTransaction from "@/app/components/AddTransaction";
import {useEffect, useState} from "react";
import axios from "axios";
import {ListBody, ListHead, ListSection, ListWrapper} from "@/app/styles/TransactionsList.style";
import {theme} from "@/app/styles/theme";
import {MonthFilter} from "@/app/components/Filters";

interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  memo: string;
  type: string;
}
export default function Home() {
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 수입, 지출, 잔액 요청하는 함수
  const fetchSummary = async () => {
    console.log("함수 시작됨");
    try {
      const res = await axios.get('http://localhost:8080/api/dashboard');
      const transactionsRes = await axios.get('http://localhost:8080/api/getAllTransactions');
      console.log("res 서버 응답 성공", res.data);
      console.log("transactionsRes 서버 응답 성공", transactionsRes.data);
      setTransactions(transactionsRes.data);
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

          <ListWrapper>
            <ListSection>
              <MonthFilter />
            </ListSection>
            <ListSection>
              <ListHead>
                <div>날짜</div>
                <div>금액</div>
                <div>카테고리</div>
                <div>메모</div>
              </ListHead>

              {transactions.length > 0 ? (
                transactions.map((item) => (
                  <ListBody
                    key={item.id}
                    style={
                      item.type === "income" ?
                      {background: theme.colors.status.income}
                      :
                      {background: theme.colors.status.expense}
                    }
                  >
                    <div>{item.date}</div>
                    <div>{item.amount.toLocaleString()}원</div>
                    <div>{item.category}</div>
                    <div>{item.memo}</div>
                  </ListBody>
                ))
              ) : (
                <ListBody>
                  리스트가 존재하지않습니다
                </ListBody>
              )}
            </ListSection>
          </ListWrapper>
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
