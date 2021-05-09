import React, { useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";

export const UserProfilesContext = createContext();

export function UserProfilesProvider(props) {
    const history = useHistory();
    const apiUrl = "/api/userprofiles";
    const [users, setUsers] = useState([]);

    const userProfiles = sessionStorage.getItem("userProfile");
    const [isLoggedIn, setIsLoggedIn] = useState(userProfiles != null);

    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setIsFirebaseReady(true);
        });
    }, []);

    const login = (email, pw) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, pw)
            .then((signInResponse) => getUserProfile(signInResponse.user.uid))
            .then((userProfile) => {
                sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
                setIsLoggedIn(true);
            });
    };

    const logout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                history.push('/login');
                sessionStorage.clear();
                setIsLoggedIn(false);
            });
    };

    const register = (userProfile, password) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(userProfile.email, password)
            .then((createResponse) =>
                saveUser({ ...userProfile, firebaseId: createResponse.user.uid })
            )
            .then((savedUserProfile) => {
                sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile));
                setIsLoggedIn(true);
            });
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getUserProfile = (firebaseId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${firebaseId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((resp) => resp.json())
        );
    };

    const saveUser = (userProfile) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userProfile)
            }).then((resp) => resp.json())
        );
    };

    const getAllUsers = () => {
        return getToken()
            .then(token => fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setUsers));
    };

    const getUserById = (id) => {
        return getToken()
            .then(token => fetch(`${apiUrl}/user${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json()))
    };

    return (
        <UserProfilesContext.Provider
            value={{
                isLoggedIn,
                users,
                login,
                logout,
                register,
                getToken,
                getAllUsers,
                getUserById
            }}
        >
            {isFirebaseReady ? (
                props.children
            ) : (
                <Spinner className="app-spinner dark" />
            )}
        </UserProfilesContext.Provider>
    );
}