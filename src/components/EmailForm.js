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
        <div className="form-input mail">
          <label className="label">Email address</label>
          <input className="input email" type="text" value={value} onChange={this.handleChangeInput} placeholder="email-1@email.com"/>
          <input className="icon add" type="image" src='/img/add.png' alt="icon submit"/>
        </div>
      </form>
    )
  }
}
export default EmailForm;