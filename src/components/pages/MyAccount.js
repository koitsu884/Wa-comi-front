import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Box } from '@material-ui/core';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProfileEdit from './MyAccount/ProfileEdit';
import AccountEdit from './MyAccount/AccountEdit';

import 'react-tabs/style/react-tabs.css';


const MyAccount = () => {
    const currentUser = useSelector(state => state.auth.user);

    useEffect(() => {
        if (currentUser) {

        }
    }, [currentUser])

    return (
        <Container style={{ minHeight: '80vh' }}>
            <Box maxWidth={'60rem'} p={5} mx="auto">
                <Tabs>
                    <TabList>
                        <Tab>プロフィール編集</Tab>
                        <Tab>アカウント編集</Tab>
                    </TabList>

                    <TabPanel>
                        <ProfileEdit />
                    </TabPanel>
                    <TabPanel>
                        <AccountEdit />
                    </TabPanel>
                </Tabs>
            </Box>
        </Container>
    )
}

export default MyAccount
