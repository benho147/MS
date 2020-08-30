import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
  componentDidMount(){
  getLabelsAsync("").then(  res=>{
     this.setState(()=>{ return {
       list: res,
       colors: new Array(res.length).fill(false)
    }});
  });
 
 }
 constructor(props){
 super(props);
   this.state = {
     list: [],
     showList:[],
     colors: [],
     inputField: "",
     listopen: false
   };
   
 
   this.changeInput = this.changeInput.bind(this);
   this.changeColor = this.changeColor.bind(this);
   this.selectedItem = this.selectedItem.bind(this);
   this.onKeyPressed = this.onKeyPressed.bind(this);
   this.updateList = this.updateList.bind(this);
 }
 changeInput (e) {
     var currentList = []
     var listopen = false;
     var idx = e.target.value.lastIndexOf("@");
     if (idx !== -1 && (typeof e.target.value.substring(idx + 1) !== 'undefined')) {
       var res = e.target.value.substring(idx + 1);
       currentList = this.updateList(res);
       this.setState({showList: currentList });
     this.changeColor(0, currentList)
     }
     if (currentList.length > 0) {
       listopen = true;
     }  else {
       listopen = false;
     }
     this.setState({ listopen, inputField: e.target.value});
   }
   updateList(keyword) {
   //console.log(this.state)
     const result = this.state.list
       .filter(function(x) {return x.toLowerCase().indexOf(keyword.toLowerCase()) > -1;});
       return result;
    }
 
   changeColor (index, list) {
     let colors = new Array(list.length).fill(false);
     colors[index] = true;
     this.setState({colors})
     //return colors;
   }
  
  selectedItem(item){
     let {inputField, listopen} = this.state;
     if(listopen === true){
       this.setState({ inputField:
         inputField.slice(0, inputField.indexOf('@')) + item , listopen: false});
     }
   }
   onKeyPressed(e){
       // collect index
      // );
       if(e.keyCode === 13 || e.keyCode === 38 || e.keyCode === 40){
       /* console.log(e) */
        var index = 0;
         for(let idx = 0 ; idx < this.state.colors.length;idx++ ){
           if(this.state.colors[idx])
             index = idx;
         }
         if(e.keyCode === 40){
           index = (index +1) %  this.state.colors.length;
           this.changeColor(index, this.state.showList);
           
         }
         if(e.keyCode === 38){ 
           index = index - 1;
           if(index < 0) index =   this.state.colors.length-1;
           this.changeColor(index, this.state.showList);
           
         }
         if(e.keyCode === 13){
           this.selectedItem(this.state.showList[index]);
         }
         
         //console.log(this.state.shpw)
         //console.log(this.state.list[index]);
         
       }
   }
   render(){
    let { showList, inputField, colors, listopen } = this.state;
    //console.log(this.state);
     let listt;
     if (this.state.listopen) {
       listt = <ul className="list" >
       <List list={this.state.showList} colors={this.state.colors} 
       selectedItem={this.selectedItem}
       changeColor={this.changeColor} />
       </ul>;
     }
     return (
       <div className="container">
         <input className="input"
           onKeyDown={this.onKeyPressed}
           onChange={this.changeInput} value={this.state.inputField} />
           {listt}
       </div>
     );
   }								
 }
 function List(props) {
   let { list, colors, changeColor, selectedItem } = props
   return list.map((items, idx) =>
     <li
       onMouseOver={() => {
         changeColor(idx, true);
       }}
       onMouseLeave={() => {
         changeColor(idx, false);
       }}
       onClick={()=>{selectedItem(items)}}
       key={idx}
       className="list__item" style={{ backgroundColor: colors[idx] ? "grey" : "white" }}>
       {items}
     </li>
   );
 }
 
 
 
 
 // This function mocks a simple synchronous API to fetch the label list by keyword.
 // Example:
 //  const val = getLabels('C');
 //  console.log(val);
 function getLabels(keyword) {
   const allLabels = ['NextActions', 'Someday_Actions', 'Costco', 'Alexa'];
   const result = allLabels
     .filter(function(x) {
       return x.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
     });
   return result;
 }
 
 // This function mocks the asynchronous API to fetch the label list by keyword.
 // Example:
 //  getLabelsAsync('C').then(function(val) {
 //     console.log(val);
 //  })
 function getLabelsAsync(keyword) {
   const result = getLabels(keyword);
   const delay = Math.random() * 800 + 200; // delay 200~1000ms
   return new Promise(function(resolve, reject) {
     setTimeout(resolve, delay, result);
   });
 }
 
 
 
 ReactDOM.render(<App/>, document.querySelector("#root"))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
