import React, { Component } from 'react'
// import { render } from 'react-dom'
import {v4 as uuidv4} from 'uuid'

class Header  extends Component {
    // // const [text, setText] = useState('')
    // const { addTodo } = props

    constructor(props) {
        super(props);
        this.state  ={
            text : "",
        }
    }

    setText = (e) =>{
      this.setState({
          [e.target.title]: e.target.value,
      })  
    }

    // onAddTodos = (event) => {
    //     if (event.key === 'Enter' && text) {
    //         addTodo({
    //             id: new Date().valueOf(),
    //             text,
    //             isCompleted: false
    //         })
    //         setText('')
    //     }
    // }

    onAddTodos = (event) => {
      event.preventDefault()
      this.props.addTodo({
        id: uuidv4(),
        text: this.state.text,
        isCompleted: false,
        // ísEditeing: false
      })
      this.setState({
        text: ""
      })
    }

  render()
    {  return (
        <header className="header">
            <h1>Todo List</h1>
            <input
                className="new-todo"
                placeholder="Enter your todo"
                //value={text}
                value={this.state.text}
                title="text"
                // onChange={(e) => setText(e.target.value)}
                onChange={this.setText}
                // onKeyPress={(e) => onAddTodo(e)}
                onKeyDown={(event) =>{
                  if (event.key === 'Enter'){
                    this.onAddTodos(event)
                  }
                }}
            />
        </header>
    );
  }
}

export default Header