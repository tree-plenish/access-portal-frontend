import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";

import Dashboard from './Dashboard';
import StageOne from './StageOne';
import StageTwo from './StageTwo';

const Skeleton = ({ location }) => {

    const history = useHistory();

    const [page, setPage] = useState(0);
    const [formValues, setFormValues] = useState({
        username: (location && location.state && location.state.username) ? location.state.username : null,
        password: (location && location.state && location.state.password) ? location.state.password : null,
        treeReq: location.state.treeRequests,
        vol: location.state.volunteers
    });

    const [isBackButtonClicked, setIsBackButtonClicked] = useState(false);

    useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        window.addEventListener('beforeunload', onCloseEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
            window.removeEventListener('beforeunload', onCloseEvent);
        };
    }, [])

    const onBackButtonEvent = (e) => {
        e.preventDefault();
        if (!isBackButtonClicked) {
            if (window.confirm("Would you like to go back?")) {
                setIsBackButtonClicked(true);
                history.push('/');
            }
            else {
                window.history.pushState(null, null, window.location.pathname);
                setIsBackButtonClicked(false);
            }
        }
    }

    const onCloseEvent = (e) => {
        e.preventDefault();
        return e.returnValue = 'Are you sure you want to close?';
    }

    const handleFormChange = (updatedValues) => {
        setFormValues((values) => ({
            ...values,
            ...updatedValues
        }));
    };

    // determines the component to display based on flags in scheduler table
    function WhichStage() {
        if (formValues.treeReq && formValues.vol) {
            return <Dashboard
                prevUsername={formValues.username}
                prevPassword={formValues.password}
                onDone={(username, password) => {
                    setPage(page + 1)
                    handleFormChange({ username, password })
                }} />;
        } else if (formValues.treeReq) {
            return <StageTwo
                prevUsername={formValues.username}
                prevPassword={formValues.password}
                onDone={(username, password) => {
                    setPage(page + 1)
                    handleFormChange({ username, password })
                }} />;
        } else {
            return <StageOne
                prevUsername={formValues.username}
                prevPassword={formValues.password}
                onDone={(username, password) => {
                    setPage(page + 1)
                    handleFormChange({ username, password })
                }} />;
        }
    }

    return (
        <>
            {!formValues.username && <Redirect to="/" />}
            <main>
                {page === 0 &&
                    <WhichStage />}
            </main>
        </>
    );
}

export default Skeleton;
