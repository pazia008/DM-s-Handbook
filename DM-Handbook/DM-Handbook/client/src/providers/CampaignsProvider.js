import React, { useState, createContext, useContext } from "react";
import { UserProfilesContext } from "./UserProfilesProvider";
import "firebase/auth";

export const CampaignsContext = createContext();

export function CampaignsProvider(props) {
    const [campaigns, setCampaigns] = useState([]);

    const { getToken } = useContext(UserProfilesContext);

    const apiUrl = "/api/campaigns";

    const getAllCampaigns = () => {
        return getToken()
            .then(token => fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then(res => res.json())
            .then(setCampaigns)
    };


    const saveCampaign = (campaign) => {
        return getToken()
            .then(token => fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(campaign),
            }))
            .then(resp => resp.json())
    };


    return (
        <CampaignsContext.Provider value={{ campaigns, getAllCampaigns, saveCampaign }}>
            {props.children}
        </CampaignsContext.Provider>
    );
};