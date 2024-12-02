import { parse } from '@progfay/scrapbox-parser'
import { Page } from '../../../components/Page'
import Link from 'next/link'

type Props = {
    params: Promise<{
        project: string,
        pagetitle: string
    }>
}

type SbLine = {
    id: string
    text: string
}

type SbPage = {
    lines: SbLine[]
}


const toJson = (response : string) => {
    const json : SbPage = JSON.parse(response)
    return json.lines
} 

export default async function PageTitle({params} : Props) {
    const {project, pagetitle } = await params
    const url = `https://scrapbox.io/api/pages/${project}/${pagetitle}/`
    const response = await fetch(url)
    const text: string = await response.text()
    const sblines = toJson(text)

    const diaries : SbLine[][] = []
    let chank : SbLine[] = []
    for (const sbline of sblines) {
        if ('' !== sbline.text.trim()) {
            chank.push(sbline)
        } else if (chank.length > 0) {
            diaries.push(chank)
            chank = []
        } else {
            continue
        }
    }
    if (chank.length > 0) {
        diaries.push(chank)
        chank = []
    }

    const list = diaries.map((sblines, index) => {
        return (
            <>
                <li key={index} className='bg-white rounded p-2 m-2'>
                    <div className='w-full overflow-hidden'>
                        { sblines.map((sbline, i) => (
                            i === 0
                                ? <Page key={`${index}-${i}`} blocks={parse(sbline.text.replace(/^[ \t　]+?/, ''), { hasTitle: false})} ></Page>
                                : <Page key={`${index}-${i}`} blocks={parse(sbline.text, { hasTitle: false})} ></Page>
                        ))}
                    </div>
                    <div className='my-2'>
                        <Link className=''
                        href={`https://scrapbox.io/${project}/${pagetitle}#${sblines[0].id}`}>🔗</Link>
                    </div>
                </li>
            </>
        )
    })
    
    return (
        <>
            <h1 className='font-bold m-2'>{project}</h1>
            <ul>
                {list}
            </ul>
        </>   
    )
}