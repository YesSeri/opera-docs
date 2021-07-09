import React from 'react'
import Link from 'next/link';
import { ResultPaneSingle, ResultsContainerSingle, Title } from './styled'


export default function OperaWithId({ data }) {
  const opera = data[0].name
  const OperaPiece = () => {
    return data.map(
      ({ title, id, type }) => {
        // const pieceUrl = createPieceUrl(last_name, opera_id, name, id, title);
        const pieceUrl = id
        const weight =
          type === 'recitativo' || type === 'choir' || type === 'intermezzo' || type === 'other'
            ? 'normal'
            : 'bold';
        return (
          <ResultPaneSingle key={id}>
            <Link
              style={{ fontWeight: weight }}
              href={`/pieces/${pieceUrl}`}
            >{`${title}`}</Link>
            <br />
          </ResultPaneSingle>
        );
      }
    )
  };

  return (
    <div>
      <Title>{opera}</Title>
      <ResultsContainerSingle>
        <OperaPiece />
      </ResultsContainerSingle>
    </div>
  );
}