import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import initialState from './initialState';
import Column from './column';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;


class App extends React.Component {
  // tạo state mới từ state khởi tạo ở file riêng
  state = initialState;

  onDragStart = (start, provided) => {
  
    // document.body.style.color = '#5B7DB1';
    // document.body.style.transition = 'background-color 0.2s ease';
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
    this.setState({
      homeIndex,
    });
      // tạo message thông báo
      provided.announce(
        ` bạn đang bấm vào nhiệm vụ ở vị trí ${start.source.index + 1} `,
      );
  };
  
  // onDragUpdate = update => {
  //   const {destination} = update;
  //   const opacity = destination ? (destination.index /Object.keys(this.state.tasks).length): 0;
  //   document.body.style.backgroundColor = `rgb(218, 184, 139, ${opacity})`;
  // }

  // tạo hàm khi drag kết thúc
  onDragEnd = (result, provided) => {

    
    this.setState({
      homeIndex: null,
    })
    // set style
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';

    const {destination, source, draggableId, type} = result;
    
    if(type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
    
      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };
      this.setState(newState);
      return;
    }
    // nếu ko thực hiện kéo thả thì không trả về gì
    if(!destination) {
      return;
    }
    // nếu vị trí cũ cũng ở vị trí mới thì không trả về gì
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if( start === finish) {
      const  newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };
      this.setState(newState);
      // tạo message thông báo
      provided.announce(
        ` bạn đã chuyển nhiệm vụ từ ${result.source.index + 1} đến ${result.destination.index + 1} `,
      );

      return;
    }
    // moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };
  render() {
    return (
      <DragDropContext
      onDragStart={this.onDragStart}
      // onDragUpdate={this.onDragUpdate}
      onDragEnd={this.onDragEnd}
      >
        <Droppable
          droppableId='column'
          type="column"
          direction='horizontal'
        >
        {(provided, snapshot) => (
          <Container
          {...provided.droppableProps}
          ref={provided.innerRef}
          >
            {this.state.columnOrder.map((columnId, index) => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map((taskId) => this.state.tasks[taskId]);
              // const isDropDisabled = index < this.state.homeIndex;
              return <Column key={column.id} column={column} tasks={tasks} index={index} />;
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
      </DragDropContext>
    )
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
