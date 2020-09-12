import React from 'react';
import axios from 'axios';

import ScoreFrame from './ScoreFrame';

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      postExists: true,
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
          this.setState({postExists: false})
        }
      })
      .catch((err) => {
        if (err) console.error(err);
      });
  }

  PostInfo = () => {
    const data = this.state.data;
    let renderPost = '';
    if (data) {
      renderPost = (
        <div>
          <h2>{data.title}</h2>
          <h3>{data.opera}</h3>
          <p>{data.description}</p>
          <p>It is a {data.type}</p>
          <p>{`${data.first_name} ${data.last_name}`}</p>
          <p>Number {data.placement} in the opera</p>
        </div>
      );
    }
    return renderPost;
  };

  render() {
    const data = this.state.data;
    return (
      <div className="container">
        <div className="innerContainer">
          {data ? this.PostInfo() : null}
          {!this.state.postExists ? <h1>Nothing here</h1> : null}
          {!this.state.postExists ? <p>Post not found</p> : null}
          {this.state.postExists ? <ScoreFrame /> : null}

        </div>
      </div>
    );
  }
}

export default Post;
