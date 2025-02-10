import React, { useState, useEffect } from "react";
import '../styles/styles.css';

export default function ProfileComponent() {
    // // новая логика профиля
    // const [profile, setProfile] = useState({
    //     name: '',
    //     surname: '',
    //     email: '',
    //     about_user: '',
    //     phone_number: '',
    //     username: ''
    // });

    // // Загрузка данных профиля при монтировании компонента
    // useEffect(() => {
    //     const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
    //     if (savedProfile) {
    //         setProfile(savedProfile);
    //     } else {
    //         loadProfileFromServer();
    //     }
    // }, []);

    // // Загрузка данных профиля с сервера
    // const loadProfileFromServer = async () => {
    //     const token = localStorage.getItem('token');
    //     const response = await fetch('http://localhost:5000/userinfo', {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     });
    //     const data = await response.json();
    //     if (data) {
    //         setProfile(data);
    //         localStorage.setItem('userProfile', JSON.stringify(data));
    //     }
    // };

    // // Обновление данных профиля
    // const updateProfile = async () => {
    //     const token = localStorage.getItem('token');
    //     const response = await fetch('http://localhost:5000/updateuser', {
    //         method: 'PUT',
    //         headers: {
    //             'Content-type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //         body: JSON.stringify(profile)
    //     });
    //     const data = await response.json();
    //     if (data) {
    //         setProfile(data);
    //         localStorage.setItem('userProfile', JSON.stringify(data));
    //         alert('Информация обновлена');
    //     }
    // };

    // // Обработка изменений в полях ввода
    // const handleInputChange = (e) => {
    //     const { id, value } = e.target;
    //     setProfile((prevProfile) => ({
    //         ...prevProfile,
    //         [id]: value
    //     }));
    // };

    // function logoutButton() {
    //     window.localStorage.removeItem('token');
    //     window.localStorage.removeItem('email');
    //     window.localStorage.removeItem('role');

    //     window.location.reload();

    //     return alert('Вывышли из аккаунта');
    // }

    // return (
    //     <div className="container" id="profile">
    //         <h2>Профиль пользователя</h2>
    //         <p>Добро пожаловать, <span id="profileUsername">{profile.username}</span>!</p>
    //         <div className="user-name-output"></div>
    //         <input
    //             type="text"
    //             id="name"
    //             placeholder="Измените ваше имя"
    //             value={profile.name}
    //             onChange={handleInputChange}
    //         />
    //         <br />
    //         <div className="user-surname-output"></div>
    //         <input
    //             type="text"
    //             id="surname"
    //             placeholder="Измените вашу фамилию"
    //             value={profile.surname}
    //             onChange={handleInputChange}
    //         />
    //         <br />
    //         <div className="user-email-output"></div>
    //         <input
    //             type="email"
    //             id="email"
    //             placeholder="Измените вашу электронную почту"
    //             value={profile.email}
    //             onChange={handleInputChange}
    //         />
    //         <br />
    //         <div className="about-me-output"></div>
    //         <textarea
    //             id="about_user"
    //             placeholder="Измените информацию о себе"
    //             value={profile.about_user}
    //             onChange={handleInputChange}
    //         />
    //         <br />
    //         <div className="phone-number-output"></div>
    //         <input
    //             type="text"
    //             id="phone_number"
    //             placeholder="Измените свой номер телефона"
    //             value={profile.phone_number}
    //             onChange={handleInputChange}
    //         />
    //         <br />
    //         <button onClick={updateProfile} id="saveProfile">Обновить профиль</button>
    //         <button onClick={logoutButton} id="logoutButton">Выйти</button>
    //     </div>
    // );
    

    // // старая логика профиля

    function logoutButton() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('role');

        window.location.reload();

        return alert('Вывышли из аккаунта');
    }

    async function loadProfile(){
        const name = document.querySelector('.user-name-output');
        const surname = document.querySelector('.user-surname-output');
        const email = document.querySelector('.user-email-output');
        const about_user = document.querySelector('.about-me-output');
        const phone_number = document.querySelector('.phone-number-output');
        const usernameSpan = document.getElementById('profileUsername');

        const token = window.localStorage.getItem('token');

        const response = await fetch('http://localhost:5000/userinfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json();

        if(data && data.userInfo && data.userInfo.length) {
            const userInfo = data.userInfo[0];

            usernameSpan.textContent = userInfo.name ?? 'Нет данных';
    
            // Заполнение меток
            name.innerHTML = `Имя: <p>${userInfo.name || 'Нет данных'}</p>`;
            surname.innerHTML = `Фамилия: <p>${userInfo.surname || 'Нет данных'}</p>`;
            email.innerHTML = `Адрес электронной почты: <p>${userInfo.email || 'Нет данных'}</p>`;
            about_user.innerHTML = `Обо мне: <p>${userInfo.about_user || 'Нет данных'}</p>`;
            phone_number.innerHTML = `Номер телефона: <p>${userInfo.phone_number || 'Нет данных'}</p>`;
    
            // Заполнение input'ов, если они пустые
            const nameInput = document.getElementById('user-name');
            const surnameInput = document.getElementById('user-surname');
            const emailInput = document.getElementById('user-email');
            const aboutUserInput = document.getElementById('about-me');
            const phoneNumberInput = document.getElementById('phone-number');
    
            // Заполнение полей ввода
            nameInput.value = nameInput.value || userInfo.name || '';
            surnameInput.value = surnameInput.value || userInfo.surname || '';
            emailInput.value = emailInput.value || userInfo.email || '';
            aboutUserInput.value = aboutUserInput.value || userInfo.about_user || '';
            phoneNumberInput.value = phoneNumberInput.value || userInfo.phone_number || '';
        }
        console.log(data);
    }

    async function updateProfile() {
        const name = document.getElementById('user-name').value;
        const surname = document.getElementById('user-surname').value;
        const email = document.getElementById('user-email').value;
        const about_user = document.getElementById('about-me').value;
        const phone_number = document.getElementById('phone-number').value;
        const usernameSpan = document.getElementById('profileUsername');

        const token = window.localStorage.getItem('token');

        const response = await fetch('http://localhost:5000/updateuser', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name, surname, email, about_user, phone_number})
        })
        const data = await response.json();

        // обновление окна профиля
        if(data) {
            loadProfile();
            alert('Информация обновлена');
        }
        console.log(data);
    }

    return (
        <div className="container" id="profile">
            <h2>Профиль пользователя</h2>
            <p>Добро пожаловать, <span id="profileUsername"></span>!</p>
            <div className="user-name-output"></div>
            <input type="text" id="user-name" placeholder="Измените ваше имя" />
            <br></br>
            <div className="user-surname-output"></div>
            <input type="text" id="user-surname" placeholder="Измените вашу фамилию" />
            <br></br>
            <div className="user-email-output"></div>
            <input type="email" id="user-email" placeholder="Измените вашу электронную почту" />
            <br></br>
            <div className="about-me-output"></div>
            <textarea id="about-me" placeholder="Измените информацию о себе"></textarea>
            <br></br>
            <div className="phone-number-output"></div>
            <input type="text" id="phone-number" placeholder="Измените свой номер телефона" />
            <br></br>
            <button onClick={updateProfile} id="saveProfile">Обновить профиль</button>
            <button onClick={logoutButton} id="logoutButton">Выйти</button>
        </div>
    );
}