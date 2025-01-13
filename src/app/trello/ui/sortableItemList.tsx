import SortableItem from './sortable';
import Draggable from './draggable'
export default function SortableItemList(props: { id: string, color: string, name: string, items: { id:string, name: string, parentId: string}[] }) {
    return (
        <div id={props.id}>
            <h1>{props.name}</h1>
            {
                props.items.map((item) => (
                    <SortableItem key={item.id} id={item.id}>
                        <div>
                            <Draggable id={item.id}>{item.name}</Draggable>
                        </div>
                    </SortableItem>
                ))
            }
        </div>
    )
}