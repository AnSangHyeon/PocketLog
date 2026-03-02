'use client'

import {
  HeaderWrapper,
  LogoWrapper,
  LogoText, HeaderClock,
} from "@/app/styles/Header.style";
import {useEffect, useState} from "react";

export default function Header() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeString = now.toLocaleTimeString('ko-KR', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  return(
    <HeaderWrapper>
      <LogoWrapper>
        <LogoText onClick={() => window.location.reload()}>
          <span className="point">용&nbsp;돈&nbsp;</span>
          <span className="sub">관&nbsp;리&nbsp;</span>
        </LogoText>

        <div
          style={{
            width: '100%',
            pointerEvents: 'none',
          }}
        >
          <HeaderClock><img src={"/icons/clock.svg"} /> {timeString}</HeaderClock>
        </div>
      </LogoWrapper>
    </HeaderWrapper>
  );
}