import React, { Component } from 'react'
import Todo from './Todo'
import {connect} from "react-redux"

class TodoList extends Component {
    // const { listTodos, 
    //         checkAll,
    //         isCheckedAll 
    //     } = props
    render(){
        return (
        <section className="main">
            <input
                className="toggle-all"
                type="checkbox"
                onChange={() => {
                    console.log('mmark done')
                    this.props.checkAll()
                }}
                checked={this.props.isCheckedAll}
            />
            <label htmlFor="toggle-all" onClick={this.props.checkAll} ></label>
            <ul className="todo-list">
                {
                    this.props.listTodos.map((todo, index) => 
                    <Todo index={index} 
                        key={todo.id} 
                        todo={todo}   
                        markCompleted={this.props.markCompleted}
                        todoEditingId={this.props.todoEditingId}
                        getEditTodo={this.props.getEditTodo}
                        editTodo={this.props.editTodo}
                        removeTodo={this.props.removeTodo}
                        
                    />)
                }
            </ul>

        </section>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        listTodos: state.todos.listTodos
    }
}

export default connect(mapStateToProps)(TodoList)
