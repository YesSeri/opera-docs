import React from 'react';
import axios from 'axios';
import ScoreFrame from './ScoreFrame';
const Spinner = require('react-spinkit');

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
          this.setState({ postExists: false });
        }
      })
      .catch((err) => {
        if (err) console.error(err);
      });
  }

  PostInfo = () => {
    const {
      title,
      opera,
      description,
      type,
      first_name,
      last_name,
      placement,
    } = this.state.data;
    let renderPost = '';
    if (title) {
      renderPost = (
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
    return renderPost;
  };

  render() {
    return (
      <div className="container">
        <div className="innerContainer">
          {this.state.data ? this.PostInfo() : null}
          {!this.state.postExists ? <h1>Nothing here</h1> : null}
          {!this.state.postExists ? <p>Post not found</p> : null}
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

export default Post;
