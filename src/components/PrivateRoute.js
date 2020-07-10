import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, userType, currentUser, ...rest }) => {
    let result = currentUser ? true : false;


    // if (currentUser) {
    //     if (!userType || currentUser.profile.user_type === userType) {
    //         result = true;
    //     }
    // }

    return (
        <Route
            {...rest}
            render={props => result
                ? (
                    <Component {...props} />
                )
                : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

const mapStateToProps = state => ({
    currentUser: state.auth.user
});

export default connect(mapStateToProps)(PrivateRoute);
