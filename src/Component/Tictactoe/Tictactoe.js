import React, { useRef, useState } from 'react';
import './Tictactoe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

function Tictactoe() {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock || data[num] !== "") return;

    if (count % 2 === 0) {
      e.target.innerHTML = `<img src=${cross_icon} alt="cross" />`;
      data[num] = "X";
    } else {
      e.target.innerHTML = `<img src=${circle_icon} alt="circle" />`;
      data[num] = "O";
    }

    setCount(count + 1);
    checkWin();
  };

  const checkWin = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (data[a] && data[a] === data[b] && data[b] === data[c]) {
        won(data[a]);
        break;
      }
    }
  };

  const won = (player) => {
    setLock(true);
    const img = player === "X" ? cross_icon : circle_icon;
    titleRef.current.innerHTML = `Congratulations: <img src=${img} alt="${player}" /> wins`;
  };

  const reset = () => {
    data = ["", "", "", "", "", "", "", "", ""];
    setCount(0);
    setLock(false);
    titleRef.current.innerHTML = 'Tic Tac Toe Game In <span> React </span>';
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
      box.innerHTML = "";
    });
  };

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>
        Tic Tac Toe Game In <span> React </span>
      </h1>

      <div className='board'>
        {[0, 1, 2].map((row) => (
          <div className={`row${row}`} key={row}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <div
                  key={index}
                  className='box'
                  onClick={(e) => toggle(e, index)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>

      <button onClick={reset} className='reset'>Reset</button>
    </div>
  );
}

export default Tictactoe;
