'use client'

import {
  AddTabWrap,
  AddTransactionForm,
  AddTransactionWrap, CalendarIcon, CategoryChip, CategoryWrapper,
  CustomDateInput,
  CustomMount,
  ExpenseTab, GroupTitle,
  IncomeTab,
  InputGroup, Memo,
  WonIcon
} from "@/app/styles/AddTransaction.style";
import {useState} from "react";
import axios from "axios";

export default function AddTransaction({ onSaveSuccess }: { onSaveSuccess: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState("food");
  const categories = ["food", "shopping", "transport", "etc"];
  const [isIncome, setIsIncome] = useState(true);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [memo, setMemo] = useState("");

  async function addTransactions() {
    if (!amount || amount === "0") {
      alert("금액을 입력해주세요.");
      return;
    }

    const payload = {
      type: isIncome ? "income" : "expense",
      amount: Number(amount),
      date: date,
      category: isIncome ? "" : selectedCategory,
      memo: memo,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/transactions', payload);

      if (response.status === 200 || response.status === 201) {
        if (onSaveSuccess) {
          onSaveSuccess();
        }
        alert(`${isIncome ? '수입' : '지출'} 내역이 저장되었습니다!`);
      }
    } catch (error) {
      console.error("데이터 저장 중 오류 발생:", error);
      alert("저장에 실패했습니다. 다시 시도해주세요.");
    }
  }

  return (
    <AddTransactionWrap>
      <AddTransactionForm>
        <AddTabWrap>
          <IncomeTab
            onClick={() => setIsIncome(true)}
          >
            수입
          </IncomeTab>
          <ExpenseTab
            onClick={() => setIsIncome(false)}
          >
            지출
          </ExpenseTab>
        </AddTabWrap>

        <InputGroup style={{padding:'0'}}>
          <GroupTitle>금액</GroupTitle>
          <CustomMount
            placeholder={"3,500,000"}
            onChange={(e) => setAmount(e.target.value)}
          />
          <WonIcon
            src={"/icons/won.svg"}
            alt={"원 아이콘"}
          />
        </InputGroup>

        <InputGroup>
          <GroupTitle>날짜</GroupTitle>
          <CustomDateInput
            type={"date"}
            onChange={(e) => setDate(e.target.value)}
          />
          <CalendarIcon src={"/icons/calendar.svg"}/>
        </InputGroup>

        {!isIncome &&
          <InputGroup>
            <GroupTitle>카테고리</GroupTitle>
            <CategoryWrapper>
              {categories.map((cat) => (
                <CategoryChip
                  key={cat}
                  type="button"
                  $isActive={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {
                    cat === "food" ? 
                    "식비" :
                    cat === "shopping" ?
                    "쇼핑" :
                    cat === "transport" ? 
                    "교통비" :
                    cat === "etc" ?
                    "기타지출" : ""
                  }
                </CategoryChip>
              ))}
            </CategoryWrapper>
          </InputGroup>
        }

        <InputGroup>
          <GroupTitle>메모</GroupTitle>
          <Memo onChange={(e) => setMemo(e.target.value)} />
        </InputGroup>

        <InputGroup>
          {isIncome ?
            <IncomeTab
              style={{
                width: '100%',
                height: `50px`,
              }}
              onClick={addTransactions}
            >
              수입 추가하기
            </IncomeTab>
            :
            <ExpenseTab
              style={{
                width: '100%',
                height: `50px`,
              }}
              onClick={addTransactions}
            >
              지출 추가하기
            </ExpenseTab>
          }
        </InputGroup>
      </AddTransactionForm>
    </AddTransactionWrap>
  );
}