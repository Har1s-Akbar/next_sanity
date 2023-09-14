import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tag } from '../lib/interface'
import Link from 'next/link'

function Tags({data}:{data: Tag[]}) {
  return (
    <section className='flex w-10/12 mx-auto flex-col border-secondary dark:bg-background border-2 bg-opacity-20 rounded items-center justify-center my-2'>
      <h1 className='col-span-3 text-3xl font-medium text-center my-7'>Tags</h1>
      <Separator className="my-7 w-7/12 m-auto" />
      <div className=''>
        {data.map((item)=>{
            return <button>
              <Link href={`/tags/${item.slug.current}`}>
                <Badge variant="outline" className='mx-5 py-2 hover:bg-foreground hover:text-secondary my-5 bg-cover'>{item.title}</Badge>
              </Link>
            </button>
            })}
        </div>
    </section>
  )
}

export default Tags