import Toolbar from '../components/toolbar'
import Login from '../components/login'



function Home() {
  return (
    <div>
      <Toolbar title="homepage" />
      <Login username="example" />
      <Login username="" />
      <h1>Welcome to Next.js!, Hello World 2</h1>
      <p>this is my first next.js</p>
    </div>
  )
}

export default Home
