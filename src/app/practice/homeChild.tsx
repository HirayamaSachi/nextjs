interface HomeChild {
    title: string;
    text: string;
    textColor: string;
}
export default function HomeChild (props : HomeChild) {
    return (
        <div>
            <h1>{props.title}</h1>
            <p className={props.textColor}>{props.text}</p>
        </div>
    )
}