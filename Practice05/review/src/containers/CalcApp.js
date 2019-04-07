import React from 'react';

import CalcButton from '../components/CalcButton';


const order = {
  '+': 0,
  '-': 0,
  'x': 1,
  '÷': 1
};

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO
      display: 0,
      cal_arr: [0],
      index: -1
    };
  }

  resetState = () => {
    // TODO
    this.setState(() => ({
      display: 0,
      cal_arr: [0],
      index: -1
    }));
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  infixToPostfix = (infix) => {
    let postfix = [];
    let stack = [];

    infix.forEach(e => {
      if (isNaN(e)) {
        if (order[stack[stack.length - 1]] >= order[e]) {
          postfix.push(stack.pop());
        }
        stack.push(e);
      } else {
        postfix.push(e);
      }
    });
    while (stack.length !== 0) {
      postfix.push(stack.pop());
    }
    return postfix;
  }

  calculate = (arr) => {
    let postfix = this.infixToPostfix(arr);
    let stack = [];
    postfix.forEach(e => {
      if (isNaN(e)) {
        let rv = stack.pop();
        let lv = stack.pop();
        switch (e) {
          case '+':
            stack.push(lv + rv);
            break;
          case '-':
            stack.push(lv - rv);
            break;
          case 'x':
            stack.push(lv * rv);
            break;
          case '÷':
            stack.push(lv / rv);
            break;
          default:
            break;
        }
      } else {
        stack.push(e);
      }
    })
    return stack[0];
  }

  onOperatorClick = (e) => {
    let newState = { ...this.state };
    let operator = e.target.textContent;

    if (newState.index === -1) {
      newState.index++;
    }

    if (newState.index % 2 === 1) {
      newState.cal_arr[newState.index] = operator;
    } else {
      newState.index++;
      if (newState.cal_arr[newState.index] === undefined) {
        newState.cal_arr.push(operator);
      } else {
        newState.cal_arr[newState.index] = operator;
      }
    }

    if (order[operator] === 1) {
      let i = newState.index - 1;
      while (i > 0 && order[newState.cal_arr[i - 1]] === 1) {
        i -= 2;
      }
      newState.display = this.calculate(newState.cal_arr.slice(i, newState.index));
    } else {
      newState.display = this.calculate(newState.cal_arr.slice(0, newState.index));
    }

    while (newState.cal_arr.length - 1 > newState.index) {
      newState.cal_arr.pop();
    }

    console.log(newState);
    this.setState(() => newState);
  }

  onEqualClick = (e) => {
    let newState = { ...this.state };

    if (isNaN(newState.cal_arr[newState.cal_arr.length - 1])) {
      newState.cal_arr.push(newState.display);
    }

    newState.display = this.calculate(newState.cal_arr);
    newState.cal_arr.splice(0, newState.cal_arr.length - 2, newState.display);
    newState.index = -1;
    console.log(newState);
    this.setState(() => newState);
  }

  onNumberClick = (e) => {
    let newState = { ...this.state };

    if (newState.index % 2 === 0) {
      newState.cal_arr[newState.index] = newState.cal_arr[newState.index] * 10 + Number(e.target.textContent);
    } else {
      newState.index++;
      if (newState.cal_arr[newState.index] === undefined) {
        newState.cal_arr.push(Number(e.target.textContent));
      } else {
        newState.cal_arr[newState.index] = Number(e.target.textContent);
      }
    }

    newState.display = newState.cal_arr[newState.index];
    console.log(newState);
    this.setState(() => newState);
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.display}</div>
          </div>
          <div className="calc-row">
            <CalcButton id='AC' onClick={this.resetState}>AC</CalcButton>
            <CalcButton id='+/-' onClick={this.showNotImplemented}>+/-</CalcButton>
            <CalcButton id='%' onClick={this.showNotImplemented}>%</CalcButton>
            <CalcButton onClick={this.onOperatorClick} className="calc-operator">÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.onNumberClick} className="calc-number">7</CalcButton>
            <CalcButton onClick={this.onNumberClick} className="calc-number">8</CalcButton>
            <CalcButton onClick={this.onNumberClick} className="calc-number">9</CalcButton>
            <CalcButton onClick={this.onOperatorClick} className="calc-operator">x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.onNumberClick} className="calc-number">4</CalcButton>
            <CalcButton onClick={this.onNumberClick} className="calc-number">5</CalcButton>
            <CalcButton onClick={this.onNumberClick} className="calc-number">6</CalcButton>
            <CalcButton onClick={this.onOperatorClick} className="calc-operator">-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.onNumberClick} className="calc-number">1</CalcButton>
            <CalcButton onClick={this.onNumberClick} className="calc-number">2</CalcButton>
            <CalcButton onClick={this.onNumberClick} className="calc-number">3</CalcButton>
            <CalcButton onClick={this.onOperatorClick} className="calc-operator">+</CalcButton>

          </div>
          <div className="calc-row">
            <CalcButton onClick={this.onNumberClick} className="calc-number calc-0">0</CalcButton>
            <CalcButton id='.' className="calc-number">.</CalcButton>
            <CalcButton onClick={this.onEqualClick} className="calc-operator">=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
