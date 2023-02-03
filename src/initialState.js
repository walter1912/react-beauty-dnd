const initialState = {
    tasks: {
        'task-1': {id: 'task-1', content: 'học reactJS'},
        'task-2': {id: 'task-2', content: 'học CNPM'},
        'task-3': {id: 'task-3', content: 'học từ vựng tiếng anh TOEIC'},
        'task-4': {id: 'task-4', content: 'qua hết các môn kì này'},
        'task-5': {id: 'task-5', content: 'qua môn'}
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds:['task-1', 'task-2', 'task-3', 'task-4', 'task-5']
        },
        'column-2': {
            id: 'column-2',
            title: 'Processing',
            taskIds:[],
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: [],
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
}
export default initialState;