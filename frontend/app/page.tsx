'use client'

import {DashBoardWrap, FinanceCardWrap, LeftSection, ListDetailWrap, RightSection} from "@/app/styles/Dashboard.style";
import FinanceCard from "@/app/components/FinanceCard";
import {AddTransactionForm} from "@/app/styles/AddTransaction.style";
import AddTransaction from "@/app/components/AddTransaction";
import {useEffect, useState} from "react";
import axios from "axios";
import {FilterSection, ListBody, ListHead, ListSection, ListWrapper} from "@/app/styles/TransactionsList.style";
import {theme} from "@/app/styles/theme";
import {FilterButtonGroup, FilterCategorySelect, MonthFilter} from "@/app/components/Filters";
import {ModalContent, ModalOverlay, XIcon} from "@/app/styles/Modal.style";
import DonutChart from "@/app/components/DonutChart";
import MonthlyBarChart from "@/app/components/MonthlyBarChart";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Transaction | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);

  // 행을 클릭했을 때 실행될 함수
  const handleRowClick = (item: Transaction) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

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
    setCurrentCategory("all");
  };

  // 카테고리 필터 값 변경
  const handleCategoryChange = (newCategory: string) => {
    setCurrentCategory(newCategory);
  };

  const fetchMonthlySummary = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/transactions/summary', {
        params: { year, month }
      });

      // 백엔드에서 온 [{name: 'income', value: 100}, {name: 'expense', value: 50}] 를 저장
      setBarChartData(response.data);
    } catch (error) {
      console.error("막대 차트 데이터를 가져오는데 실패했습니다.", error);
    }
  };
  
  // 수입, 지출, 잔액 요청하는 함수
  const fetchSummary = async () => {
    console.log("함수 시작됨");
    try {
      const res = await axios.get('http://localhost:8080/api/dashboard');
      fetchTransactions()
      fetchChartStats();
      fetchMonthlySummary();
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
  
  // 차트 호출
  const fetchChartStats = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/stats/category', {
        params: {
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1,
        }
      });

      const formatted = response.data.map((item: any) => ({
        name: item[0],
        value: item[1]
      }));

      setChartData(formatted);
    } catch (error) {
      console.error("차트 데이터 로딩 실패", error);
    }
  };

  useEffect(() => {
    fetchSummary();
    fetchChartStats();
    fetchMonthlySummary();
  }, [year, month]);

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
              gap: '20px',
              margin: '0 0 20px 0'
            }}
          >
            <FinanceCard title={"총 수입"} amount={summary.income} type={"income"} />
            <FinanceCard title={"총 지출"} amount={summary.expense} type={"expense"} />
            <FinanceCard title={"총 잔액"} amount={summary.balance} type={"balance"} />
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

              <ListDetailWrap>
                {transactions.length > 0 ? (
                  transactions.map((item) => (
                    <ListBody
                      key={item.id}
                      onClick={() => handleRowClick(item)}
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
              </ListDetailWrap>
            </ListSection>
          </ListWrapper>
        </LeftSection>

        <RightSection>
          <AddTransaction onSaveSuccess={fetchSummary} />
          <div style={{ flex: 1, minHeight: '0' }}>
            <DonutChart year={year} month={month} data={chartData} />
          </div>
          <div style={{ flex: 1, minHeight: '0' }}>
            <MonthlyBarChart year={year} month={month} rawData={barChartData} />
          </div>
        </RightSection>
      </FinanceCardWrap>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <AddTransaction
              onSaveSuccess={() => {
                setIsModalOpen(false);
                fetchSummary();
                fetchTransactions();
              }}
              editingItem={selectedItem}
            />
            <XIcon
              src={"/icons/x.svg"}
              onClick={() => setIsModalOpen(false)}
            />
          </ModalContent>
        </ModalOverlay>
      )}
    </DashBoardWrap>
  );
}
