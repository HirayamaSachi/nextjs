import SortableItem from './sortable';
import Draggable from './draggable'
export default function SortableItemList(props: { id: string, color: string, name: string, items: { id: string, name: string }[] }) {
    return (
        <div key={props.id} id={props.id} className={`bg-${props.color}-50 p-10`}>
            <h1>{props.name}</h1>
            {
                Array.from(props.items?.entries()).map(([key, item]) => (
                    <SortableItem key={key} id={key.toString()}>
                        <div className='m-10'>
                            <Draggable id={key.toString()}>{item.name}</Draggable>
                        </div>
                    </SortableItem>
                ))
            }
        </div>
    )
}