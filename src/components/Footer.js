import React, { Component } from 'react'
// import { render } from 'react-dom'

class Footer extends Component {
    // const { setStatusFilter, activeButton, clearCompleted, numOfTodosLeft, numOfTodos } = props
    render(){
        return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{this.props.numOfTodosLeft}</strong>
                <span> </span>
                <span>{this.props.numOfTodosLeft > 1 ? 'items' : 'item'}</span>
                <span> left</span>
            </span>
            <ul className="filters">
                <li>
                    <a
                        href="#/"
                        className={`${this.props.activeButton === 'ALL' ? "selected" : ''}`}
                        onClick={() => this.props.setStatusFilter('ALL')}
                    >
                        All
                    </a>
                </li>
                <span></span>
                <li>
                    <a
                        href="#/active"
                        className={`${this.props.activeButton === 'ACTIVE' ? "selected" : ''}`}
                        onClick={() => this.props.setStatusFilter('ACTIVE')}
                    >
                        Active
                    </a>
                </li>
                <span></span>
                <li>
                    <a
                        href="#/completed"
                        className={`${this.props.activeButton === 'COMPLETED' ? "selected" : ''}`}
                        onClick={() => this.props.setStatusFilter('COMPLETED')}
                    >
                        Completed
                    </a>
                </li>
            </ul>
            {
                this.props.numOfTodosLeft < this.props.numOfTodos && <button className="clear-completed" onClick={this.props.clearCompleted}>Clear completed</button>
            }
        </footer>
        )
    }
}

export default Footer