import { Page as PageType } from '@progfay/scrapbox-parser'
import { Block } from './Block'
import { SbLine } from './SbLine'

export const Page = (props: { blocks: PageType, line: SbLine }) => (
  <div className="line relative" data-created={props.line.created} data-updated={props.line.updated}>
    {props.blocks.map((block, i) => (
      <Block key={i} line={props.line} block={block} />
    ))}
  </div>
)