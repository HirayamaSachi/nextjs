'use server'

import { serverAction} from './server-action'

export default async function Home() {
  return (
    <main>
      <h1 className="title">index page</h1>
      <p className="msg">メッセージを送信</p>
      <div>
        <form className="form" action={serverAction}>
            <input className="input" type="text" name="input" />
          <button className="btn">click</button>
        </form>
      </div>
    </main>
  )
}