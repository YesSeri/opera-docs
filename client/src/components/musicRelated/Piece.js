import React from 'react';
import axios from 'axios';
import ScoreFrame from '../ScoreFrame';

class Piece extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      pieceExists: true,
    };
  }

  componentDidMount() {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    axios
      .get(`/api/pieces/${id}`)
      .then((response) => {
        const { data } = response;

        if (data) {
          this.setState({
            data,
          });
        } else {
          this.setState({ pieceExists: false });
        }
      })
      .catch((err) => {
        if (err) console.error(err);
      });
  }

  PieceInfo = () => {
    const {
      title,
      opera,
      description,
      type,
      first_name,
      last_name,
      placement,
    } = this.state.data;
    let renderPiece = '';
    if (title) {
      renderPiece = (
        <div>
          <h2>{title}</h2>
          <h3>{opera}</h3>
          <p>{description}</p>
          <p>It is a {type}</p>
          <p>{`${first_name} ${last_name}`}</p>
          <p>Number {placement} in the opera</p>
        </div>
      );
    }
    return renderPiece;
  };

  render() {
    return (
      <div className="container">
        <div className="innerContainer">
          {this.state.data ? this.PieceInfo() : null}
          {!this.state.pieceExists ? <h1>Nothing here</h1> : null}
          {!this.state.pieceExists ? <p>Piece not found</p> : null}
          {this.state.data ? (
            <ScoreFrame filename={this.state.data.file_title} />
          ) : (
            null
          )}
        </div>
      </div>
    );
  }
}

export default Piece;
