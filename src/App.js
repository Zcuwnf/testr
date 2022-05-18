import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'

import TodoList from './components/TodoList'
import Header from './components/Header'
import Footer from './components/Footer'

import './css/Todo.css'

const filterByStatus = (listTodos = [], status = '', id) => {
  switch (status) {
    case 'ACTIVE':
      return listTodos.filter(item => !item.isCompleted)
    case 'COMPLETED':
      return listTodos.filter(item => item.isCompleted)
    case 'REMOVE':
      return listTodos.filter(item => item.id !== id)
    default:
      return listTodos
  }
}

const filterTodosLeft = (listTodos = []) => {
  return listTodos.filter(item => !item.isCompleted)
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      listTodos: [],
      isCheckedAll: false,
      status: 'ALL',
      todoEditingId: ''
    }
  }

  componentDidMount = () => {
    const listTodos = localStorage.getItem("todos");
    if (listTodos) {
      const savedlistTodos = JSON.parse(listTodos);
      this.setState({ listTodos: savedlistTodos });
    } else {
      console.log("Empty");
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.listTodos?.length !== prevState.todo?.length) {
      if (this.state.listTodos.length === 0) {
        localStorage.removeItem("todos");
      } else localStorage.setItem("todos", JSON.stringify(this.state.listTodos));
    }
  }

  addTodos = (todo = {}) => {
    this.setState(preState => ({
      listTodos: [...preState.listTodos, todo]
    }))
  }

  markCompleted = (id = '') => {
    const { listTodos } = this.state
    let isCheckedAll = true
    const updatedListTodos = listTodos.map(item => {
      if ((!item.isCompleted && item.id !== id) || (item.isCompleted && item.id === id)) {
        isCheckedAll = false
      }
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted }
      }
      return item
    })
    this.setState({
      isCheckedAll,
      listTodos: updatedListTodos
    })
  }

  checkAll = () => {
    const { listTodos, isCheckedAll } = this.state
    const updatedListTodos = listTodos.map(item => ({ ...item, isCompleted: !isCheckedAll }))
    this.setState(preState => ({
      isCheckedAll: !preState.isCheckedAll,
      listTodos: updatedListTodos
    }))
  }

  clearCompleted = () => {
    this.setState(preState => ({
      listTodos: filterTodosLeft(preState.listTodos)
    }))
  }

  getEditTodo = (id = '') => {
    this.setState({
      todoEditingId: id
    })
  }

  editTodo = (todo, index) => {
    const { listTodos } = this.state
    listTodos.splice(index, 1, todo)
    this.setState({ listTodos })
  }

  removeTodo = (id = '') => {
    this.setState(prevState => ({
      listTodos: filterByStatus(prevState.listTodos, 'REMOVE', id)
    }))
  }

  render() {
    const { listTodos, isCheckedAll, status, todoEditingId } = this.state
    return (
      <Provider store={store}>
      <div className="todoapp">
        <Header
          addTodo={this.addTodos}
        />
        <TodoList
          // listTodos={filterByStatus(listTodos, status)}
          checkAll={this.checkAll}
          isCheckedAll={isCheckedAll}
          markCompleted={this.markCompleted}
          todoEditingId={todoEditingId}
          getEditTodo={this.getEditTodo}
          editTodo={this.editTodo}
          removeTodo={this.removeTodo}
        />
        <Footer
          activeButton={status}
          setStatusFilter={(status) => this.setState({ status })}
          clearCompleted={this.clearCompleted}
          numOfTodosLeft={filterTodosLeft(listTodos).length}
          numOfTodos={listTodos.length}
        />
      </div>
      </Provider>
    );

  }
}

export default App;
