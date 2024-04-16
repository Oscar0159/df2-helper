'use client';

import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function DndDemo() {
    const [items, setItems] = useState(['A', 'B', 'C']);
    return (
        <DragDropContext
            onBeforeCapture={(e) => console.log('onBeforeCapture: ', e)}
            onBeforeDragStart={(e) => console.log('onBeforeDragStart: ', e)}
            onDragStart={(e) => console.log('onDragStart: ', e)}
            onDragUpdate={(e) => console.log('onDragUpdate: ', e)}
            onDragEnd={(e) => console.log('onDragEnd: ', e)}
        >
            <pre>{JSON.stringify(items, null, 2)}</pre>
            <h1>Todo</h1>
            <Droppable droppableId="drop-id">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {items.map((item, i) => (
                            <div key={item}>
                                <Draggable draggableId={item} index={i}>
                                    {(provided) => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            {item}
                                        </div>
                                    )}
                                </Draggable>
                            </div>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
