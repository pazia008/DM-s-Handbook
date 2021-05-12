import React from "react";
import { Row, Button } from "reactstrap";
import dFour from "./pleswork.png";
import dSix from "./colored6.png";
import dEight from "./colored8.png";
import dTen from "./colored10.svg";
import dTwelve from "./download.png";
import dTwenty from "./attemptd20.png";
import "./Hello.css";

export default function Hello() {
    let currentUser = JSON.parse(sessionStorage.getItem("userProfile"));


    return (
        <>
            <div style={{
                position: "fixed",
                left: 0,
                right: 0,
                top: "50%",
                marginTop: "-0.5rem",
                textAlign: "center",
            }}>
                <div>May the dice roll forever in your favor!</div>

                <div className="flexRow">
                    <img src={dFour} className="dFour" />
                    <img src={dSix} className="dSix" />
                    <img src={dEight} className="dEight" />
                    <img src={dTen} className="dTen" />
                    <img src={dTwelve} className="dTwelve" />
                    <img src={dTwenty} className="dTwenty" />
                </div>

            </div>


        </>

    );
}