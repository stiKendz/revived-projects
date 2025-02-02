import '../styles/styles.css'
import logoImage from '../images/logo.png'

export default function HeaderComponent() {
    function openAuthModal() {
        const authModal = document.getElementById('authModal');
        authModal.style.display = 'block';
    }
    return (
        <>
            <div className='header-div'>
                <div className="container">
                    <div className="logo">
                        <img src={logoImage} alt="Логотип" />
                    </div>
                    <nav className="main-nav">
                        <ul>
                            <li><button type="button" className="about-us-button in-nav">О нас</button></li>
                            <li><button type="button" className="services-button in-nav">Услуги</button></li>
                            <li id="nav-catalog"><button type="button" className="catalogue-button in-nav">Каталог</button></li>
                            <li><button type="button" className="contact-button in-nav">Контакты</button></li>
                            <li><button type="button" className="login-button in-nav" onClick={ openAuthModal }>Вход</button></li>
                            <li id="userProfile" style={{display:'none'}}>
                                <button type="button" className="profile-button in-nav">Профиль</button>
                            </li>
                        </ul>
                    </nav>
                    <div className="social-links">
                        <button type="button" className="facebook-button in-nav"><img src="../images/facebook.png" alt="Facebook"/></button>
                        <button type="button" className="instagram-button in-nav"><img src="../images/instagram.png" alt="Instagram"/></button>
                        <button type="button" className="twitter-button in-nav"><img src="../images/twitter.png" alt="Twitter"/></button>
                    </div>
                </div>
            </div>
        </>
    )
}

// export default HeaderComponent