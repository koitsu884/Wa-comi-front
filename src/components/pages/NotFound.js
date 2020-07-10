import React from 'react'
import { Container } from '@material-ui/core';

const NotFound = () => {
    return (
        <Container style={{ height: "80vh" }}>
            <h1>ページが見つかりません</h1>
            <div>お探しのページは見つかりませんでした。</div>
        </Container>
    )
}

export default NotFound
