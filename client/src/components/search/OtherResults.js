import React from 'react';
import { composerPost, operaPost, piecePost } from './SearchResultsHelper';
import Row from 'react-bootstrap/Row';

export default function OtherResults({ results }) {
  if (results[1] === undefined) return <></>;
  const otherResults = [];
  const className = 'otherResult';
  for (let i = 1; i < 25; i++) {
    // Shows a maximum of 25 search results. Probably overkill to be honest. Undefined means that I have not found that many results, and should show all the results found, and not more.
    if (results[i] === undefined) break;
    otherResults.push(results[i]);
  }
  return (
    <Row xs={1} sm={2} md={3} className="align-items-center bottomRow">
      {otherResults.map((result, index) => {
        let container;
        switch (result.resultType) {
          case 'composer': {
            return composerPost(result, className, index);
          }
          case 'opera': {
            return operaPost(result, className, index);
          }
          case 'piece': {
            return piecePost(result, className, index);
          }
          default:
            container = <></>;
        }
        return container;
      })}
    </Row>
  );
}
