'use client'

import { useGlobalContext } from "../context/context"

function Pagebutton() {
    const {setPage, page} = useGlobalContext()
    console.log(page)
  return (
    <main>
        {page}
    </main>
  )
}

export default Pagebutton