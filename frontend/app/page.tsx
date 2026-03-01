'use client'

import {DashBoardWrap, FinanceCardWrap, LeftSection, RightSection} from "@/app/styles/Dashboard.style";
import FinanceCard from "@/app/components/FinanceCard";
import {AddTransactionForm} from "@/app/styles/AddTransaction.style";
import AddTransaction from "@/app/components/AddTransaction";
import {useEffect, useState} from "react";
import axios from "axios";
import {FilterSection, ListBody, ListHead, ListSection, ListWrapper} from "@/app/styles/TransactionsList.style";
import {theme} from "@/app/styles/theme";
import {FilterButtonGroup, FilterCategorySelect, MonthFilter} from "@/app/components/Filters";

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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filterType, setfilterType] = useState("all");
  const [currentCategory, setCurrentCategory] = useState("all");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // 이전달
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 2, 1));
  };

  // 다음달
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month, 1));
  };
  
  // 버튼 필터 값 변경
  const handleFilterChange = (newType:string) => {
    setfilterType(newType);
  };

  // 카테고리 필터 값 변경
  const handleCategoryChange = (newCategory: string) => {
    setCurrentCategory(newCategory);
  };
  
  // 수입, 지출, 잔액 요청하는 함수
  const fetchSummary = async () => {
    console.log("함수 시작됨");
    try {
      const res = await axios.get('http://localhost:8080/api/dashboard');
      fetchTransactions();
      console.log("res 서버 응답 성공", res.data);
      setSummary({
        income: res.data.totalIncome,
        expense: res.data.totalExpense,
        balance: res.data.balance
      });
    } catch (err) {
      console.error("요약 데이터 로딩 실패", err);
    }
  };

  // 필터링된 리스트 호출
  const fetchTransactions = async () => {
    try {
      // 백엔드 주소로 파라미터와 함께 요청 보냄
      const response = await axios.get('http://localhost:8080/api/transactions', {
        params: {
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1,
          type: filterType,
          category: currentCategory
        }
      });

      // 서버에서 준 데이터를 상자(state)에 담기
      setTransactions(response.data);
    } catch (error) {
      console.error("데이터 로딩 실패!", error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  // 필터값 바뀌면 호출
  useEffect(() => {
    fetchTransactions();
  }, [currentDate, filterType, currentCategory]);

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
            <FilterSection>
              {/* 달별 필터링 */}
              <MonthFilter
                handlePrevMonth={handlePrevMonth}
                handleNextMonth={handleNextMonth}
                year={year}
                month={month}
              />

              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center'
                }}
              >
                {/* 전체, 수입, 지출 필터링 버튼 */}
                <FilterButtonGroup
                  currentType={filterType}
                  handleFilterChange={handleFilterChange}
                />

                {/* 카테고리별 필터링 */}
                <FilterCategorySelect
                  currentCategory={currentCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </div>
            </FilterSection>
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
                    <div>
                      {
                        item.category === "food" ?
                        "식비" :
                        item.category === "shopping" ?
                        "쇼핑" :
                        item.category === "transport" ?
                        "교통비" :
                        item.category === "etc" ?
                        "기타지출" : ""
                      }
                    </div>
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
