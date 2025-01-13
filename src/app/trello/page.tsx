'use client'
import React, { useState } from 'react'
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
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
    taskMap.set('1', { id: 'task-1', name: "タスク1", parentId: '3' })
    taskMap.set('2', { id: 'task-2', name: "タスク2", parentId: '1' })
    taskMap.set('3', { id: 'task-3', name: "タスク3", parentId: '1' })

    const containerMap = new Map()
    containerMap.set('1', { id: 'container-1', name: 'todo', color: 'red' })
    containerMap.set('2', { id: 'container-2', name: 'process', color: 'yellow' })
    containerMap.set('3', { id: 'container-3', name: 'complete', color: 'blue' })

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
        if(over?.id === undefined ) return 
        if (over.id?.toString().includes('container')) {
            const originalTaskId = active.id?.toString().replace('task-', '')
            const activeTask = tasks.get(originalTaskId)
            if (activeTask == undefined) return

            // 別の要素に移動させた場合更新
            if (activeTask.parentId !== over.id) {
                const updateTasks = new Map(tasks)
                const updateLists = new Map()
                updateTasks.set(originalTaskId, { ...activeTask, parentId: over.id?.toString().replace('container-', '') })
                setTasks(updateTasks)
                lists.forEach((container, c_key) => {
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
        if(over.id?.toString().includes('task')) {
            const originalTaskId = active?.id.toString().replace('task-', '')
            const activeTask = tasks.get(originalTaskId)

            const updateLists = new Map(lists)
            const originalContainer = updateLists.get(activeTask.parentId.replace('container-', ''))
            const originalItemsInContainer:{id: string, name: string, parentId: string}[] = originalContainer.items
            const oldIndex = Array.from(originalItemsInContainer.values()).findIndex((item) => item.id === active?.id)
            const newIndex = Array.from(originalItemsInContainer.values()).findIndex((item) => item.id === over?.id)
            const updateItemsInContainer:{id: string, name: string, parentId: string}[] = arrayMove(Array.from(originalItemsInContainer.values()), oldIndex, newIndex)
            const updateTasks = new Map()
            Array.from(updateItemsInContainer).forEach((item) => {
                if(item.id == undefined) return
                updateTasks.set(item.id.toString().replace('task-', ''), item)
            })
            updateLists.set(activeTask.parentId.replace('container-', ''), {...originalContainer, items: updateTasks})
            setLists(updateLists)
        }
    }

    const handleDragOver = (event:DragOverEvent) => {
        const {active, over} = event
        if(over === undefined) return
        const from = active?.data?.current?.sortable
        const to = over?.data?.current?.sortable
        if(to === undefined || from.containerId === to.containerId) return
        // 別要素への移動
        const updateTasks = new Map(tasks)
        const originalTask = tasks.get(active.id.toString().replace('task-', ''))
        updateTasks.set(active.id.toString().replace('task-', ''), {...originalTask, parentId: to.containerId.toString().replace('container-', '')})
        setTasks(updateTasks)
        const updateLists = new Map(lists)

        lists.forEach((container, c_key) => {
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

        // 順序変更
        const toContainer = updateLists.get(to.containerId.toString().replace('container-', ''))
        const toItems :{id: string, name: string, parentId: string}[]= toContainer.items
        const updateItemsInContainer = new Map()
        Array.from(toItems.values()).forEach((item,i) => {
            if(i === to.index) {
                const fromTask = tasks.get(active.id.toString().replace('task-', ''))
                updateItemsInContainer.set(fromTask.id.toString().replace('task-', ''), fromTask)
            }
            updateItemsInContainer.set(item.id.toString().replace('task-', ''), item)
        })
        updateLists.set(to.containerId.toString().replace('container-', ''), {...toContainer, items: updateItemsInContainer})
        setLists(updateLists)
    }
    return (
        <div className='flex flex-row m-32 gap-2'>
            <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver} sensors={sensors} collisionDetection={closestCenter} id="list-id">
                {Array.from(lists.values()).map((list) => (
                    <SortableContext key={list.id} id={list.id} items={Array.from(list.items?.values())} strategy={verticalListSortingStrategy}>
                        <Droppable id={list.id}>
                            <SortableItemList id={list.id} items={Array.from(list.items?.values())} color={list.color} name={list.name}></SortableItemList>
                        </Droppable>
                    </SortableContext>
                ))}
            </DndContext>
        </div>
    )
}