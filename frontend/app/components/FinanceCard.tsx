import {FinAmount, FinCardWrapper, FinTitle} from "@/app/styles/FinanceCard.style";
import {theme} from "@/app/styles/theme";

interface CardTypes {
  title: string,
  amount: number,
  type: 'income' | 'expense' | 'balance';
}

export default function FinanceCard({ title, amount, type }:CardTypes) {
  return (
    <FinCardWrapper style={
      type === "income" ?
      {background: theme.colors.status.income}:
      type === "expense" ?
      {background: theme.colors.status.expense}:
      {background: theme.colors.menu.activeBg}
    }
    >
      <FinTitle>{title}</FinTitle>
      <FinAmount>
        {
          type === "income" ?
          `+` :
          type === "expense" ?
          `-` :
          ``
        }
        {amount.toLocaleString()}원
      </FinAmount>
    </FinCardWrapper>
  );
}