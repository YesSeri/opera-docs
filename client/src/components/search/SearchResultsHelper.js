import Fuse from 'fuse.js';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import {
  createPieceUrl,
  createComposerUrl,
  createOperaUrl,
} from '../helper/HelperFunctions';

export function composerPost(result, className, index = null) {
  const { last_name, first_name } = result.item;
  const url = createComposerUrl(last_name);
  return (
    <Col key={index}>
      <Nav.Link
        className={className}
        href={url}
      >{`${last_name}, ${first_name}`}</Nav.Link>
    </Col>
  );
}
export function operaPost(result, className, index = null) {
  const { opera_id, opera, last_name } = result.item;
  const url = createOperaUrl(last_name, opera_id, opera);
  return (
    <Col key={index}>
      <Nav.Link className={className} href={url}>{`${opera}`}</Nav.Link>
    </Col>
  );
}

export function piecePost(result, className, index = null) {
  const { title, piece_id, last_name, opera_id, opera, type } = result.item;
  const url = createPieceUrl(last_name, opera_id, opera, piece_id, title);
  return (
    <Col key={index}>
      <Nav.Link className={className} href={url}>
        {type === 'ouverture' ? `${title} - ${opera}` : title}
      </Nav.Link>
    </Col>
  );
}
export function search(data, resultType, optionsType, searchValue) {
  const fuse = new Fuse(data, optionsType);
  const search = fuse.search(searchValue);
  return search.map(function (el) {
    var o = Object.assign({}, el);
    o.resultType = resultType;
    return o;
  });
}
export const optionsPieces = {
  includeScore: true,
  shouldSort: false,
  location: true,
  keys: ['title'],
};
export const optionsOperas = {
  includeScore: true,
  shouldSort: false,
  location: true,
  keys: ['opera'],
};

export const optionsComposers = {
  includeScore: true,
  shouldSort: false,
  location: true,
  keys: ['last_name', 'first_name'],
};
