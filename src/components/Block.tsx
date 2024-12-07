import React from 'react'
import {
  Block as BlockType,
  Title as TitleType,
  Line as LineType,
} from '@progfay/scrapbox-parser'
import { Node } from './Node'
import { SbLine } from './SbLine'

export const Block = (props: {block: BlockType, line: SbLine}) => {
  switch (props.block.type) {
    case 'title':
      return <Title {...props.block} />
    case 'line':
      return <Line line={props.line} block={props.block} />
  }
}

const BlockBase = (props: { indent: number; children: React.ReactNode; line: SbLine }) => {
  const lineStyle = props.indent !== 0 ? 'sbx-line' : 'line' 
  return (
    <div style={{ marginLeft: 1.5 * props.indent + 'em' }} className={lineStyle}>
      {props.children}
    </div>
  )
}

const Title = (props: TitleType) => (
  <div className="line line-title">
    <span>{props.text}</span>
  </div>
)

const Line = (props: { block :LineType, line : SbLine}) => (
  <BlockBase indent={props.block.indent} line={props.line}>
    {!props.block.nodes.length ? (
      <br />
    ) : (
      props.block.nodes.map((node, i) => <Node key={i} {...node} />)
    )}
  </BlockBase>
)