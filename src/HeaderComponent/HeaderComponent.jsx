import { useState } from 'react';
import { useRef } from 'react';
import HeaderStyle from './HeaderComponent.module.css';

function HeaderComponent({ setPageNum }) {
  let [activeItemIndex, setActiveItemIndex] = useState(0);
  const body = document.body;
  const bgColorsBody = ['#76b852', '#ff96bd', '#9999fb', '#ffe797', '#cffff1'];
  const menu = useRef();
  const menuItems = useRef([]);
  const menuBorder = useRef();

  const clickItem = (e) => {
    let clickedButtonIndex = -1;

    menuItems.current.forEach((element, index) => {
      if (element == e.target) {
        clickedButtonIndex = index;
        setPageNum(index);
      }
    });
    menu.current.style.removeProperty('--timeOut');

    if (activeItemIndex == clickedButtonIndex) return;

    menuItems.current[activeItemIndex].classList.remove(HeaderStyle.active);

    e.target.classList.add(HeaderStyle.active);

    body.style.backgroundColor = bgColorsBody[clickedButtonIndex];
    document.documentElement.style.setProperty('--bgColorItem', bgColorsBody[clickedButtonIndex]);
    setActiveItemIndex(clickedButtonIndex);
    offsetMenuBorder(menuItems.current[clickedButtonIndex], menuBorder);
  };

  function offsetMenuBorder(element, menuBorder) {
    if (element == null) return;
    const offsetActiveItem = element.getBoundingClientRect();
    const left =
      Math.floor(
        offsetActiveItem.left -
          menu.current.offsetLeft -
          (menuBorder.current.offsetWidth - offsetActiveItem.width) / 2
      ) + 'px';
    menuBorder.current.style.transform = `translate3d(${left}, 0 , 0)`;
  }

  window.addEventListener('resize', () => {
    if (menuBorder.current !== undefined)
      offsetMenuBorder(menuItems.current[activeItemIndex], menuBorder);
    if (menu.current != undefined) menu.current.style.setProperty('--timeOut', 'none');
  });

  return (
    <div className={HeaderStyle.headerDiv}>
      <menu className={HeaderStyle.menu} ref={menu}>
        <button
          className={`${HeaderStyle.menu__item} ${HeaderStyle.active}`}
          onClick={clickItem}
          ref={(elem) => {
            menuItems.current[0] = elem;
          }}
        >
          <svg className={HeaderStyle.icon} viewBox="0 0 24 24">
            <path d="M3.8,6.6h16.4" />
            <path d="M20.2,12.1H3.8" />
            <path d="M3.8,17.5h16.4" />
          </svg>
        </button>
        <button
          className={HeaderStyle.menu__item}
          onClick={clickItem}
          ref={(elem) => (menuItems.current[1] = elem)}
        >
          <svg className={HeaderStyle.icon} viewBox="0 0 24 24">
            <path d="M6.7,4.8h10.7c0.3,0,0.6,0.2,0.7,0.5l2.8,7.3c0,0.1,0,0.2,0,0.3v5.6c0,0.4-0.4,0.8-0.8,0.8H3.8C3.4,19.3,3,19,3,18.5v-5.6c0-0.1,0-0.2,0.1-0.3L6,5.3C6.1,5,6.4,4.8,6.7,4.8z" />
            <path d="M3.4,12.9H8l1.6,2.8h4.9l1.5-2.8h4.6" />
          </svg>
        </button>
        <button
          className={HeaderStyle.menu__item}
          onClick={clickItem}
          ref={(elem) => (menuItems.current[2] = elem)}
        >
          <svg className={HeaderStyle.icon} viewBox="0 0 24 24">
            <path d="M3.4,11.9l8.8,4.4l8.4-4.4" />
            <path d="M3.4,16.2l8.8,4.5l8.4-4.5" />
            <path d="M3.7,7.8l8.6-4.5l8,4.5l-8,4.3L3.7,7.8z" />
          </svg>
        </button>
        <button
          className={HeaderStyle.menu__item}
          onClick={clickItem}
          ref={(elem) => (menuItems.current[3] = elem)}
        >
          <svg className={HeaderStyle.icon} viewBox="0 0 24 24">
            <path d="M5.1,3.9h13.9c0.6,0,1.2,0.5,1.2,1.2v13.9c0,0.6-0.5,1.2-1.2,1.2H5.1c-0.6,0-1.2-0.5-1.2-1.2V5.1C3.9,4.4,4.4,3.9,5.1,3.9z" />
            <path d="M4.2,9.3h15.6" />
            <path d="M9.1,9.5v10.3" />
          </svg>
        </button>
        <button
          className={HeaderStyle.menu__item}
          onClick={clickItem}
          ref={(elem) => (menuItems.current[4] = elem)}
        >
          <svg className={HeaderStyle.icon} viewBox="0 0 24 24">
            <path d="M5.1,3.9h13.9c0.6,0,1.2,0.5,1.2,1.2v13.9c0,0.6-0.5,1.2-1.2,1.2H5.1c-0.6,0-1.2-0.5-1.2-1.2V5.1C3.9,4.4,4.4,3.9,5.1,3.9z" />
            <path d="M5.5,20l9.9-9.9l4.7,4.7" />
            <path d="M10.4,8.8c0,0.9-0.7,1.6-1.6,1.6c-0.9,0-1.6-0.7-1.6-1.6C7.3,8,8,7.3,8.9,7.3C9.7,7.3,10.4,8,10.4,8.8z" />
          </svg>
        </button>
        <div className={HeaderStyle.menu__border} ref={menuBorder} />
      </menu>
      <div className={HeaderStyle.svg_container}>
        <svg viewBox="0 0 202.9 45.5">
          <clipPath
            id="menu"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.0049285362247413 0.021978021978022)"
          >
            <path d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5c9.2,3.6,17.6,4.2,23.3,4H6.7z" />
          </clipPath>
        </svg>
      </div>
    </div>
  );
}

export default HeaderComponent;
