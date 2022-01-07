import styled from "@emotion/styled";
import { useContext, useLayoutEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { RTLContenxt } from "../../context/RTLContenxt";

const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  //   y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

const CutomTabs = () => {
  const tabsRef = useRef();
  const tabRef = useRef([]);
  const [isActive, setIsActive] = useState(4);
  const [pos, setPos] = useState(0);
  const posRef = useRef(0);
  const onRightBtnClick = () => {
    if (tabsRef.current.clientWidth < tabsRef.current.scrollWidth) {
      tabsRef.current.scrollLeft += tabRef.current[0].offsetWidth + 50;
    }
  };

  const { isRTL } = useContext(RTLContenxt);

  const onLeftBtnClick = () => {
    if (tabsRef.current.clientWidth < tabsRef.current.scrollWidth) {
      tabsRef.current.scrollLeft -= tabRef.current[0].offsetWidth + 50;
    }
  };

  const onTabClick = (index) => {
    setIsActive(index);
  };

  useEffect(() => {
    setTimeout(() => {
      tabsRef.current.scrollLeft +=
        Math.abs(tabRef.current[isActive].getBoundingClientRect().x) -
        tabRef.current[0].offsetWidth;
    }, 200);
  }, [isActive]);
  useEffect(() => {
    // tabsRef.current.scrollLeft = 1;
    if (isRTL) {
      console.log(-Math.abs(posRef.current), "rtl");
      setTimeout(() => {
        tabsRef.current.scrollLeft += -Math.abs(posRef.current);
      }, 100);
    } else {
      console.log(Math.abs(posRef.current), "ltr");

      setTimeout(() => {
        tabsRef.current.scrollLeft += Math.abs(posRef.current);
      }, 100);
      //   tabsRef.current.scrollLeft += posRef.current;
      //   tabsRef.current.scrollLeft += posRef.current;
    }
  }, [isRTL]);
  //   useEffect(() => {
  //     if (isRTL) {
  //       console.log(Math.abs(posRef.current), "rtl");
  //       tabsRef.current.scrollLeft += -Math.abs(posRef.current);
  //     } else {
  //       console.log(Math.abs(posRef.current), "ltr");

  //       tabsRef.current.scrollLeft += Math.abs(posRef.current);
  //       //   tabsRef.current.scrollLeft += posRef.current;
  //       //   tabsRef.current.scrollLeft += posRef.current;
  //     }
  //   }, [isRTL]);
  const onTabsScroll = (e) => {
    // console.log(posRef.current, "refPos");
    // console.log(getScrollPosition(e.target), "tabPos");
    // console.log(getScrollPosition(e.target).x, "calc");
    const parentPos = tabsRef.current.getBoundingClientRect();
    const childPos = tabRef.current[isActive].getBoundingClientRect();
    // console.log(parentPos.x - childPos.x);
    // console.log(getScrollPosition(e.target));
    console.log(
      getScrollPosition(e.target).x - (parentPos.x - childPos.x),
      "act"
    );
    // console.log(posRef.current, "ref");

    posRef.current = getScrollPosition(e.target).x - (parentPos.x - childPos.x);

    // setPos(getScrollPosition(e.target).x - (parentPos.x - childPos.x));

    // pos = getScrollPosition(e.target).x - (parentPos.x - childPos.x);
  };

  return (
    <StyledTabsContainer>
      <button className="right" onClick={onRightBtnClick}>
        {">"}{" "}
      </button>
      <button className="left" onClick={onLeftBtnClick}>
        {" "}
        {"<"}{" "}
      </button>
      <StyledCutomTabs ref={tabsRef} onScroll={onTabsScroll}>
        {[...Array(40).keys()].map((item, index) => (
          <div
            key={item}
            onClick={() => onTabClick(index)}
            ref={(el) => (tabRef.current[index] = el)}
            className={`tab  ${isActive === index ? "bg-primary" : ""}`}
          >
            item {item}
          </div>
        ))}
      </StyledCutomTabs>
    </StyledTabsContainer>
  );
};

export default CutomTabs;
const StyledCutomTabs = styled.div`
  box-sizing: border-box;
  scroll-behavior: smooth;
  background: red;
  display: flex;
  overflow: auto;
  position: relative;
  .tab {
    padding: 10px 40px;
    white-space: nowrap;
    cursor: pointer;
  }
`;

const StyledTabsContainer = styled.div`
  position: relative;
  button {
    position: absolute;
    top: 50%;

    transform: translate(0, -50%);
    &.right {
      right: -30px;
    }
    &.left {
      left: -30px;
    }
  }
`;
