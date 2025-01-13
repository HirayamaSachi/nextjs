import React from 'react';
import {useDroppable} from '@dnd-kit/core';
export default function Droppable(props : {children: React.ReactNode, id: string}) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id
    })
    const style = {
        color: isOver ? 'green': undefined,
    }
    return (
        <div ref={setNodeRef} style={style} className="bg-red-300 w-1/3">
            {props.children}
        </div>
    )
}