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
    if (data) {
      data.forEach((el) => {
        posts.push(
          <div
            key={el.id}
            style={{
              display: 'flex',
              borderTop: borderStyle,
              borderLeft: borderStyle,
              borderLeft: borderStyle,
            }}
          >
            <div style={{ flex: '2 0 0', borderRight: borderStyle }}>
              <Link to={`/post/${el.id}`}>{el.title}</Link>
            </div>
            <div style={{ flex: '1 0 0', borderRight: borderStyle }}>
              <p to={`/post/${el.id}`}>{el.opera}</p>
            </div>
            <div style={{ flex: '1 0 0', borderRight: borderStyle }}>
              <p to={`/post/${el.id}`}>{el.last_name}</p>
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
