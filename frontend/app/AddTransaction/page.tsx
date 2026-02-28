import {
  AddTabWrap,
  AddTransactionForm,
  AddTransactionWrap,
  ExpenseTab,
  IncomeTab
} from "@/app/styles/AddTransaction.style";

export default function AddTransaction() {
  return (
    <AddTransactionWrap>
      <AddTransactionForm>
        <AddTabWrap>
          <IncomeTab>
            수입
          </IncomeTab>
          <ExpenseTab>
            지출
          </ExpenseTab>
        </AddTabWrap>
      </AddTransactionForm>
    </AddTransactionWrap>
  );
}