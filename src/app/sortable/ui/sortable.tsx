import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function SortableItem(props : {key: number, id: number, content: string}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform)
    } 
    return (
        <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {props.content}
        </li>
    )

}