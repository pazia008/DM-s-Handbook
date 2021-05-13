import React, { useState } from "react";
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

    const [number, setNumber] = useState()

    const d4 = () => {
        console.log("hello")
        setNumber(Math.floor(Math.random() * 4) + 1)

    }
    const d6 = () => {
        console.log("hello")
        setNumber(Math.floor(Math.random() * 6) + 1)

    }
    const d8 = () => {
        console.log("hello")
        setNumber(Math.floor(Math.random() * 8) + 1)

    }
    const d10 = () => {
        console.log("hello")
        setNumber(Math.floor(Math.random() * 10) + 1)

    }
    const d12 = () => {
        console.log("hello")
        setNumber(Math.floor(Math.random() * 12) + 1)

    }
    const d20 = () => {
        console.log("hello")
        setNumber(Math.floor(Math.random() * 20) + 1)

    }


    return (
        <>
            <div className="numberFour">{number}</div>
            <div style={{
                position: "fixed",
                left: 0,
                right: 0,
                top: "50%",
                marginTop: "-0.5rem",
                textAlign: "center",
            }}>


                <div className="text">May the dice roll forever in your favor!</div>

                <div className="flexRow">
                    <div className="flexColumn">
                        <img src={dFour} className="dFour" />
                        <div className="flexButtons">
                            <Button onClick={d4}>Roll a d4</Button>
                        </div>
                    </div>
                    <div className="flexColumn">
                        <img src={dSix} className="dSix" />
                        <div className="flexButtons">
                            <Button onClick={d6}>Roll a d6</Button>
                        </div>
                    </div>
                    <div className="flexColumn">
                        <img src={dEight} className="dEight" />
                        <div className="flexButtons">
                            <Button onClick={d8}>Roll a d8</Button>
                        </div>
                    </div>
                    <div className="flexColumn">
                        <img src={dTen} className="dTen" />
                        <div className="flexButtons">
                            <Button onClick={d10}>Roll a d10</Button>
                        </div>
                    </div>
                    <div className="flexColumn">
                        <img src={dTwelve} className="dTwelve" />
                        <div className="flexButtons">
                            <Button onClick={d12}>Roll a d12</Button>
                        </div>
                    </div>
                    <div className="flexColumn">
                        <img src={dTwenty} className="dTwenty" />
                        <div className="flexButtons">
                            <Button onClick={d20}>Roll a d20</Button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
}