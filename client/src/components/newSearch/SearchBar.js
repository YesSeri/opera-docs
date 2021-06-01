import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import diacritics from 'diacritics';
import styled from 'styled-components';

const SearchContainer = styled(Container)`
	padding-top:10px;
	max-width: 600px;
`;

const SearchBar = ({ setSearchValue }) => {
	// Parent component of SearchBar and SearchResults is Search
	const disableEnter = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
		}
	}
	return (
		<SearchContainer>
			<Form>
				<Form.Control
					type="text"
					placeholder="Enter search"
					onKeyDown={disableEnter}
					onChange={(e) => {
						setSearchValue(diacritics.remove(e.target.value)); // Remove all strange italian signs above letters for better search, e.g. è and é
					}}
				/>
				<Form.Text className="text-muted">
					Enter the name of an opera, composer or piece.
				</Form.Text>
			</Form>
		</SearchContainer>
	);
};

export default SearchBar;
