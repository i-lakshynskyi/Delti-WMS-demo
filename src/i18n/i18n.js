import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';


const savedLng = localStorage.getItem('i18nextLng') || 'en';

// 🛠 Конфигурация
i18n
    // 🔁 Сначала проверит localStorage (если есть актуальный перевод — возьмёт оттуда)
    .use(LocalStorageBackend)
    // 🌐 Потом загрузит по HTTP, если в localStorage нет или устарел
    .use(HttpBackend)
    // 🎯 Подключение к React
    .use(initReactI18next)
    .init({
        lng: savedLng,
        fallbackLng: 'en', // язык по умолчанию
        supportedLngs: ['en', 'de', 'fr', 'ro'], // список поддерживаемых языков

        // 🧠 Название пространства по умолчанию
        defaultNS: 'common',
        ns: ['common'], // начальный набор namespace (остальные будут загружаться lazy)

        // 📂 Путь к переводам: public/locales/{lng}/{ns}.json
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },

        // 💾 Настройки localStorage backend
        localStorageBackend: {
            expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 дней в мс
        },

        // 🚀 Подгружаем namespace по мере необходимости
        partialBundledLanguages: true,

        // 💬 Убираем лишние консольные ошибки
        debug: false,

        // ⏳ Suspense работает, пока переводы грузятся
        react: {
            useSuspense: true,
        },

        // ⚙️ Стандарты обработки
        interpolation: {
            escapeValue: false, // React уже экранирует HTML
        },
    }).then();

export default i18n;
