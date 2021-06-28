const data = [
{
  value: '7',
  id: "seven" },

{
  value: '8',
  id: "eight" },

{
  value: '9',
  id: "nine" },

{
  value: '+',
  id: "add" },

{
  value: '4',
  id: "four" },

{
  value: '5',
  id: "five" },

{
  value: '6',
  id: "six" },

{
  value: '-',
  id: "subtract" },

{
  value: '1',
  id: "one" },

{
  value: '2',
  id: "two" },

{
  value: '3',
  id: "three" },

{
  value: '*',
  id: "multiply" },

{
  value: '0',
  id: "zero" },

{
  value: '.',
  id: "decimal" },

{
  value: '/',
  id: "divide" },

{
  value: '=',
  id: "equals" }];



const Display = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "display", id: "display" },
    props.output));


};

const Clear = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "clear-btn", id: "clear", onClick: props.clear }, /*#__PURE__*/
    React.createElement("p", null, "clear")));


};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: '0',
      operand: '',
      store: '',
      operator: '',
      negative: false };



    //Binding methods
    this.updateDisplay = this.updateDisplay.bind(this);
    this.updateDisplayTwo = this.updateDisplayTwo.bind(this);
    this.reset = this.reset.bind(this);
    this.cssUpdater = this.cssUpdater.bind(this);
    this.cssUpdaterReset = this.cssUpdaterReset.bind(this);
    this.dataEntry = this.dataEntry.bind(this);
    this.solve = this.solve.bind(this);
    this.handleStateStart = this.handleStateStart.bind(this);
    this.handleStateAppend = this.handleStateAppend.bind(this);
  }

  //Methods to perform operations
  reset() {
    this.setState({
      output: '0',
      operand: '',
      store: '',
      operator: '',
      negative: false });

  }

  //Consider ternary operators based on whether a number is in store or not
  //If it's not, don't worry about "store", if it is then use "store" with "operand"
  solve() {
    const v1 = parseFloat(this.state.store);
    const v2 = parseFloat(this.state.operand);
    const solution = eval(v1 + this.state.operator + v2);
    this.setState({
      output: solution.toString(),
      operand: this.state.operand,
      store: this.state.store,
      operator: this.state.operator,
      negative: false });

    console.log(this.state);
  }

  handleStateStart(a) {
    this.setState({
      output: a,
      operand: a,
      store: this.state.store,
      operator: this.state.operator,
      negative: false });

  }

  handleStateAppend(a) {
    this.setState({
      output: this.state.output + a,
      operand: this.state.output + a,
      store: this.state.store,
      operator: this.state.operator,
      negative: false });

  }

  //How can I simplify all of this with lists that I can iterate through?
  dataEntry(arg) {
    if (arg == "c") {
      this.reset();
    } else if (arg == "=") {
      this.solve();
    } else if (this.state.output.match(/^0$/) && arg.match(/[1-9]/)) {
      this.handleStateStart(arg);
    } else if (this.state.output.match(/^0$/) && arg.match(/\./)) {
      this.handleStateAppend(arg);
    } else if (this.state.output.match(/^0\.$/ && arg.match(/[1-9]/))) {
      this.handleStateAppend(arg);
    } else if (this.state.output.match(/^(?!0)\d*$/) && arg.match(/[0-9]|\./)) {
      this.handleStateAppend(arg);
    } else if (this.state.output.match(/\d*\.$/g) && arg.match(/[0-9]/)) {
      this.handleStateAppend(arg);
    } else if (this.state.output.match(/^[0-9]*\.([0-9]*)$/) && arg.match(/[0-9]/)) {
      this.handleStateAppend(arg);
    } else if (arg.match(/[+*]/)) {
      let op = "";
      this.state.operator != "" ? op = this.state.operator : op = arg;
      this.setState({
        output: arg,
        operand: this.state.operand,
        store: this.state.store,
        operator: op,
        negative: false });

      console.log(this.state);
    } else if (arg.match(/[-]/) && this.state.output.match(/[+*/]/)) {
      this.setState({
        output: this.state.output,
        operand: this.state.operand,
        store: this.state.store,
        operator: this.state.operator,
        negative: !this.state.negative });

    } else if (arg.match(/[-]/)) {
      let operand = this.state.operand;
      let op = "";
      this.state.operator != "" ? op = this.state.operator : op = arg;
      this.setState({
        output: arg,
        operand: operand,
        store: this.state.store,
        operator: op,
        negative: false });

    } else if (arg.match(/[/]/)) {
      let op = "";
      this.state.operator != "" ? op = this.state.operator : op = arg;
      this.setState({
        output: arg,
        operand: this.state.operand,
        store: this.state.store,
        operator: op,
        negative: false });

    } else if (this.state.operator.match(/[+]/) && arg.match(/[0-9]/)) {
      let v1 = parseFloat(this.state.store);
      this.state.store == "" ? v1 = parseFloat(0) : false;
      let v2 = parseFloat(this.state.operand);
      const solution = eval(v1 + this.state.operator + v2);
      this.setState({
        output: arg,
        operand: arg,
        store: solution,
        operator: this.state.output,
        negative: false });

    } else if (this.state.operator.match(/[*]/) && arg.match(/[0-9]/)) {
      let v1 = parseFloat(this.state.store);
      this.state.store == "" ? v1 = parseFloat(1) : false;
      let v2 = parseFloat(this.state.operand);
      let negative = "";
      this.state.negative ? v2 = v2 * -1 : false;
      const solution = eval(v2 + this.state.operator + v1);
      this.setState({
        output: arg,
        operand: arg,
        store: solution,
        operator: this.state.output,
        negative: false });

    } else if (this.state.operator.match(/[/]/) && arg.match(/[0-9]/)) {
      let store = parseFloat(this.state.store);
      let operand = parseFloat(this.state.operand);
      let negative = "";
      this.state.negative ? operand = operand * -1 : false;
      let solution = eval(store + this.state.operator + operand);
      this.state.store == "" ? solution = eval(operand + this.state.operator + 1) : false;
      this.state.store == "" && this.state.operand == "" ? solution = 0 : false;
      this.setState({
        output: arg,
        operand: arg,
        store: solution,
        operator: this.state.output,
        negative: false });

    } else if (this.state.operator.match(/[-]/) && arg.match(/[0-9]/)) {
      let store = parseFloat(this.state.store);
      const operand = parseFloat(this.state.operand);
      let solution = eval(store + this.state.operator + operand);
      this.state.store == "" ? solution = eval(operand + this.state.operator + 0) : false;
      this.state.store == "" && this.state.operand == "" ? solution = eval(0 + this.state.operator + arg) : false;
      this.setState({
        output: arg,
        operand: arg,
        store: solution,
        operator: this.state.output,
        negative: false });

    }
  }

  //Display inputs
  updateDisplay(e) {
    const a = e.key;
    this.dataEntry(a);
  }

  updateDisplayTwo(arg) {
    this.dataEntry(arg);
  }


  // The two 'cssUpdater' methods below are responsible for the 3D button press look
  cssUpdater(e) {
    let bool = '';
    data.map((a, i) => a['value'] == e.key ? bool = a['id'] : e.key == "c" ? bool = "clear" : false);
    if (bool && bool != "clear") {
      document.getElementById(bool).className = "button-sad-boi";
    } else if (bool && bool == "clear") {
      document.getElementById(bool).className = "clear-btn-sad-boi";
    }
  }

  cssUpdaterReset(e) {
    let bool = '';
    data.map((a, i) => a['value'] == e.key ? bool = a['id'] : e.key == "c" ? bool = "clear" : false);
    if (bool && bool != "clear") {
      document.getElementById(bool).className = "button";
    } else if (bool && bool == "clear") {
      document.getElementById(bool).className = "clear-btn";
    }
  }

  // Mounting and unmounting event listeners
  componentDidMount() {
    document.addEventListener("keypress", this.updateDisplay);
    document.addEventListener("keydown", this.cssUpdater);
    document.addEventListener("keyup", this.cssUpdaterReset);
  }
  componentDidUnmount() {
    document.removeEventListener("keypress", this.updateDisplay);
    document.removeEventListener("keydown", this.cssUpdater);
    document.removeEventListner("keyup", this.cssUpdaterReset);
  }

  render() {
    const button_grid = data.map(a => /*#__PURE__*/React.createElement("div", { className: "button", id: a["id"], onClick: () => {
        var val = a["value"];
        this.updateDisplayTwo(val);
      } },

    a["value"]));


    return /*#__PURE__*/(
      React.createElement("div", { id: "page" }, /*#__PURE__*/
      React.createElement("h1", null, "FCC Calculator Project"), /*#__PURE__*/
      React.createElement("div", { className: "container", id: "calulator" }, /*#__PURE__*/
      React.createElement(Display, { output: this.state.output }), /*#__PURE__*/
      React.createElement("div", { className: "button-grid" },
      button_grid), /*#__PURE__*/

      React.createElement(Clear, { clear: this.reset }))));



  }}


const lmnt = document.querySelector("#root");
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), lmnt);