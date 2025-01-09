'use client'
import React, { useState } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import classNames from 'classnames';

import Draggable from './ui/draggable'
import Droppable from './ui/droppable'

export default function Page() {
    const containers = [
        { id: '1', name: 'todo' , color: 'red' },
        { id: '2', name: 'process' , color: 'yellow'},
        { id: '3', name: 'complete' , color: 'blue'}
    ]
    const [draggableItems, setDraggableItems] = useState([
        { id: '1', name: "タスク1", parentId: '1'},
        { id: '2', name: "タスク2", parentId: '1' },
    ])
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if(over) {
            const NewItem: {id: string, name: string, parentId: string}[] = draggableItems.map(item => item.id == active.id ? {...item, parentId: String(over.id)} : item)
            setDraggableItems(NewItem)
        }
    }
    return (
        <DndContext onDragEnd={handleDragEnd}>
            {containers.map((container) => (
                <Droppable id={container.id} key={container.id}>
                    {/** todo_背景色を変える */}
                    <div className={classNames(`bg-${container.color}-50 p-10`)}>
                        <h1>{container.name}</h1>
                        {
                            draggableItems.filter((item) => item.parentId == container.id).map((item) => (
                                <Draggable key={item.id} id={item.id}>{item.name}</Draggable>
                            ))
                        }
                    </div>
                </Droppable>
            ))}

        </DndContext>
    )
}