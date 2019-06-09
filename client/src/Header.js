import React, { Component } from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiLogin } from "@mdi/js";
import { withRouter } from "react-router-dom";

const Logo = styled.div``;

const Wrapper = styled.div`
  background-color: black;
  width: 100%;
  height: 40px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-weight: bold;
  svg {
    fill: white;
    color: white;
  }
`;

class Header extends Component {
  render() {
    return (
      <Wrapper>
        <Logo>Content</Logo>
        <Icon
          onClick={() => {
            localStorage.removeItem("token");
            this.props.history.push("/");
          }}
          path={mdiLogin}
          size={1}
        />
      </Wrapper>
    );
  }
}

export { Header };
export default withRouter(Header);
