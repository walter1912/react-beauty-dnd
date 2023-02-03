import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    display: flex;
    flex-wrap: 1;
    align-items: center;
    border: 2px solid #5B7DB1;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    // color: #5B7DB1;
    font-weight: 600;
    background-color: ${props => ( props.isDragDisabled?'#ccc':props.isDragging ? '#B6FFCE': '#E5EFC1')};
`;

const Handle = styled.div`
  width: 10px;
  height: 10px;
  background-color: #F0A500;
  border-radius: 1px;
  margin-right: 5px;
`;

export default class Task extends React.Component {
    render() {
        const isDragDisabled = this.props.task.id==='task';

        return (
            <Draggable 
            draggableId={this.props.task.id} 
            index={this.props.index} 
            isDragDisabled={isDragDisabled} 
            >
                {(provided, snapshot) => (
                    <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    isDragDisabled={isDragDisabled}
                    >
                        <Handle />
                        {this.props.task.content}
                    </Container>
                )}
            </Draggable>
        );
    } 
}