import { parse } from '@progfay/scrapbox-parser'
import { Page } from '../../../components/Page'


type Props = {
    params: Promise<{
        project: string,
        pagetitle: string
    }>
}

type Line = {
    text: string
}

type SbPage = {
    lines: Line[]
}


const toJson = (response : string) => {
    const json : SbPage = JSON.parse(response)
    return json.lines.map(l => l.text)
} 

export default async function PageTitle({params} : Props) {
    const {project, pagetitle } = await params
    const url = `https://scrapbox.io/api/pages/${project}/${pagetitle}/`
    const response = await fetch(url)
    const text: string = await response.text()
    const lines = toJson(text)

    const diaries : string[] = []
    let diary = ''
    for (const lineText of lines) {
        diary += lineText + '\n'
        if (lineText.trim() === '') {
            diaries.push(diary)
            diary = ''
            continue
        }
    }

    const list = diaries.map((t, index) => {
        return (
            <>
                <li key={index} className='bg-neutral-100 rounded-3xl p-10 m-10'>
                    <div className='max-h-60 overflow-hidden'>
                        <Page blocks={parse('\n' + t)} />
                    </div>
                </li>
            </>
        )
    })
    
    return (
        <ul>
        {list}
        </ul>   
    )
}