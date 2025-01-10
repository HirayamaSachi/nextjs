'use client'
import React, { useState } from 'react'
import {
    DndContext,
    DragEndEvent,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';


import Droppable from './ui/droppable'
import SortableItemList from './ui/sortableItemList';

export default function Page() {
    const [draggableItems, setDraggableItems] = useState([
    ])

    const [tasks, setTasks] = useState([
        { id: '1', name: "タスク1", parentId: '3' },
        { id: '2', name: "タスク2", parentId: '1' },
        { id: '3', name: "タスク3", parentId: '1' },
    ])
    const [containers, setContainers] = useState([
        {id: '1', name: 'todo', color: 'red'},
        { id: '2', name: 'process', color: 'yellow' },
        { id: '3', name: 'complete', color: 'blue' }
    ])
    const [lists, setLists] = useState(
        containers.map((container) => {
            return {
                ...container,
                items: tasks.filter(task => task.parentId == container.id)
            }
        }) 
    )
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )
    const handleDragEnd = (event: DragEndEvent) => {
        // todo:更新周りの処理
        const { active, over } = event
        if (over) {
            const activeTask = tasks.find(task => task.id === active.id)
            if(activeTask == undefined) return
            if(activeTask.parentId !== over.id) {
                const newLists =lists.map((list) => {
                    if(list.id === activeTask.parentId) {
                        // todo:削除
                        return {...list, items: []}
                    }else if( list.id === over.id ) {
                        // todo:追加
                        return {...list, items: []}
                    }else {
                        return list
                    }
                })
                // todo:更新
                // setLists()
            }
        }
        // todo:arrayMove
    }
    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
            {lists.map((list) => (
                <Droppable id={list.id} key={list.id}>
                    <SortableContext items={draggableItems} strategy={verticalListSortingStrategy}>
                        <SortableItemList items={list.items} color={list.color} name={list.name}></SortableItemList>
                    </SortableContext>
                </Droppable>
            ))}
        </DndContext>
    )
}