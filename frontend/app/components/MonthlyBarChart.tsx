import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList} from 'recharts';
import {ChartWrapper} from "@/app/styles/Chart.style";

interface RawData {
  year: number;
  month: number;
  rawData: { name: string; value: number }[];
}

export default function MonthlyBarChart({ year, month, rawData = [] }: RawData) {
  const income = rawData.find(d => d.name === 'income')?.value || 0;
  const expense = rawData.find(d => d.name === 'expense')?.value || 0;
  const balance = income - expense;


  const chartData = [
    { name: '수입', value: income, color: '#D3F9D8' },
    { name: '지출', value: expense, color: '#FFE3E3' },
    { name: '잔액', value: balance, color: '#E7F5FF' }
  ];

  if (!rawData || rawData.length === 0 || rawData.every(d => d.value === 0)) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#888'
      }}>
        {year}년 {month}월 자금 흐름 내역이 없습니다.
      </div>
    );
  }

  return (
    <ChartWrapper style={{ width: '100%', height: '100%', minHeight: '100%' }}>
      <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
        {year}년 {month}월 자금 흐름
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis hide />
          <Tooltip
            formatter={(value: any) => [
              `${Number(value).toLocaleString()}원`,
              '금액'
            ]}
            cursor={{ fill: 'transparent' }}
          />
          <Bar
            dataKey="value"
            radius={[5, 5, 0, 0]}
            barSize={70}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList
              dataKey="value"
              position="center"
              offset={10}
              formatter={(val: any) => `${Number(val).toLocaleString()}원`}
              style={{ fill: '#666', fontSize: '12px', fontWeight: 'bold' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}