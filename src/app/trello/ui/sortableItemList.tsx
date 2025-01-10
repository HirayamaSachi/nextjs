import SortableItem from './sortable';
import Draggable from './draggable'
export default function SortableItemList(props: {color: string, name: string, items:{id: string, name: string}[]}) {
    return (
        <div className={`bg-${props.color}-50 p-10`}>
            <h1>{props.name}</h1>
            {
                props.items?.map((item: { id: string, name: string }) => (
                    <SortableItem key={item.id} id={item.id}>
                        <div className='m-10'>
                            <Draggable key={item.id} id={item.id}>{item.name}</Draggable>
                        </div>
                    </SortableItem>
                ))
            }
        </div>
    )
}