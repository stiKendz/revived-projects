import React from "react";
import CardsComponent from "./Cards";
import ProfileComponent from "./Profile";

function NoCards() {
    <CardsComponent /> // передаю что бы захватить card-container

    let cardsContainer = document.querySelector('.card-container')
    return cardsContainer = <p>Нет доступных карточек</p> // ?? - рендерю в не отображаемый компонент ??
}

export default function checkAuthorizeComponent(props) {
    let token = localStorage.getItem('token');
    token = props.token;

    if (token) {
        return [
            <ProfileComponent />,
            <CardsComponent />
        ]
    } else {
        return <NoCards />
    }
} 



