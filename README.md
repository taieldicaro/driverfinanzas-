# 🚗 DriverFinanzas - Guía de Deploy a GitHub Pages

## Archivo `.gitignore`

Primero, crea un archivo `.gitignore` en la raíz del proyecto:

```
node_modules/
.env
.DS_Store
dist/
build/
*.log
```

## Instrucciones para GitHub Pages

### 1️⃣ Crear un repositorio en GitHub

```bash
# En tu computadora, abre la carpeta del proyecto y ejecuta:
git init
git add .
git commit -m "Initial commit: DriverFinanzas webapp for iOS"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/driverfinanzas.git
git push -u origin main
```

### 2️⃣ Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Entra en **Settings** (Configuración)
3. Busca **Pages** en el menú de la izquierda
4. En **Source**, selecciona:
   - Branch: `main`
   - Folder: `/ (root)`
5. Haz click en **Save**

**Tu app estará disponible en:** `https://TU_USUARIO.github.io/driverfinanzas/`

---

## 📱 Cómo instalar en tu iPhone

### Opción A: Desde Safari (Recomendado)

1. Abre **Safari** en tu iPhone 17
2. Ve a: `https://TU_USUARIO.github.io/driverfinanzas/`
3. Toca el icono **Compartir** (↗️) abajo
4. Desplázate y busca **"Añadir a Pantalla de Inicio"**
5. Dale un nombre (ej: "DriverFinanzas") y toca **Añadir**

### Opción B: Desde la app dentro de la app (Built-in)

1. Una vez instalada, abre DriverFinanzas
2. Toca el botón **📱** (arriba a la derecha)
3. Sigue los pasos de la guía interactiva
4. Usa el código QR para acceder desde Safari

---

## 🔧 Estructura de archivos esperada

```
driverfinanzas/
├── index.html          ← Punto de entrada (HTML base)
├── app.jsx            ← Tu componente React (este código)
├── manifest.json      ← Configuración de PWA
├── sw.js              ← Service Worker (offline support)
├── .gitignore         ← Qué no subir a Git
└── README.md          ← Este archivo
```

---

## ❌ Solución de Errores

### Error 404 al abrir en iPhone

**Causa:** URL sandbox temporal de Google Cloud
**Solución:** 
- Asegúrate de que tu repositorio esté **público**
- El deploy puede tardar 1-2 minutos tras hacer push
- Intenta refrescar (swipe down) o limpia el caché de Safari

### WebKitBlobResource o blob: error

**Causa:** Links generados dinámicamente sin persistencia
**Solución:**
- Guarda el enlace `https://TU_USUARIO.github.io/driverfinanzas/` en la app
- Usa el botón **"Copiar Enlace Guardado"** en Ajustes
- Pega ese enlace en Safari

### LocalStorage vacío en iPhone

**Causa:** Safari limpia datos de sitios sin usar frecuentemente
**Solución:**
1. En iPhone, ve a **Configuración > Safari > Avanzado > Datos del sitio**
2. Busca tu sitio y **NO lo elimines**
3. Alterna entre Incógnita y Normal si es necesario

---

## 🚀 Comandos útiles para actualizar

Cada vez que hagas cambios:

```bash
# 1. Haz los cambios en el código
# 2. Guarda los archivos
# 3. Ejecuta:
git add .
git commit -m "Descripción del cambio"
git push origin main
```

GitHub Pages se actualiza automáticamente en 1-2 minutos.

---

## 📦 Archivos necesarios en GitHub

Para que iOS pueda instalar sin errores, asegúrate de subir:

✅ `index.html` - Debe existir  
✅ `manifest.json` - Debe existir  
✅ `sw.js` - Para offline (opcional pero recomendado)  
✅ `app.jsx` - Tu código React  
✅ `.gitignore` - Para no subir basura  
✅ `README.md` - Documentación  

---

## 🎯 Qué esperar

- **Primera carga:** ~2 segundos (descarga desde GitHub)
- **Cargas siguientes:** Casi instantáneo (desde caché local)
- **Datos:** Se guardan en localStorage del iPhone
- **Offline:** Funciona sin internet después de la primera carga

---

## 💡 Tips Pro

1. **Actualizar datos:** Si subes cambios a GitHub, la app en iPhone se actualiza automáticamente tras 24h (caché estándar)

2. **Forzar actualización:** En Ajustes de la app, hay un botón de reset que recarga todo

3. **Compartir acceso:** El enlace `https://TU_USUARIO.github.io/driverfinanzas/` es público. Comparte por WhatsApp, Email, etc.

4. **Cambio de nombre:** Si quieres cambiar el nombre del repositorio, actualiza el README y el `manifest.json`

---

## 📞 Si algo no funciona

Problemas comunes:

| Problema | Solución |
|----------|----------|
| No se instala en pantalla de inicio | Safari debe tener JS activado. Prueba desde Safari, no desde Mail |
| Datos se pierden | Verifica que localStorage esté habilitado en Safari |
| App lenta | Borra caché de Safari (Ajustes > Safari > Borrar historial) |
| Código QR no aparece | Primero guarda una URL en Ajustes |

---

**¡Listo! Tu DriverFinanzas está lista para tu iPhone 17. 🚀**
