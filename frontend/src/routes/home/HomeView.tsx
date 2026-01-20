import { createSignal } from "solid-js";
import { Garant, Lotos, Meassage, Quality, Repair } from "../../components/ui/Icons/Icons";
import { Logo } from "../../components/ui/Logo/Logo";
import styles from "./HomeView.module.css";
import { useNavigate } from "@solidjs/router";

export default function HomeView() {
    const [name, setName] = createSignal("Имя");
    const [phone, setPhone] = createSignal("Телефон");
    const [isTouchedName, setIsTouchedName] = createSignal(false);
    const [isTouchedPhone, setIsTouchedPhone] = createSignal(false);
    const [phoneError, setPhoneError] = createSignal("");

    // Форматирование номера телефона
    const formatPhoneNumber = (value: string) => {
        // Удаляем все нецифры
        const cleaned = value.replace(/\D/g, '');

        // Ограничиваем длину
        const truncated = cleaned.substring(0, 11);

        // Форматируем по маске
        if (truncated.length === 0) return '';
        if (truncated.length <= 1) return `+${truncated}`;
        if (truncated.length <= 4) return `+${truncated.slice(0, 1)} (${truncated.slice(1)}`;
        if (truncated.length <= 7) return `+${truncated.slice(0, 1)} (${truncated.slice(1, 4)}) ${truncated.slice(4)}`;
        if (truncated.length <= 9) return `+${truncated.slice(0, 1)} (${truncated.slice(1, 4)}) ${truncated.slice(4, 7)}-${truncated.slice(7)}`;
        return `+${truncated.slice(0, 1)} (${truncated.slice(1, 4)}) ${truncated.slice(4, 7)}-${truncated.slice(7, 9)}-${truncated.slice(9)}`;
    };

    // Валидация номера телефона
    const validatePhone = (value: string) => {
        const cleaned = value.replace(/\D/g, '');


        if (cleaned.length === 0) {
            return "";
        }

        if (cleaned.length < 11) {
            return "";
        }

        if (!/^[78]/.test(cleaned)) {
            return "";
        }

        return "";
    };

    const handlePhoneChange = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
        const formatted = formatPhoneNumber(target.value);
        setPhone(formatted);

        const error = validatePhone(formatted);
        setPhoneError(error);
        setIsTouchedPhone(true);
    };

    const handlePhoneBlur = () => {
        const error = validatePhone(phone());
        setPhoneError(error);
        setIsTouchedPhone(true);
    };

    const handlePhoneFocus = () => {
        if (!isTouchedPhone()) {
            setPhone("");
        }
        setIsTouchedPhone(true);
    };

    const sendToTelegram = async () => {
        // Валидация перед отправкой
        const nameValue = name();
        const phoneValue = phone();

        if (nameValue === "Имя" || nameValue.trim() === "") {
            setIsTouchedName(true);
            return;
        }

        const phoneErrorMsg = validatePhone(phoneValue);
        if (phoneErrorMsg) {
            alert(phoneErrorMsg);
            setIsTouchedPhone(true);
            return;
        }

        // Форматируем номер для отправки (только цифры)
        const cleanedPhone = phoneValue.replace(/\D/g, '');
        const formattedPhone = cleanedPhone.startsWith('7') || cleanedPhone.startsWith('8')
            ? `+7 ${cleanedPhone.slice(1, 4)} ${cleanedPhone.slice(4, 7)}-${cleanedPhone.slice(7, 9)}-${cleanedPhone.slice(9)}`
            : phoneValue;

        const message = `📝 Новая заявка!\n\n👤 Имя: ${nameValue}\n📱 Телефон: ${formattedPhone}\n\n🌐 Сайт: ${window.location.hostname}`;

        const botToken = '8279991614:AAGTIKHXW9iU-gCN4aMMfuPKo1v-RoIGleA';
        const chatId = '713402416'; // Убрал точку с запятой

        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            const data = await response.json();
            console.log('Telegram ответ:', data);

            if (data.ok) {
                alert('✅ Заявка отправлена! Мы свяжемся с вами в течение 15 минут.');
                // Сброс формы
                setName("Имя");
                setPhone("Телефон");
                setIsTouchedName(false);
                setIsTouchedPhone(false);
                setPhoneError("");
            } else {
                alert(`❌ Ошибка отправки: ${data.description || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('❌ Ошибка сети. Проверьте подключение к интернету.');
        }
    };

    const scrollToBidForm = () => {
        const bidForm = document.getElementById('bid-form');
        if (bidForm) {
            bidForm.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const scrollToRateForm = () => {
        const bidForm = document.getElementById('rate-form');
        if (bidForm) {
            bidForm.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const scrollToAboutForm = () => {
        const bidForm = document.getElementById('about-form');
        if (bidForm) {
            bidForm.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const scrollToExampleForm = () => {
        const bidForm = document.getElementById('example-form');
        if (bidForm) {
            bidForm.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Обработчик для кнопки "Заказать" в about секции
    const handleAboutButtonClick = () => {
        scrollToBidForm();
    };
    const navigate = useNavigate();

    const clickPrivate = () => {
        navigate("/private");
    }

    return (
        <div style={{ width: '100%' }}>
            <button
                class={styles.floatingMessage}
                onClick={scrollToBidForm}
            >
                <Meassage />
            </button>
            <div class={styles.pageFrame}>
                <div class={styles.pageHeader}>
                    <div class={styles.logoFrame}>
                        <Logo />
                    </div>
                    <div class={styles.navigateFrame}>
                        <button
                            class={styles.navigateText}
                            onClick={scrollToRateForm}
                        >
                            Услуги и тарифы
                        </button>
                        <button
                            class={styles.navigateText}
                            onClick={scrollToAboutForm}
                        >
                            О нас
                        </button>
                        <button
                            class={styles.navigateText}
                            onClick={scrollToExampleForm}
                        >
                            Наши работы
                        </button>
                    </div>
                    <div class={styles.contactFrame}>
                        <span class={styles.contactText}>
                            +7(920)100-24-83
                            <br />
                            Пн.-Вс. 9:00-20:00
                        </span>
                    </div>
                </div>
                <div class={styles.mainFrame}>
                    <div class={styles.mainContentFrame}>
                        <span class={styles.mainContentFrameHeaderText}>
                            Установка кондиционера в Рыбинске "под ключ".
                        </span>
                        <span class={styles.mainContentFrameText}>
                            Монтаж любой сложности. Оперативный выезд. Гарантия 1 год.
                        </span>
                        <button
                            class={styles.buttonMainContent}
                            onClick={scrollToBidForm}
                        >
                            <span class={styles.buttonMainContentText}>
                                Заказать
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div id="about-form" class={styles.pageAbout}>
                <div class={styles.aboutHeaderFrame}>
                    <span class={styles.aboutHeaderFrameText}>
                        Мы создаем ваш идеальный климат. Уже 10 лет.
                    </span>
                </div>
                <div class={styles.aboutDescribeFrame}>
                    <span class={styles.aboutDescribeFrameText}>
                        Установка кондиционера — это не разовая услуга,
                        а создание системы комфорта на годы вперед.
                        Поэтому для нас важна каждая деталь: от честной консультации
                        без навязывания лишнего до безупречного монтажа, после которого
                        останется только чистота и комфорт.
                    </span>
                </div>
                <div class={styles.aboutMainFrame}>
                    <div class={styles.aboutMainContent}>
                        <div class={styles.aboutMainContentLayoutIcon}>
                            <Quality />
                        </div>
                        <div class={styles.aboutMainContentLayoutHeader}>
                            <span class={styles.aboutMainContentLayoutHeaderText}>
                                Качество
                            </span>
                        </div>
                        <div class={styles.aboutMainContentLayoutBody}>
                            <span class={styles.aboutMainContentLayoutBodyText}>
                                Рассчитаем мощность точно под ваши метры
                            </span>
                        </div>
                    </div>
                    <div class={styles.aboutMainContent}>
                        <div class={styles.aboutMainContentLayoutIcon}>
                            <Repair />
                        </div>
                        <div class={styles.aboutMainContentLayoutHeader}>
                            <span class={styles.aboutMainContentLayoutHeaderText}>
                                Профессионализм
                            </span>
                        </div>
                        <div class={styles.aboutMainContentLayoutBody}>
                            <span class={styles.aboutMainContentLayoutBodyText}>
                                Устанавливаем так, чтобы техника работала, а не напоминала о себе.
                            </span>
                        </div>
                    </div>
                    <div class={styles.aboutMainContent}>
                        <div class={styles.aboutMainContentLayoutIcon}>
                            <Lotos />
                        </div>
                        <div class={styles.aboutMainContentLayoutHeader}>
                            <span class={styles.aboutMainContentLayoutHeaderText}>
                                Чистота и порядок
                            </span>
                        </div>
                        <div class={styles.aboutMainContentLayoutBody}>
                            <span class={styles.aboutMainContentLayoutBodyText}>
                                Сверление отверстий без пыли и грязи.
                            </span>
                        </div>
                    </div>
                    <div class={styles.aboutMainContent}>
                        <div class={styles.aboutMainContentLayoutIcon}>
                            <Garant />
                        </div>
                        <div class={styles.aboutMainContentLayoutHeader}>
                            <span class={styles.aboutMainContentLayoutHeaderText}>
                                Гарантия
                            </span>
                        </div>
                        <div class={styles.aboutMainContentLayoutBody}>
                            <span class={styles.aboutMainContentLayoutBodyText}>
                                Гарантия на кондиционеры 3 года, на монтажные работы 12 месяцев.
                            </span>
                        </div>
                    </div>
                </div>
                <div class={styles.aboutButtonFrame}>
                    <button
                        class={styles.aboutButtonLayout}
                        onClick={handleAboutButtonClick}
                    >
                        <span class={styles.aboutButtonLayoutText}>
                            Заказать
                        </span>
                    </button>
                </div>
            </div>
            <div id="rate-form" class={styles.ratePage}>
                <div class={styles.rateHeader}>
                    <span class={styles.rateHeaderText}>Услуги и тарифы</span>
                </div>
                <div class={styles.rateBody}>
                    <div class={styles.rateBodyContent}>
                        <div class={styles.rateBodyContentHeader}>
                            <span class={styles.rateBodyContentHeaderText}>
                                Стандартный монтаж
                            </span>
                        </div>
                        <div class={styles.rateBodyContentLayout}>
                            <div class={styles.rateBodyContentLayoutImg}>
                            </div>
                        </div>
                        <div class={styles.rateBodyContentLayoutPrice}>
                            <div class={styles.rateBodyContentLayoutPriceNow}>
                                <span class={styles.rateBodyContentLayoutPriceNowText}>
                                    от 15000 р.
                                </span>
                            </div>
                            <div class={styles.rateBodyContentLayoutPriceBefore}>
                                <span class={styles.rateBodyContentLayoutPriceBeforeText}>20000 р.</span>
                            </div>
                        </div>
                        <div class={styles.rateBodyContentLayoutButtonFrame}>
                            <button
                                class={styles.rateBodyContentLayoutButton}
                                onClick={scrollToBidForm}
                            >
                                <span class={styles.rateBodyContentLayoutButtonText}>Заказать установку</span>
                            </button>
                        </div>
                    </div>
                    <div class={styles.rateBodyContent}>
                        <div class={styles.rateBodyContentHeader}>
                            <span class={styles.rateBodyContentHeaderText}>
                                Обслуживание
                            </span>
                        </div>
                        <div class={styles.rateBodyContentLayout}>
                            <div class={styles.rateBodyContentLayoutImg2}>
                            </div>
                        </div>
                        <div class={styles.rateBodyContentLayoutPrice}>
                            <div class={styles.rateBodyContentLayoutPriceNow}>
                                <span class={styles.rateBodyContentLayoutPriceNowText}>
                                    от 5000 р.
                                </span>
                            </div>
                            <div class={styles.rateBodyContentLayoutPriceBefore}>
                                <span class={styles.rateBodyContentLayoutPriceBeforeText}>8000 р.</span>
                            </div>
                        </div>
                        <div class={styles.rateBodyContentLayoutButtonFrame}>
                            <button
                                class={styles.rateBodyContentLayoutButton}
                                onClick={scrollToBidForm}
                            >
                                <span class={styles.rateBodyContentLayoutButtonText}>Заказать обслуживание</span>
                            </button>
                        </div>
                    </div>
                    <div class={styles.rateBodyContent}>
                        <div class={styles.rateBodyContentHeader}>
                            <span class={styles.rateBodyContentHeaderText}>
                                Ремонт
                            </span>
                        </div>
                        <div class={styles.rateBodyContentLayout}>
                            <div class={styles.rateBodyContentLayoutImg3}>
                            </div>
                        </div>
                        <div class={styles.rateBodyContentLayoutPrice}>
                            <div class={styles.rateBodyContentLayoutPriceNow}>
                                <span class={styles.rateBodyContentLayoutPriceNowText}>
                                    от 3000 р.
                                </span>
                            </div>
                            <div class={styles.rateBodyContentLayoutPriceBefore}>
                                <span class={styles.rateBodyContentLayoutPriceBeforeText}>5000 р.</span>
                            </div>
                        </div>
                        <div class={styles.rateBodyContentLayoutButtonFrame}>
                            <button
                                class={styles.rateBodyContentLayoutButton}
                                onClick={scrollToBidForm}
                            >
                                <span class={styles.rateBodyContentLayoutButtonText}>Заказать ремонт</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="example-form" class={styles.examplePage}>
                <div class={styles.exampleHeader}>
                    <span class={styles.exampleHeaderText}>Примеры выполненных работ</span>
                </div>
                <div class={styles.exampleContent}>
                    <div class={styles.exampleItem}>
                        <img src="/images/example1.jpg" alt="Пример 1" class={styles.exampleImage} />
                    </div>
                    <div class={styles.exampleItem}>
                        <img src="/images/example2.jpg" alt="Пример 1" class={styles.exampleImage} />
                    </div>
                    <div class={styles.exampleItem}>
                        <img src="/images/example3.jpg" alt="Пример 1" class={styles.exampleImage} />
                    </div>
                    <div class={styles.exampleItem}>
                        <img src="/images/example4.jpg" alt="Пример 1" class={styles.exampleImage} />
                    </div>
                    <div class={styles.exampleItem}>
                        <img src="/images/example5.jpg" alt="Пример 1" class={styles.exampleImage} />
                    </div>
                    <div class={styles.exampleItem}>
                        <img src="/images/example6.jpg" alt="Пример 1" class={styles.exampleImage} />
                    </div>
                    <div class={styles.exampleItem}>
                        <img src="/images/example7.jpg" alt="Пример 1" class={styles.exampleImage} />
                    </div>
                    <div class={styles.exampleItem}>
                        <img src="/images/example8.jpg" alt="Пример 1" class={styles.exampleImage} />
                    </div>
                    <div class={styles.exampleItem}>
                        <video controls class={styles.exampleVideo}>
                            <source src="/images/video1.mp4" type="video/mp4" />
                            Ваш браузер не поддерживает видео
                        </video>
                    </div>
                    <div class={styles.exampleItem}>
                        <video controls class={styles.exampleVideo}>
                            <source src="/images/video2.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div class={styles.exampleItem}>
                        <video controls class={styles.exampleVideo}>
                            <source src="/images/video3.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
            <div id="bid-form" class={styles.bidPage}>
                <div class={styles.bidHeader}>
                    <span class={styles.bidHeaderText}>
                        Оставьте заявку на установку кондиционера
                    </span>
                </div>
                <div class={styles.bidDescribe}>
                    <span class={styles.bidDescribeText}>
                        Мы свяжемся с вами и предложим удобное время
                    </span>
                </div>
                <div class={styles.bidContent}>
                    <div class={styles.bidContentInput}>
                        <input
                            type="text"
                            class={styles.inputField}
                            classList={{
                                [styles.filled]: isTouchedName(),
                                [styles.error]: isTouchedName() && (name() === "Имя" || name().trim() === "")
                            }}
                            value={name()}
                            onInput={(e) => {
                                setName(e.currentTarget.value);
                                setIsTouchedName(true);
                            }}
                            onFocus={() => {
                                if (!isTouchedName() || name() === "Имя") {
                                    setName("");
                                }
                                setIsTouchedName(true);
                            }}
                            onBlur={() => {
                                if (name().trim() === "") {
                                    setName("Имя");
                                    setIsTouchedName(false);
                                }
                            }}
                        />
                        {isTouchedName() && (name() === "Имя" || name().trim() === "") && (
                            <div class={styles.errorMessage}></div>
                        )}
                    </div>
                    <div class={styles.bidContentInput}>
                        <input
                            type="tel"
                            class={styles.inputField}
                            classList={{
                                [styles.filled]: isTouchedPhone(),
                                [styles.error]: !!phoneError() && isTouchedPhone()
                            }}
                            value={phone()}
                            onInput={handlePhoneChange}
                            onFocus={handlePhoneFocus}
                            onBlur={handlePhoneBlur}
                            placeholder="+7 (___) ___-__-__"
                            maxLength="18"
                        />
                        {phoneError() && isTouchedPhone() && (
                            <div class={styles.errorMessage}>{phoneError()}</div>
                        )}
                    </div>
                    <div class={styles.bidContentButtonFrame}>
                        <button
                            class={styles.bidContentButton}
                            onClick={sendToTelegram}
                            disabled={!!phoneError() || name() === "Имя" || name().trim() === ""}
                        >
                            <span class={styles.bidContentButtonText}>
                                Отправить заявку
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class={styles.privatePage}>
                <div class={styles.privateHeader}>
                    <span class={styles.bidContentButtonText}>
                        +7(920)100-24-83
                    </span>
                </div>
                <div class={styles.privateBody}>
                    <span class={styles.privateText}>
                    </span>
                    <span class={styles.privateText}>
                    </span>
                </div>

                <button
                    onClick={clickPrivate}
                >
                    <span class={styles.privateText}>Политика конфиденциальности</span>
                </button>
            </div>
        </div >
    );
}