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

    console.log(formValues);

    function WhichStage(props) {
        const thedate = new Date();
        // console.log(thedate);
        const themonth = thedate.getMonth(); // Jan is 0, Feb is 1, ..., Dec is 11

        if (themonth === 6 || themonth === 7 || themonth === 8 || themonth === 9 || themonth === 10) { // stage 1 is July - November
            return <StageTwo
                prevUsername={formValues.username}
                prevPassword={formValues.password}
                onDone={(username, password) => {
                    setPage(page + 1)
                    handleFormChange({ username, password })
                }} />;
        } else if (themonth === 11 || themonth === 0) { // stage 2 is December - January; add themonth == 11 in mid Dec
            return <StageTwo
                prevUsername={formValues.username}
                prevPassword={formValues.password}
                onDone={(username, password) => {
                    setPage(page + 1)
                    handleFormChange({ username, password })
                }} />;
        } else { // stage 3 is February - June
            return <StageTwo
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
