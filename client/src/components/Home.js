import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './css/home.css';
function Home() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return (
    <div className="container">
      <div className="innerContainer">
        <h1>Search not implemented yet. </h1>
        <Form>
          <FormGroup>
            <Label for="searchbar">Searchbar</Label>
            <br></br>
            <Input
              type="text"
              name="searchbar"
              id="searchbar"
              placeholder="Enter search"
            />
          </FormGroup>
        </Form>
        <Button onClick={handleClick}>Search</Button>
        <p>{count}</p>
      </div>
    </div>
  );
}

export default Home;
