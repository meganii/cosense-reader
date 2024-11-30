import { parse } from '@progfay/scrapbox-parser'
import { Page } from '../../../components/Page'


type Props = {
    params: {
        project: string,
        pagetitle: string
    }
}

export default async function PageTitle({params} : Props) {
    const {project, pagetitle } = await params
    const url = `https://scrapbox.io/api/pages/${project}/${pagetitle}/text`
    const response = await fetch(url)
    const text: string = await response.text()
    const lines = text.split("\n\n")

    const diaries : any[] =lines.map((line, index) => {
        return (
            <>
                <li key={index} className='bg-neutral-100 rounded-3xl p-10 m-10'>
                    <div className='max-h-60 overflow-hidden'>
                        <Page blocks={parse('\n' + line)} />
                    </div>
                </li>
            </>
        )
    })
    
    return (
        <ul>
        {diaries}
        </ul>   
    )
}