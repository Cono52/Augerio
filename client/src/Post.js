import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: 0;
  background-color: red;
  color: white;
  width: 120px;
  border-radius: 5px;
  height: 40px;
  outline: none;
`;

const Wrapper = styled.div`
  border-radius: 5px;
  display: flex;
  box-shadow: 1px 1px 8px 0px #cccccc;
  width: 700px;
  padding: 5px;
  img {
    width: 200px;
    height: 200px;
  }
  .details {
    width: 100%;
    margin-left: 50px;
    .description {
      font-size: 1.65rem;
    }
    .author {
      font-size: 1rem;
    }
    ${Button} {
      margin-top: 20px;
    }
  }
`;

const Post = ({ postObject: { imageUrl, description, email } }) => (
  <Wrapper>
    <img src={imageUrl} alt="button1" />
    <div className="details">
      <p className="description">{description}</p>
      <p className="author">Created By: {email}</p>
      <Button>Select Post</Button>
    </div>
  </Wrapper>
);

export default Post;
