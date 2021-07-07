import React from 'react'
import Link from 'next/link';
import { ResultPane, ResultsContainer, Title } from './styled'


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
          <ResultPane key={id}>
            <Link
              style={{ fontWeight: weight }}
              href={`/pieces/${pieceUrl}`}
            >{`${title}`}</Link>
            <br />
          </ResultPane>
        );
      }
    )
  };

  return (
    <div>
      <Title>{opera}</Title>
      <ResultsContainer>
        <OperaPiece />
      </ResultsContainer>
    </div>
  );
}