import React, { useState, createContext, useContext } from "react";
import { UserProfilesContext } from "./UserProfilesProvider";
import "firebase/auth";

export const CampaignsContext = createContext();

export const CampaignsProvider = (props) => {

    const [campaigns, setCampaigns] = useState([]);

    const { getToken } = useContext(UserProfilesContext);

    const apiUrl = "/api/campaigns";

    const getAllCampaigns = () => {
        return getToken()
            .then(token => fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
            );
    };




    return (
        <CampaignsContext.Provider value={{ campaigns, getAllCampaigns, setCampaigns }}>
            {props.children}
        </CampaignsContext.Provider>
    );
};