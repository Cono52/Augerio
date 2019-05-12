import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 30px;
  background-color: #cccccc;
  padding: 0 20px;
`;

class Search extends Component {
  render() {
    return (
      <Wrapper>
        <label>
          Keyword:
          <input type="text" placeholder="Keyword" />
        </label>
        <label>
          By Doctor:
          <select>
            <option value="volvo">Hanson</option>
            <option value="saab">Jumbo</option>
            <option value="mercedes">Flipo</option>
            <option value="audi">Diplo</option>
          </select>
        </label>
        <label>
          Has consent:
          <input type="checkbox" />
        </label>
        <button>Search</button>
      </Wrapper>
    );
  }
}

export default Search;
