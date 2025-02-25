# TyperMaster Frontend

Aplicación web desarrollada con Vue.js para practicar y mejorar la velocidad de escritura. Permite a los usuarios practicar con textos aleatorios, ver sus resultados en tiempo real y mantener un registro de su progreso.

## 🔗 Enlaces Relacionados

- [Backend TyperMaster](https://github.com/jhobahego/backend-typermaster)

## 🚀 Características

- Interfaz intuitiva para practicar mecanografía
- Medición en tiempo real de:
  - Palabras por minuto (WPM)
  - Precisión
  - Precisión real (incluyendo correcciones)
- Historial de resultados
- Diseño responsive
- Temas claro/oscuro
- Textos aleatorios para práctica

## 🛠️ Requisitos Previos

- Node.js (versión 16 o superior)
- npm o pnpm

## ⚙️ Configuración

1. Clona el repositorio
```bash
git clone https://github.com/jhobahego/frontend-typermaster.git
cd frontend-typermaster
```

2. Instala las dependencias
```bash
npm install
# o
pnpm install
```

3. Configura las variables de entorno
Crea un archivo `.env` basado en `.env.example`:
```env
VITE_API_URL=http://localhost:8000
```

## 🚀 Ejecución

Para desarrollo:
```bash
npm run dev
# o
pnpm dev
```

Para producción:
```bash
npm run build
npm run preview
# o
pnpm build
pnpm preview
```

La aplicación estará disponible en `http://localhost:5173` por defecto.

## 🎨 Tecnologías Utilizadas

- Vue.js 3
- Pinia (manejo de estado)
- Vue Router
- Axios
- TypeScript
- Tailwind CSS
- Vite

## 📱 Capturas de Pantalla

[Aquí puedes incluir algunas capturas de pantalla de tu aplicación]

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

1. Haz fork del proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

[MIT](https://choosealicense.com/licenses/mit/)
