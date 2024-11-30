import React from 'react'
import {
  Block as BlockType,
  Title as TitleType,
  CodeBlock as CodeBlockType,
  Table as TableType,
  Line as LineType,
} from '@progfay/scrapbox-parser'
import { Node } from './Node'

export const Block = (props: BlockType) => {
  switch (props.type) {
    case 'title':
      return <Title {...props} />
    case 'line':
      return <Line {...props} />
  }
}

const BlockBase = (props: { indent: number; children: React.ReactNode }) => (
  <div style={{ marginLeft: 1.5 * props.indent + 'em' }} className="line">
    {props.children}
  </div>
)

const Title = (props: TitleType) => (
  <div className="line line-title">
    <span>{props.text}</span>
  </div>
)

const Line = (props: LineType) => (
  <BlockBase indent={props.indent}>
    {!props.nodes.length ? (
      <br />
    ) : (
      props.nodes.map((node, i) => <Node key={i} {...node} />)
    )}
  </BlockBase>
)