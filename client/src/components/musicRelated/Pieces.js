import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Pieces extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/pieces/`)
      .then((response) => {
        const { data } = response;
        this.setState({
          data,
        });
      })
      .catch((err) => {
        if (err) console.error(err);
      });
  }

  PiecesInfo = () => {
    const data = this.state.data;
    const pieces = [];
    if (data) {
      data.forEach((el) => {
        pieces.push(
          <div key={el.piece_id}>
            <Link to={`/piece/${el.piece_id}`}>{el.title}</Link>
            <Link to={`/opera/${el.opera_id}`}>{el.opera}</Link>
            <Link to={`/composer/${el.composer_id}`}>{el.last_name}</Link>
          </div>
        );
      });
    }
    return pieces;
  };

  render() {
    return (
      <>
        <h1>All pieces</h1>
        {this.state.data ? this.PiecesInfo() : null}
      </>
    );
  }
}

export default Pieces;
