'use client'
import React, {useState} from 'react'
import SortableList from './ui/sortableList'

export default function Page() {
    const [items, setItems] = useState([
        {id: 1, content: 'item 1'},
        {id: 2, content: 'item 2'},
        {id: 3, content: 'item 3'},
    ])
    return <SortableList items={items} setItems={setItems}/>
}