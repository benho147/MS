import React from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    list: [],
    colors: [true, false, false, false],
    inputField: "",
    listopen: false
  };
  changeInput = (e) => {
    // 1. process str
    var currentList = []
    var listopen = false;
    var idx = e.target.value.lastIndexOf("@");
    if (idx !== -1 && (typeof e.target.value.substring(idx + 1) !== 'undefined')) {

      var res = e.target.value.substring(idx + 1);

      // console.log(typeof (currentList))
      currentList = this.getLabels(res);
      // console.log(currentList)
    }
    if (currentList.length > 0) {
      listopen = true;
    }
    else {
      listopen = false;
    }


    this.setState({ listopen, inputField: e.target.value,list: currentList });
  }
  changeColor = (index, orange) => {
    let colors = new Array(this.state.list.length).fill(false);
    colors[index] = true;
    this.setState({ colors });
  }

  // This function mocks a simple synchronous API to fetch the label list by keyword.
  // Example:
  //  const val = getLabels('C');
  //  console.log(val);
  getLabels(keyword) {
    const allLabels = ['NextActions', 'Someday_Actions', 'Costco', 'Alexa'];
    const result = allLabels
      .filter(function (x) {
        return x.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
    return result;
  }

  // This function mocks the asynchronous API to fetch the label list by keyword.
  // Example:
  //  getLabelsAsync('C').then(function(val) {
  //     console.log(val);
  //  })
  getLabelsAsync(keyword) {
    const result = this.getLabels(keyword);
    const delay = Math.random() * 800 + 200; // delay 200~1000ms
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, delay, result);
    });
  }



  render() {
    let { list, inputField, colors, listopen } = this.state;
    let listt;
    if (listopen) {
      listt = <ul className="list" >

        <List list={list} colors={colors} changeColor={this.changeColor} />
      </ul>
    }

    return (
      <div className="container">
        <input className="input"
          onChange={this.changeInput} value={inputField} />
          {listt}

      </div>
    );
  }
}




function List(props) {
  let { list, colors, changeColor } = props
  // let flag= false;
  return list.map((items, idx) =>
    <li
      onMouseOver={() => {
        changeColor(idx, true);
      }}
      onMouseLeave={() => {
        changeColor(idx, false);
      }}
      key={idx}
      className="list__item" style={{ backgroundColor: colors[idx] ? "grey" : "orange" }}>
      {items}
    </li>
  );
}

export default App;