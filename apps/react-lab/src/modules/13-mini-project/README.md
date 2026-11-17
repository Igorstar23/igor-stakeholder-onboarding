Клієнтський додаток управління Stakeholders, створений на базі React та TypeScript.

Цей додаток дозволяє користувачам керувати Stakeholders, здійснювати пошук та фільтрувати записи, а також обробляти стани завантаження, помилок, порожніх полів та перевірки правильності даних.

# Fetures
-Mock API: асинхронні операції зі штучною затримкою;
-Crud операції: створення, читання, оновлення та видалення записів Stakeholders;
-Валідація форми: перевірка вводу у форму та заповненості важливих полів;
-Обробка помилок пов'язаних з Mock API та CRUD операціями, можливість повторного виконання запиту;
-Обробка станів loading/empty state;
-Пошук Stakeholders за ім'ям та/або назвою організації;
-Фільтрація списку Stakeholders за role та/або influence;
-Пошук та Фільтрація: можливість одночасного пошуку та фільтрації записів Stakeholders;

# File structure
13-mini-project/
├── api/stakeholderApi.ts
├── components/StakeholderForm.tsx
├── components/StakeholderList.tsx
├── components/Toolbar.tsx
├── MiniProjectPage.tsx
├── README.md
└── types.ts

-api/ — містить логіку взаємодії з Mock API.
-stakeholderApi.ts — реалізація класу StakeholderAPI зі статичними методами для виконання CRUD-операцій
-components/ — містить компоненти інтерфейсу користувача.
-StakeholderForm.tsx — форма створення та редагування Stakeholders. Відповідає за введення даних, валідацію полів, відображення помилок та скасування змін.
-StakeholderList.tsx — відображення списку Stakeholders. Забезпечує доступ до операцій редагування та видалення записів, а також відображає порожній стан списку.
-Toolbar.tsx — панель пошуку та фільтрації. Забезпечує пошук за ім'ям та організацією, а також фільтрацію за роллю та рівнем впливу.
-MiniProjectPage.tsx — головний компонент модуля, який об'єднує інші компоненти та керує станом додатка. 
-types.ts — визначення TypeScript-типів та інтерфейсів, які використовуються в модулі.
-README.md — документація модуля 

# Run/check commands
1. Перейти до директорії React-додатка: cd apps/react-lab
2. Запустити перевірку TypeScript: npm run types:check
3. Виконати production build: npm run build
4. Запустити додаток у режимі розробки: npm run dev

# Manual scenarios
-Запустити TypeScript typecheck і production build;
-Перевірити CRUD-операції;
-Перевірити пошук/фільтрацію та їх одночасне використання;
-Перевірити стани loading/error/empty/validation;