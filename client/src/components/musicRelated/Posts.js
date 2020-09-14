import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Posts extends React.Component {
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

  PostsInfo = () => {
    const data = this.state.data;
    const posts = [];
    const borderStyle = 'solid green 1px';
    const innerDivStyle = { flex: '1 0 0'}
    if (data) {
      data.forEach((el) => {
        posts.push(
          <div
            key={el.piece_id}
            style={{
              display: 'flex',
              borderTop: borderStyle,
              height: '50px',
              alignItems: 'center'

            }}
          >
            <div style={innerDivStyle}>
              <Link to={`/post/${el.piece_id}`}>{el.title}</Link>
            </div>
            <div style={innerDivStyle}>
              <Link to={`/opera/${el.opera_id}`}>{el.opera}</Link>
            </div>
            <div style={innerDivStyle}>
              <Link to={`/composer/${el.composer_id}`}>{el.last_name}</Link>
            </div>
            <br />
          </div>
        );
      });
    }
    return posts;
  };

  render() {
    return (
      <div className="container">
        <div className="innerContainer">
          <h1>All pieces</h1>
          <div>{this.state.data ? this.PostsInfo() : null}</div>
        </div>
      </div>
    );
  }
}

export default Posts;
