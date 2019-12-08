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
    this.setState({ fetchingFakeData: true });
    fetch("http://192.168.1.104:3001/getallposts", {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(res => this.setState({ fakeData: res, fetchingFakeData: false }))
      .catch(error => {
        console.log(error);
        this.setState({ error, fetchingFakeData: false });
      });
  }

  render() {
    const { fakeData, fetchingFakeData, error } = this.state;

    let contentToRender;

    if (fetchingFakeData) {
      contentToRender = <div>Loading</div>;
    }

    if (error) {
      contentToRender = <div>{`Something went wrong... ${error}`}</div>;
    }

    if (fakeData.length === 0 && !fetchingFakeData) {
      contentToRender = "Empty";
    }

    return (
      <Wrapper>
        <Header />
        <Search />
        <Main>
          {contentToRender
            ? contentToRender
            : fakeData.map((postObject, i) => (
                <Post key={i + "button"} postObject={postObject} />
              ))}
        </Main>
      </Wrapper>
    );
  }
}

export default Home;
