import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import {ChartWrapper} from "@/app/styles/Chart.style";

const COLORS = ['#FF8042', '#FF6B6B', '#FF4D4D', '#C0392B'];

const categoryMap: { [key: string]: string } = {
  food: "식비",
  shopping: "쇼핑",
  transport: "교통비",
  etc: "기타지출"
};

interface ChartData {
  month: number;
  year: number;
  data: ChartData[]
}

export default function DonutChart({ data, year, month }:ChartData) {

  if (!data || data.length === 0) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
        {year}년 {month}월 지출 내역이 없습니다.
      </div>
    );
  }

  return (
    <ChartWrapper style={{ width: '100%', height: '100%', minHeight: '100%' }}>
      <div
        style={{
          textAlign: 'center',
          fontSize: '20px'
        }}
      >
        <strong>{year}년 {month}월 카테고리별 사용량</strong>
      </div>
      <ResponsiveContainer width="100%" height="100%" style={{padding: '20px'}}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) =>
              percent
                ? `${categoryMap[name as keyof typeof categoryMap] || name} ${(percent * 100).toFixed(0)}%`
                : name
            }
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value: any, name: any) => [
              `${Number(value).toLocaleString()}원`,
              categoryMap[name] || name
            ]}
          />

          <Legend
            verticalAlign="bottom"
            formatter={(value: string) => categoryMap[value] || value}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}