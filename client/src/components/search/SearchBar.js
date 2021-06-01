import React from 'react';
import Form from 'react-bootstrap/Form';
import diacritics from 'diacritics';
import { SearchContainer } from './styled'

const SearchBar = ({ setSearchValue }) => {
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
