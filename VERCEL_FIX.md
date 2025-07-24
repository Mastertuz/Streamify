# 🚀 Инструкции по развертыванию Streamify

## Проблема: 404 ошибка на авторизацию

Ошибка возникает потому, что:
1. Vercel не знает как обрабатывать React Router routes
2. Backend API не настроен для Vercel

## ✅ Рекомендуемое решение: Раздельное развертывание

### 1. Backend на Railway

1. **Создайте новый проект на Railway:**
   - Перейдите на [railway.app](https://railway.app)
   - Нажмите "New Project" → "Deploy from GitHub repo"
   - Выберите репозиторий Streamify
   - Railway автоматически обнаружит Node.js проект

2. **Настройте переменные окружения в Railway:**
   ```
   PORT=5001
   MONGO_URI=mongodb+srv://futureprogrammer2301:GqKD3AzJ8XVHT7lY@cluster0.gnnrklg.mongodb.net/nexo_db?retryWrites=true&w=majority&appName=Cluster0
   STREAM_API_KEY=upqpb5cgk73f
   STREAM_API_SECRET=zkksqadqqnyvwacspcewyybsmbfayp9wf9awz3a9ury7kqbkqrs666v2ndmategz
   JWT_SECRET_KEY=PeahSMFnMtW+LhKVr16HXj3J1qtSvuGiniTn0W/N2B4=
   NODE_ENV=production
   ```

3. **Получите URL backend сервера** (например: `https://streamify-backend-production.up.railway.app`)

### 2. Frontend на Vercel

1. **Настройте переменные окружения в Vercel:**
   - Перейдите в настройки проекта на Vercel
   - Добавьте переменную окружения:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

2. **Перезапустите deployment** в Vercel

### 3. Обновите CORS в backend

После получения URL Vercel приложения, обновите CORS в `backend/src/server.ts`:

```typescript
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "http://127.0.0.1:5173",
        "https://streamify-beige.vercel.app", // Ваш Vercel URL
        "https://your-custom-domain.com" // Если есть кастомный домен
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}))
```

## 🔧 Что исправлено в коде:

1. ✅ Добавлен `export default app` в `backend/src/server.ts`
2. ✅ Обновлена конфигурация `vercel.json` для SPA
3. ✅ Добавлены rewrites для React Router
4. ✅ Улучшена конфигурация axios с логированием
5. ✅ Создан `.env.production` для frontend

## 📝 Проверочный список:

- [ ] Backend развернут на Railway
- [ ] Переменные окружения настроены в Railway
- [ ] Получен URL backend сервера
- [ ] URL добавлен в VITE_API_URL на Vercel
- [ ] CORS обновлен с URL Vercel приложения
- [ ] Перезапущен deployment на Vercel

После выполнения всех шагов авторизация должна работать корректно! 🎯
