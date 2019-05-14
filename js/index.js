import React from "react";
import ReactDOM from "react-dom";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    this.props.onDelete(this.props.name);
  }

  render() {
    return <li key={this.key}><span onClick={this.handleDelete}>x</span> Item: {this.props.name}</li>;
  }
}

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {name: ''};
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onChangeSubmit(this.state.name);
    this.defaultValue();
  }

  defaultValue() {
    this.setState({name: ''})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


class SimpleApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);    
    this.handleDelete = this.handleDelete.bind(this);    
    this.state = { name: this.props.name, names: []};    
  }

  handleAdd(name) {
    this.setState({names: [...this.state.names, name], name: name});
  }

  handleDelete(id) {
    var nameArr =  this.state.names.filter(el => el != id );
    this.setState({names: nameArr, name: ''});
  }

  render() {
    const name = this.state.name;

    return (
      <div>
        <ul> 
          {
          this.state.names.map((item, index) =>  <Item name={item} key={index + item} onDelete={this.handleDelete}/>)
          }
        </ul>
        <ItemForm name={name} onChangeSubmit={this.handleAdd} />
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<SimpleApp name="Dan" />, mountNode);
