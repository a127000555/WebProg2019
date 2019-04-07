import React from 'react';

import CalcButton from '../components/CalcButton';

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calc_display : "0"
    };
    this.last_is_equal = false;
  }
  self_eval = ( input ) => {
    
    // Special case replace x -> *
    input = input.replace("x", "*");
    if( isNaN(input.charAt(input.length-1)) )
      return "Wrong"
    try{
      return String(eval(input));
    }catch( e ){
      return "Error"
    }
  }
  resetState = () => {
    this.setState({ calc_display: "0"});
  }

  addNewChar = ( input ) => {
    return ()=>{
      console.log(this.last_is_equal);
      let prev = this.state.calc_display;
      if( input === '='){
        // Equals is special case.
        this.setState({ calc_display: this.self_eval(prev) });
        this.last_is_equal = true;
      }else{
        // Process Op & number
        if( isNaN(input) ){
          // Process Operator
          
          if( isNaN(prev.charAt(prev.length-1)) ){
            // If the last character is operator, we replaced it.
            this.setState({ calc_display: prev.substring(0,prev.length-1) + input });
          }else if( isNaN(prev) ){
            // If the total string has operator, we solved it.
            this.setState({ calc_display: this.self_eval(prev) + input });
          }else{
            // If it just a single number before, we append it.
            this.setState({ calc_display: prev + input });
          }

        }else{
          // Process Pure Digit
          if( prev === "0" ){
            // If previous is 0 and input is number, 0 will be canceled.
            this.setState({ calc_display: input });
          }else{

            if( this.last_is_equal ){
              // Last is equal , all number must be clear.
              this.setState({ calc_display: input });
            }else{
              // Last is not equal , No matter the last char is digit or operator,  we append.
              this.setState({ calc_display: prev + input });
            }
          }
          this.last_is_equal = false;
        }
      }
    }
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.calc_display}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={this.addNewChar('/')}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.addNewChar("7")}>7</CalcButton>
            <CalcButton className="calc-number" onClick={this.addNewChar("8")}>8</CalcButton>
            <CalcButton className="calc-number" onClick={this.addNewChar("9")}>9</CalcButton>
            <CalcButton className="calc-operator" onClick={this.addNewChar('x')}>x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.addNewChar("4")}>4</CalcButton>
            <CalcButton className="calc-number" onClick={this.addNewChar("5")}>5</CalcButton>
            <CalcButton className="calc-number" onClick={this.addNewChar("6")}>6</CalcButton>
            <CalcButton className="calc-operator" onClick={this.addNewChar('-')}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.addNewChar("1")}>1</CalcButton>
            <CalcButton className="calc-number" onClick={this.addNewChar("2")}>2</CalcButton>
            <CalcButton className="calc-number" onClick={this.addNewChar("3")}>3</CalcButton>
            <CalcButton className="calc-operator" onClick={this.addNewChar('+')}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number0" onClick={this.addNewChar("0")}> 0</CalcButton>
            <CalcButton className="calc-number">.</CalcButton>
            <CalcButton className="calc-operator" onClick={this.addNewChar('=')}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
