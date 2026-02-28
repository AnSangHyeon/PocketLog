
interface CardTypes {
  title: string,
  amount: number,
  type: 'income' | 'expense' | 'balance';
}

export default function FinanceCard({ title, amount, type }:CardTypes) {
  return (
    <div>카드</div>
  );
}