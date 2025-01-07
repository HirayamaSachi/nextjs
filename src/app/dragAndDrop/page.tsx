"use client";

import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import Droppable from './ui/droppable';
import Draggable from './ui/draggable';
import { useState } from 'react';


export default function Page() {
    const containers = ['A', 'B', 'C'];
    const [parent, setParent] = useState<UniqueIdentifier | null>(null);

    const draggableMarkup = (
        <Draggable id="draggable">
            <div className='cursor-grab w-48 h-20 bg-blue-200 flex justify-center items-center'>
                Drag me
            </div>
        </Draggable>
    );

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className='flex flex-col justify-center items-center w-screen h-screen gap-8'>
            {/** ドラッグするアイテム */ }
                <div className='flex h-20'>
                    {parent === null ? draggableMarkup : null}
                </div>
                {/** ドラッグするアイテム */ }
                <div className='flex'>
                    {containers.map((id) => (
                        <Droppable key={id} id={id} isOverAddClass="bg-green-700">
                            <div className='w-52 h-24 border-2 border-dashed border-gray-100/50 flex justify-center items-center'>
                                {parent === id ? draggableMarkup : 'Drop here'}
                            </div>
                        </Droppable>
                    ))}
                </div>
            </div>
        </DndContext>
    );

    function handleDragEnd(event: DragEndEvent) {
        const { over } = event;
        setParent(over ? over.id : null);
    }
}
