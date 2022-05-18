const INITIAL_STATE ={
    listTodos: [
        {id: 1,
        text: 'todos1',
        isComplete:false}
    ],
    isCheckedAll: false,
    status: 'ALL',
    todoEditingId: ''
    
}

const todosReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default todosReducer