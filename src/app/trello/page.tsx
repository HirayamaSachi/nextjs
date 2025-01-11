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

    const taskMap = new Map()
    taskMap.set('1', { name: "タスク1", parentId: '3' })
    taskMap.set('2', { name: "タスク2", parentId: '1' })
    taskMap.set('3', { name: "タスク3", parentId: '1' })

    const containerMap = new Map()
    containerMap.set('1', { name: 'todo', color: 'red' })
    containerMap.set('2', { name: 'process', color: 'yellow' })
    containerMap.set('3', { name: 'complete', color: 'blue' })

    const listMap = new Map()
    containerMap.forEach((container, c_key) => {
        const tasksByContainer = new Map()
        taskMap.forEach((task, t_key) => {
            if (task.parentId == c_key) {
                tasksByContainer.set(t_key, task)
            }
        })
        listMap.set(c_key, {
            ...container,
            items: tasksByContainer
        })
    })

    const [tasks, setTasks] = useState(taskMap)
    const [containers, setContainers] = useState(containerMap)
    const [lists, setLists] = useState(listMap)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (over) {
            const activeTask = tasks.get(active.id)
            if (activeTask == undefined) return

            // 別の要素に移動させた場合更新
            if (activeTask.parentId !== over.id) {
                const updateTasks = new Map(tasks)
                const updateLists = new Map()
                updateTasks.set(active.id, { ...activeTask, parentId: over.id })
                setTasks(updateTasks)
                containers.forEach((container, c_key) => {
                    const tasksByContainer = new Map()
                    updateTasks.forEach((task, t_key) => {
                        if (task.parentId == c_key) {
                            tasksByContainer.set(t_key, task)
                        }
                    })
                    updateLists.set(c_key, {
                        ...container,
                        items: tasksByContainer
                    })
                })
                setLists(updateLists)
            }
        }
        // todo:arrayMove
    }
    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
            {Array.from(lists.entries()).map(([key, list]) => (
                <Droppable id={key} key={key}>
                    <SortableContext items={Array.from(list.items.values())} strategy={verticalListSortingStrategy}>
                        <SortableItemList id={key} items={list.items} color={list.color} name={list.name}></SortableItemList>
                    </SortableContext>
                </Droppable>
            ))}
        </DndContext>
    )
}