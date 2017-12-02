import consts from "../misc/const";
import store_calculator from "../storages/calculator";
import * as React from "react";

const ACT = consts.ACT;

// const characters = [
//   "C", "CE", "(",  ")",
//   "+", "-",  "*",  "/",
//   "7", "8",  "9",  "%",
//   "4", "5",  "6",  "^",
//   "1", "2",  "3",  "=",
//   ".", "0",  "00",
// ];

const characters = [
  ["C","+","7","4","1","."],
  ["CE","-","8","5","2","0"],
  ["(","*","9","6","3","00"],
  [")","/","%","^","="]
];

export default class Calculator extends React.Component<{}, {}> {
  characters: JSX.Element[][];
  refs: {
    expression: HTMLInputElement;
  };

  updateExpression (character:string):void {
    if (store_calculator.getState().fetching) {
      return void 0;
    }

    if (character === "=") {
      store_calculator.dispatch({
        type: ACT.FETCHING,
        payload: this.refs.expression.value,
      });
    } else if (character === "C") {
      this.refs.expression.value = "";
    } else if (character === "CE") {
      this.refs.expression.value = this.refs.expression.value.slice(0, -1);
    } else {
      this.refs.expression.value += character;
    }
  }

  componentWillMount () {
    store_calculator.subscribe(() => {
      const state = store_calculator.getState();

      if (state.fetching) {
        return void 0;
      } else if (state.fetched) {
        this.refs.expression.value = state.value;
      } else if (state.error) {
        this.refs.expression.value = state.error;
      }
    });
  }

  private static filter_input (event) {
    event.target.value = event.target.value.replace(/[^0-9()+\-*\/^%]/g, "");
  }

  render () {
    // this.characters = characters.map((character:string, index:number) =>
    //   <div className="button" onClick={this.updateExpression.bind(this, character)} key={index}>
    //     {character}
    //   </div>
    // );

    /**
     * I wanted to do like this, and then use {this.characters}, but transpiler says it's wrong.
     * So i just put it into the final template.
    **/
    // this.characters = characters.map((row:string[], index):JSX.Element[] =>
    //   <div className="column" key={index}>{
    //     row.map((character:string, index:number):JSX.Element =>
    //       <div className="button" onClick={this.updateExpression.bind(this, character)} key={index}>
    //         {character}
    //       </div>
    //     )
    //   }</div>
    // );

    return (
      <div className="calculator">
        <div className="input_wrapper">
          <input type="text" ref="expression" onInput={Calculator.filter_input}/>
        </div>
        <div className="buttons">{
          characters.map((row:string[], index):JSX.Element =>
            <div className="column" key={index}>{
              row.map((character:string, index:number):JSX.Element =>
                <div className="button" onClick={this.updateExpression.bind(this, character)} key={index}>
                  {character}
                </div>
              )
            }</div>
          )
        }</div>
      </div>
    );
  }
}