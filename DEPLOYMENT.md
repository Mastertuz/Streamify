# Streamify - MERN Stack Application

## Развертывание (Deployment)

# Streamify - MERN Stack Application

## Развертывание (Deployment)

### Railway (рекомендуется)

1. **Подготовка к развертыванию:**
   - Убедитесь, что все изменения зафиксированы в git
   - Проверьте, что `npm run build` выполняется без ошибок локально

2. **Развертывание на Railway:**
   - Создайте аккаунт на [Railway](https://railway.app)
   - Нажмите "New Project" → "Deploy from GitHub repo"
   - Выберите ваш репозиторий Streamify
   - Railway автоматически обнаружит Node.js проект

3. **Переменные окружения в Railway:**
   В разделе Variables добавьте:
   ```
   PORT=5001
   MONGO_URI=ваша_mongodb_строка_подключения
   STREAM_API_KEY=ваш_stream_api_key
   STREAM_API_SECRET=ваш_stream_api_secret
   JWT_SECRET_KEY=ваш_jwt_secret_key
   NODE_ENV=production
   ```

4. **Автоматическая настройка:**
   - Railway использует `nixpacks.toml` для настройки сборки
   - Команда сборки: `npm run build`
   - Команда запуска: `npm start`

### Vercel (только для Frontend)

Если хотите развернуть frontend отдельно:

1. **Root Directory:** `frontend`
2. **Build Command:** `npm run build`
3. **Output Directory:** `dist`
4. **Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

### Локальная разработка

1. Установка зависимостей:
   ```bash
   npm install
   ```

2. Настройка переменных окружения:
   - Скопируйте `backend/.env.example` в `backend/.env`
   - Скопируйте `frontend/.env.example` в `frontend/.env`
   - Заполните необходимые значения

3. Запуск в development режиме:
   ```bash
   # Backend
   cd backend && npm run dev
   
   # Frontend (в новом терминале)
   cd frontend && npm run dev
   ```

4. Сборка для production:
   ```bash
   npm run build
   npm start
   ```
