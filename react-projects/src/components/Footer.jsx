import '../styles/styles.css'

export default function FooterComponent() {
    return (
        <>
            <div className='footer-div'>
                <div id="contact" className="footer-container">
                    <div className="footer-info">
                        <h2>Свадебная Копилка</h2>
                        <p>Помогаем молодым делать важные покупки с WeddingBox.</p>
                        <p>&copy; 2024. Все права защищены.</p>
                    </div>
                    <div className="footer-links">
                        <h3>Полезные ссылки</h3>
                        <ul>
                            <li><button type="button" className="about-us-button in-nav">О нас</button></li>
                            <li><button type="button" className="services-button in-nav">Услуги</button></li>
                            <li id="nav-catalog"><button type="button" className="catalogue-button in-nav">Каталог</button></li>
                            <li><button type="button" className="contact-button in-nav">Контакты</button></li>
                        </ul>
                    </div>
                    <div className="footer-social">
                        <h3>Следите за нами</h3>
                        <div className="social-links">
                            <button type="button" className="facebook-button in-nav"><img src="facebook.png" alt="Facebook"/></button>
                            <button type="button" className="instagram-button in-nav"><img src="instagram.png" alt="Instagram"/></button>
                            <button type="button" className="twitter-button in-nav"><img src="twitter.png" alt="Twitter"/></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}