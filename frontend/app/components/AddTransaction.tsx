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

interface AddTransactionProps {
  onSaveSuccess: () => void,
  editingItem?: any,
}

export default function AddTransaction({ onSaveSuccess, editingItem }:AddTransactionProps) {
  const [selectedCategory, setSelectedCategory] = useState(editingItem?.category || "food");
  const categories = ["food", "shopping", "transport", "etc"];
  const [isIncome, setIsIncome] = useState(editingItem ? editingItem.type === "income" : true);
  const [amount, setAmount] = useState(editingItem?.amount?.toString() || "");
  const [date, setDate] = useState(editingItem?.date || new Date().toISOString().split('T')[0]);
  const [memo, setMemo] = useState(editingItem?.memo || "");

  async function deleteTransaction() {
    if (!confirm("정말 이 내역을 삭제하시겠습니까?")) return;

    try {
      const response = await axios.delete(`http://localhost:8080/api/transactions/${editingItem.id}`);
      // 성공 시 모달 닫고 리스트 새로고침
      if (response.status === 200 || response.status === 204) {
        onSaveSuccess();
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제에 실패했습니다.");
    }
  }

  async function addTransactions() {
    if (!amount || amount === "0") {
      alert("금액을 입력해주세요.");
      return;
    }

    const modeText = editingItem ? "수정" : (isIncome ? "수입" : "지출");
    if (!confirm(`${modeText} 내역을 저장하시겠습니까?`)) return;

    const payload = {
      type: isIncome ? "income" : "expense",
      amount: Number(amount),
      date: date,
      category: isIncome ? "income" : selectedCategory,
      memo: memo,
    };

    try {
      let response;

      if (editingItem) {
        // 수정
        response = await axios.put(`http://localhost:8080/api/transactions/${editingItem.id}`, payload);
      } else {
        // 추가
        response = await axios.post('http://localhost:8080/api/transactions', payload);
      }

      if (response.status === 200 || response.status === 201) {
        setAmount("");
        setMemo("");
        setSelectedCategory("food");
        setDate(new Date().toISOString().split('T')[0]);
        onSaveSuccess();
      }
    } catch (error) {
      console.error("데이터 처리 중 오류 발생:", error);
      alert("요청에 실패했습니다.");
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
            onClick={
              () => {
                setIsIncome(false);
                setSelectedCategory("food");
              }
            }
          >
            지출
          </ExpenseTab>
        </AddTabWrap>

        <InputGroup style={{padding:'0'}}>
          <GroupTitle>금액</GroupTitle>
          <CustomMount
            value={amount}
            placeholder={isIncome ? "수입을 입력하세요" : "지출을 입력하세요"}
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
            value={date}
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
          <Memo
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          {editingItem ? (
            /* 1. 수정 모드일 때 (모달 안에서 보임) */
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <ExpenseTab onClick={deleteTransaction}>삭제하기</ExpenseTab>
              <IncomeTab onClick={addTransactions}>수정하기</IncomeTab>
            </div>
          ) : (
            /* 2. 추가 모드일 때 (오른쪽 섹션에서 보임) */
            isIncome ? (
              <IncomeTab
                style={{ width: '100%', height: '50px' }}
                onClick={addTransactions}
              >
                수입 추가하기
              </IncomeTab>
            ) : (
              <ExpenseTab
                style={{ width: '100%', height: '50px' }}
                onClick={addTransactions}
              >
                지출 추가하기
              </ExpenseTab>
            )
          )}
        </InputGroup>
      </AddTransactionForm>
    </AddTransactionWrap>
  );
}