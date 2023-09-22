'use client'
import { useGlobalContext } from "../context/context"

function page() {
    const {getUser, user} =useGlobalContext();
    console.log(user)
  return (
    <div>
        <button className="border" onClick={getUser}>
            sign in
        </button>
    </div>
  )
}

export default page