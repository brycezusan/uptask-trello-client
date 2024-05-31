import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to={"/"}>
     <img src="/logo.svg" className="w-52"/>
    </Link>
  )
}

export default Logo