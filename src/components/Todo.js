import React, { Component } from 'react'


class Todo extends Component {

    constructor(props){
        super(props);
        this.state ={
            isEditing: false,
            text: ""
        }
    }

    // const {
    //     todo,
    //     markCompleted,
    //     getEditTodo,
    //     todoEditingId,
    //     editTodo,
    //     index,
    //     removeTodo
    // } = props

    // const this.state.isEditing = this.prosp.todoEditingId === this.props.todo.id
    // const [text, setText] = useState(todo.text)
   
    
    onEditTodo = () => {
        this.props.editTodo({
            todo: this.props.todo,
            text: this.state.text
        }, this.props.index)
        this.props.getEditTodo('')
    }

    setText = (e) =>{
        this.setState({
            [e.target.title]: e.target.value,
        })  
      }

    render(){

        this.isEditing = this.props.todoEditingId === this.props.todo.id

        return (
        <li className={`${this.isEditing ? 'editing' : ''} ${this.props.todo.isCompleted ? 'completed' : ''}`}>
            {
                !this.isEditing ?
                    <div className="view">
                        <input
                            className="itemList"
                            type="checkbox"
                            checked={this.props.todo.isCompleted}
                            onChange={() => this.props.markCompleted(this.props.todo.id)}
                        />
                        <label onDoubleClick={() => 
                            {this.props.getEditTodo(this.props.todo.id)}}
                        >
                            {this.props.todo.text}
                        </label>
                        <button className="remove" onClick={() => this.props.removeTodo(this.props.todo.id)} />
                    </div> :
                    <input
                        className="edit"
                        // value={text}
                        defaultValue={this.props.todo.text}
                        title='text'
                        onChange={this.setText}
                        onBlur={this.onEditTodo}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && this.props.todo.text) {
                                this.onEditTodo()
                            }
                        }}
                    />
            }
        </li>
    )
    }
}

export default Todo


