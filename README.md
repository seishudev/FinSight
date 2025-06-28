<div align="center">
  <img src="https://raw.githubusercontent.com/seishudev/FinSight/main/frontend/public/favicon.png" alt="FinSight Logo" width="120" />

# FinSight финансовый трекер 💸

Интеллектуальный финансовый помощник, который делает управление бюджетом простым, интуитивно понятным и даже увлекательным.

**Проект для хакатона 22FAM.**

</div>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.5-6DB33F?style=for-the-badge&logo=spring&logoColor=white" />
  <img src="https://img.shields.io/badge/Java-21-007396?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

---

## 🚀 Live Demo

Попробовать приложение вживую можно здесь: [https://finsight.duckdns.org/](https://finsight.duckdns.org/)

---

## 🎯 О проекте

**FinSight** — это не просто трекер финансов. Это современный веб-сервис, созданный для того, чтобы вернуть вам контроль над своими деньгами с помощью технологий. Мы объединили мощный бэкенд на Spring Boot, интерактивный фронтенд на React 19 и возможности искусственного интеллекта для создания лучшего пользовательского опыта.

---

## 👥 Для кого?

- 🧑‍💻 Молодые специалисты и IT-энтузиасты, которые ценят автоматизацию и качественный UX.
- 👨‍👩‍👧‍👦 Семьи, которым нужен удобный инструмент для ведения совместного бюджета и планирования.
- 🎓 Студенты, которые хотят научиться финансовой грамотности без скучных таблиц и сложных интерфейсов.

---

## ❓ Какие проблемы решает?

- 📉 **Потеря контроля над расходами.** Наглядные дашборды, диаграммы и тренды помогают понять, куда на самом деле уходят деньги.
- ✍️ **Рутинный ввод данных.** Больше не нужно вручную вбивать каждую покупку. Наш сканер чеков сделает это за вас.
- 🎯 **Отсутствие финансовой мотивации.** Система бюджетов и целей помогает не просто отслеживать траты, а копить на то, что действительно важно.

---

## ✨ Киллер-фичи

Мы проанализировали существующие решения и добавили функции, которые делают **FinSight** уникальным:

- 📸 **Интеллектуальный сканер чеков (OCR + AI)**

  - Просто сфотографируйте чек или загрузите его из галереи.
  - Бэкенд на Java с библиотекой Tesseract OCR распознает данные.
  - Spring AI анализирует позиции и автоматически предлагает релевантную категорию, сумму и дату, сводя ручной ввод к нулю.

- 🤖 **AI-помощник для персональных советов**

  - Интеграция с OpenAI позволяет анализировать ваши финансовые привычки.
  - Получайте умные подсказки: «Вы близки к превышению бюджета на рестораны» или «Отличная работа! Вы достигли 75% своей цели 'Новый ноутбук'».

- 📱 **Современный и безупречно отзывчивый интерфейс**
  - Создан на React 19 с использованием Vite для максимальной производительности.
  - Компоненты shadcn/ui и стилизация на Tailwind CSS обеспечивают идеальный внешний вид и адаптивность на любых устройствах.
  - Плавные анимации и продуманный UX делают использование приложения по-настоящему приятным.

---

## 🛠️ Стек технологий

| Категория    | Технологии                                                                                                                                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend**  | Java 21 & Spring Boot 3.5 <br> Spring Security, Spring Data JPA <br> Spring AI (OpenAI Integration) <br> PostgreSQL & Flyway <br> JJWT (JSON Web Tokens) <br> Tesseract OCR (для сканера чеков) <br> MapStruct, Lombok |
| **Frontend** | React 19 & React DOM 19 <br> Vite <br> TypeScript <br> MobX & MobX-Utils (State Management) <br> Tailwind CSS & shadcn/ui <br> React Router <br> Highcharts (для графиков) <br> Zod & React Hook Form                  |
| **DevOps**   | Docker & Docker Compose <br> Nginx                                                                                                                                                                                     |

---

## 🚀 Запуск проекта

Мы сделали процесс развертывания максимально простым. Убедитесь, что у вас установлены `git` и `Docker`.

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/seishudev/FinSight
   ```
2. Перейдите в директорию проекта:
   ```bash
   cd FinSight
   ```
3. Запустите Docker Compose для сборки и поднятия всех сервисов:
   ```bash
   sudo docker compose up -d --build
   ```

После успешного выполнения команд фронтенд будет доступен по адресу: [http://localhost:5173](http://localhost:5173), а API бэкенда — [http://localhost:8080](http://localhost:8080).
