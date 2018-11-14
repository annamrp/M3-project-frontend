import React, { Component } from 'react'

class EmailForm extends Component {
  state = {
    value: ''
  }

  handleChangeInput = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = this.state;
    this.props.onSubmit(value)
    this.setState({
      value: '',
    })
  }

  render() {
    const { value } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={value} onChange={this.handleChangeInput}/>
        <input type="submit" value="add email"/>
      </form>
    )
  }
}
export default EmailForm;