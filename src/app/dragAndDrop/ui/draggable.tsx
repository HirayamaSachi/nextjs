import { useDraggable } from '@dnd-kit/core'

type DraggableProps = {
    children: React.ReactNode
    id: string
}

export default function Draggable({ children, id }: DraggableProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    })


    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}.px, 0 )`
    } : undefined

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </button>
    )
}
