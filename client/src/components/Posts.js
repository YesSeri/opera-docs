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
        if (err) throw err;
      });
  }

  PostsInfo = () => {
    const data = this.state.data;
    const posts = [];
    if (data) {
      data.forEach((el) => {
        posts.push(
          <div key={el.id}>
            <Link to={`/post/${el.id}`}>
              {`${el.title} - 
                ${el.type} - 
                ${el.opera} - 
                ${el.first_name} - 
                ${el.last_name}
              `}
            </Link>
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
          <ul>{this.state.data ? this.PostsInfo() : null}</ul>
        </div>
      </div>
    );
  }
}

export default Posts;
