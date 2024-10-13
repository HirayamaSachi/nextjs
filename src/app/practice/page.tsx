import './style.css'
import HomeChild from "./homeChild"

export default function Home() {
    return (
        <main>
            <HomeChild title="this is title" text="this is text" textColor="red"/>
        </main>
    )
}