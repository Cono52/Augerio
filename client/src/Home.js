import React, { Component } from "react";
import styled from "styled-components";

import Header from "./Header";
import Search from "./Search";
import Post from "./Post";

const Wrapper = styled.div``;

const Main = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  > * {
    margin: 10px;
  }
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingFakeData: false,
      fakeData: []
    };
  }

  async componentDidMount() {
    const fakeData = await fetch("http://localhost:3001/data").then(response =>
      response.json()
    );
    this.setState({ fakeData });
  }

  render() {
    return (
      <Wrapper>
        <Header />
        <Search />
        <Main>
          {this.state.fakeData.length === 0 && !this.state.fetchingFakeData
            ? "loading"
            : this.state.fakeData.map((postObject, i) => (
                <Post key={i + "button"} postObject={postObject} />
              ))}
        </Main>
      </Wrapper>
    );
  }
}

export default Home;
