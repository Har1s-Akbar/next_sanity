export function Premium() {
    return (
      <main className='bg-[url("https://images.unsplash.com/photo-1536854150886-354a3b64b7d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80")] bg-cover rounded-lg w-11/12 h-56 backdrop-blur-lg rounded drop-shadow-lg my-10'>
          <div className='flex flex-col items-center justify-center w-9/12 mt-12 m-auto'>
              <div className='flex flex-col items-center justify-center'>
                  <h1 className='text-secondary text-2xl font-semibold dark:text-white text-center'>Become our premium member</h1>
              </div>
              <button className='py-1 w-1/3 rounded-lg font-semibold bg-secondary text-foreground my-4 hover:bg-foreground hover:text-secondary transition ease-in-out'>Join Us</button>
          </div>
      </main>
    )
  }