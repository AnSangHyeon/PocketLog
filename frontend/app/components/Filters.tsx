'use client'

import {useState} from "react";
import {MonthFilterWrap} from "@/app/styles/MonthFilter.style";
import {FilterBtn} from "@/app/styles/FilterButtonGroup.style";
import {FilterSelectWrap} from "@/app/styles/FilterSelectBox.style";

interface MonthFilterProps {
  year: number;
  month: number;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
}

interface BtnFilterProps {
  handleFilterChange: (type: string) => void;
  currentType: string; // 현재 어떤 버튼이 눌렸는지 알아야 색을 칠하니까요!
}

interface CatFilterProps {
  onCategoryChange: (type: string) => void;
  currentCategory: string;
}

export const MonthFilter = (
  {year, month, handlePrevMonth, handleNextMonth}:MonthFilterProps
) => {
  return(
    <MonthFilterWrap>
      <img onClick={handlePrevMonth} src={"/icons/angleLeft.svg"}/>&nbsp;
      <div>{year}년 {month}월</div>&nbsp;
      <img onClick={handleNextMonth} src={"/icons/angleRight.svg"}/>
    </MonthFilterWrap>
  );
}

export const FilterButtonGroup = (
  {handleFilterChange, currentType}:BtnFilterProps
) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '5px'
      }}
    >
      <FilterBtn
        $active={currentType === 'all'}
        onClick={() => handleFilterChange('all')}
      >
        전체
      </FilterBtn>
      <FilterBtn
        $active={currentType === 'income'}
        onClick={() => handleFilterChange('income')}
      >
        수입
      </FilterBtn>
      <FilterBtn
        $active={currentType === 'expense'}
        onClick={() => handleFilterChange('expense')}
      >
        지출
      </FilterBtn>
    </div>
  );
}

export const FilterCategorySelect = ({ currentCategory, onCategoryChange }:CatFilterProps) => {
  return (
    <FilterSelectWrap
      value={currentCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      <option value="all">전체 카테고리</option>
      <option value="food">식비</option>
      <option value="shopping">쇼핑</option>
      <option value="transport">교통비</option>
      <option value="etc">기타지출</option>
    </FilterSelectWrap>
  );
}