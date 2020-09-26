import React from 'react';
import { composerPost, operaPost, piecePost } from './SearchResultsHelper';

export default function TopResult({ topResult }) {
  if (topResult === undefined) return <></>;
  const className = 'topResult';
  switch (topResult.resultType) {
    case 'composer': {
      return composerPost(topResult, className);
    }
    case 'opera': {
      return operaPost(topResult, className);
    }
    case 'piece': {
      return piecePost(topResult, className);
    }
    default:
      return <></>;
  }
}
