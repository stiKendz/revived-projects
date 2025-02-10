import React, { useState } from 'react';
import '../styles/styles.css'

export default function CardsComponent() {
    const [cards, setCards] = useState([]);

    async function addCard() {
        const card_name = document.getElementById('cardTitle').value;
        const card_price = document.getElementById('cardPrice').value;
        const card_description = document.getElementById('cardText').value;
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:5000/addcard', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({card_name, card_price, card_description})
        });
        const data = await response.json();

        if(response.ok) {
            alert('Карточка успешно добавлена')
        } else {
            alert('Не удалось добавить карточку')
        }

        console.log(data)
    }

    async function showCards() {
        const cardsContainer = document.querySelector('.card-container')
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:5000/getcards', {
            method: 'get',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        if (data && data.card && data.cards.length > 0) {
            setCards(data.cards)
        } else {
            setCards([]);
            cardsContainer.innerHTML = `<p>Нет доступных карточек</p>`
        }

        console.log(data)
    }

    const openCardModal = async () => {
        const cardsModal = document.getElementById('cards-modal');
        cardsModal.style.display = 'block';
    }
    const closeCardModal = async () => {
        const cardsModal = document.getElementById('cards-modal');
        cardsModal.style.display = 'none';
    }

    return (
        <div id="catalog" className="catalog">
            <h2>Каталог WeddingBox</h2>
            <button onClick={openCardModal} className="create-card-button">Создать карточку</button>
            <button onClick={showCards} className="show-card-button">Показать карточки</button>
            <div className="card-container">
                {cards.map((card, index) => {
                    <div key={index} className="card">
                        <h3>Навзвание: {card.card_name}</h3>
                        <p>Описание: {card.card_price}</p>
                        <p>Цена: {card.card_description}</p>
                    </div>
                })}
            </div>

            <div id="cards-modal" className="modal">
                    <div className="modal-content">
                        <span onClick={closeCardModal} className="close-button">&times;</span>
                        <h2>Создать карточку</h2>
                        <label htmlFor="cardTitle">Название товара:</label>
                        <input type="text" id="cardTitle" placeholder="Введите название товара" required />
                        <label htmlFor="cardPrice">Цена товара:</label>
                        <input type="text" id="cardPrice" placeholder="Введите цену товара" required />
                        <label htmlFor="cardImageUrl">Описание товара:</label>
                        <input type="text" id="cardText" placeholder="Введите краткое описание товара" required />
                        <label htmlFor="cardImageUrl">URL изображения:</label>
                        <input type="text" id="cardImageUrl" placeholder="Введите URL изображения" required />
                        <button onClick={addCard} id="addCardButton">Добавить карточку</button>
                    </div>
                </div>
        </div>
    );
}