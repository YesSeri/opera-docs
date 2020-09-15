import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const SearchBar = ({ setSearchValue }) => {
  return (
    <Container>
      <Col md={{ span: 8, offset: 2 }}>
        <Form>
          <Form.Group controlId="searchBar">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter search"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Enter the name of an opera, composer or piece.
            </Form.Text>
          </Form.Group>
        </Form>
      </Col>
    </Container>
  );
}
export default SearchBar;