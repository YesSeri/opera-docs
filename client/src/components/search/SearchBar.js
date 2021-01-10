import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import diacritics from 'diacritics';

const SearchBar = ({ setSearchValue }) => {
	// Parent component of SearchBar and SearchResults is Search
	return (
		<Container style={{ paddingTop: '10px' }}>
			<Col lg={{ span: 6, offset: 3 }}>
				<Form>
					<Form.Group controlId="searchBar">
						<Form.Control
							type="text"
							placeholder="Enter search"
							onChange={(e) => {
								setSearchValue(diacritics.remove(e.target.value)); // Remove all strange italian signs above letters for better search, e.g. è and é
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
};
export default SearchBar;
