import './style.css'

export default function OtherLayout ({
    children,
}: {
    children: React.ReactNode
}){
    return (
        <html lang="ja">
        <body>
            <h1 className="header">sample web application.</h1>
            {children}
            <div className="footer">
                <hr />
                <p className="footer-content">
                    copyright 2024 sachi.
                </p>
            </div>
        </body>
        </html>
    )
}