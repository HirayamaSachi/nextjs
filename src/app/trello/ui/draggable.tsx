import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities'
export default function Draggable(props : {children: React.ReactNode, id: string}) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id
    })
    const style = transform ? {
        transform: CSS.Transform.toString(transform),
        zIndex: transform ? 999 : undefined, // ドラッグ中の要素を前面に表示
        cursor: 'grab',
        width: 'auto', // サイズを明示的に指定
        height: 'auto', // サイズを明示的に指定

    }: undefined
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </div>
    )
}