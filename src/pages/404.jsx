import React from 'react';
import styled from "styled-components";
import {Button} from "antd";

// Images
import page_404 from '../assets/images/404.png';
import {useHistory} from "react-router-dom";


function Page404() {
    const history = useHistory();
    const goHome = () => {
        history.push('/home');
    };

    return (
        <PageWrapper>
            <img src={page_404} />
            <Button onClick={goHome} type={"primary"}>Go home</Button>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  //justify-content: center;
  flex-direction: column;
  padding: 40px 0;
  overflow-y: auto;
  img {
    height: 100%;
    max-width: 300px;
    max-height: 300px;
    min-width: 100px;
    min-height: 100px;
  }
`

export default Page404;