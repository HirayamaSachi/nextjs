import { useDroppable } from '@dnd-kit/core'

export function Droppable(props: {children: React.ReactNode, id: string}) {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    })
    const style = {
        color: isOver ? 'green' : undefined,
    }


    return (
        <div ref={setNodeRef} style={style} id={props.id}>
            {props.children}
        </div>
    )
}
