import React, { Fragment } from 'react'
import { Container, Breadcrumbs, Link as MiLink, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const GroupPostEdit = (props) => {
    const { slug, id } = props.match.params;

    return (
        <Fragment>
            <Breadcrumbs aria-label="breadcrumb">
                <MiLink component={Link} to={`/mypage/group`}>
                    グループ管理
                </MiLink>
                <MiLink component={Link} to={`/mypage/group/${slug}`}>
                    {slug} 編集
                </MiLink>
                <Typography color="textPrimary">活動記録編集</Typography>
            </Breadcrumbs>
            <Container style={{ minHeight: '80vh' }}>
                <h1>活動記録編集</h1>
            </Container>
        </Fragment>
    )
}

export default GroupPostEdit
