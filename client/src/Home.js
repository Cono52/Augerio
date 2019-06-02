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
      fakeData: [],
      error: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/getallposts")
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        this.setState({ fakeData: response.json() });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error });
      });
  }

  render() {
    const { fakeData, fetchingFakeData, error } = this.state;

    if (fetchingFakeData) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>{`Something went wrong... ${error}`}</div>;
    }

    return (
      <Wrapper>
        <Header />
        <Search />
        <Main>
          {fakeData.length === 0 && !fetchingFakeData
            ? "Empty"
            : fakeData.map((postObject, i) => (
                <Post key={i + "button"} postObject={postObject} />
              ))}
        </Main>
      </Wrapper>
    );
  }
}

export default Home;
