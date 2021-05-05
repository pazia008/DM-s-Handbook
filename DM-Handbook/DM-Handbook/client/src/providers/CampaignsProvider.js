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


    const getCampaignById = (campaignId) => {
        return getToken()
            .then(token => fetch(`${apiUrl}/${campaignId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then(res => res.json())
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



    const deleteCampaign = campaign => {
        return getToken()
            .then(token => fetch(`${apiUrl}/${campaign.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then(getAllCampaigns)

    };



    const updateCampaign = (campaign) => {
        return getToken()
            .then(token => fetch(`${apiUrl}/${campaign.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(campaign),
            }))
    };



    return (
        <CampaignsContext.Provider value={{ campaigns, getAllCampaigns, setCampaigns, saveCampaign, deleteCampaign, updateCampaign, getCampaignById }}>
            {props.children}
        </CampaignsContext.Provider>
    );
};