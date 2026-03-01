'use client'

import {useState} from "react";

export const MonthFilter = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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


  return(
    <div>

      {year}년 {month}월
    </div>
  );
}