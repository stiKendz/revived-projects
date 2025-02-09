import React from "react";
import CardsComponent from "./Cards";
import ProfileComponent from "./Profile";

function NoCards(props) {
    <CardsComponent /> // передаю что бы захватить card-container

    let cardsContainer = document.querySelector('.card-container')
    return cardsContainer = <p>Нет доступных карточек</p>
}

export default function checkAuthorizeComponent(props) {
    let token = localStorage.getItem('token');
    token = props.token;

    if (token) {
        return <CardsComponent />
    } else {
        return <NoCards />
    }
} 



