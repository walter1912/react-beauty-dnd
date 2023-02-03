import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import "./column.css";
import Task from './task';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 240px;
    background-color: ${(props => {
        if(props.id === 'column-1') return '#FFD36E'
        if(props.id === 'column-2') return '#FFF56D'
        if(props.id === 'column-3') return '#99FFCD'
    })}
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    flex-grow: 1;
    min-height: 100px;
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? '#FDF6EC': 'inherit')};
`;
export default class Column extends React.Component {
    render() {
        return (
       <Draggable
       draggableId={this.props.column.id}
       index={this.props.index}
     
       >
           {(provided, snapshot) => (
                <Container
                {...provided.draggableProps}
                ref={provided.innerRef}
                id={this.props.column.id}
                > 
                <Title
                {...provided.dragHandleProps}
                >
                    {this.props.column.title}
                </Title>
                <div style={{width: '99,9%', height:'1px',border: '1px solid #000'}}> </div>
                <Droppable 
                droppableId={this.props.column.id}
                // direction="horizontal"
                // type={this.props.column.id === 'column-3'?'done':'active'}
                // isDropDisabled={this.props.isDropDisabled}
                >
                {(provided, snapshot) => (
                    <TaskList
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                    >
                        {this.props.tasks.map(
                            (task, index) => 
                                (<Task key={task.id} task={task} index={index}/>)
                            )}
                        {provided.placeholder}
                    </TaskList>
                )}
                </Droppable>
            </Container>
            )}
       </Draggable>)
    }

}
