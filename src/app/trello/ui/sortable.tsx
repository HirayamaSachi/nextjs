import React from 'react'
import {useSortable} from '@dnd-kit/sortable'
import { CSS} from '@dnd-kit/utilities'
export default function SortableItem(props : {id: string, children: React.ReactNode}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.id})
    const style =  {
        transform: CSS.Transform.toString(transform),
        transition: transition
    }
    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>{props.children}</div>
    )
}