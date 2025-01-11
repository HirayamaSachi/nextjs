import React, {useState, type Dispatch, type SetStateAction} from 'react'
import {DndContext, DragEndEvent} from '@dnd-kit/core'
import {SortableContext, arrayMove} from '@dnd-kit/sortable'
import { SortableItem } from './sortable'
export default function SortableList(props : {items: { id: number; content: string; }[], setItems: Dispatch<SetStateAction<{ id: number; content: string; }[]>>})
{
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event
        if(over && active.id !== over.id) {
            props.setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id)
                const newIndex = items.findIndex((item) => item.id === over.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={props.items}>
                {props.items.map((item) => (
                    <SortableItem id={item.id} content={item.content} />
                ))}
            </SortableContext>
        </DndContext>
    )
}