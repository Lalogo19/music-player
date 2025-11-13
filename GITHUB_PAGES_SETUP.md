# Guía: Publicar Music Player en GitHub Pages

Esta guía te explica paso a paso cómo publicar tu sitio web en GitHub Pages para que sea accesible desde cualquier dispositivo en cualquier red, siempre disponible y con HTTPS automático.

## Requisitos previos
- Una cuenta en [GitHub](https://github.com) (gratis)
- Git instalado en Windows (descarga desde [git-scm.com](https://git-scm.com))
- Los archivos del proyecto: `index.html`, `styles.css`, `script.js`, `Secrets.mp3`

---

## Paso 1: Crear un repositorio en GitHub

1. Abre [github.com](https://github.com) e inicia sesión.
2. Haz clic en el botón **"+"** arriba a la derecha → **"New repository"**.
3. Completa los datos:
   - **Repository name**: `music-player` (o el nombre que prefieras)
   - **Description**: "Reproductor de música personal" (opcional)
   - **Visibility**: Selecciona **"Public"** (necesario para GitHub Pages)
   - Los demás campos puedes dejarlos vacíos por ahora
4. Haz clic en **"Create repository"**.

GitHub te mostrará una pantalla con instrucciones. **Copia la URL del repositorio** (ejemplo: `https://github.com/tu-usuario/music-player.git`). La necesitarás en el siguiente paso.

---

## Paso 2: Subir tus archivos al repositorio (opción A: con Git en PowerShell)

Abre **PowerShell** en Windows y ejecuta los siguientes comandos (navega primero a tu carpeta del proyecto):

```powershell
# Navegar a la carpeta del proyecto
cd "c:\Users\Imanol\Documents\Python\music-player"

# Inicializar el repositorio local
git init

# Agregar todos los archivos
git add .

# Crear el primer commit
git commit -m "Initial commit - Music Player"

# Agregar el repositorio remoto (reemplaza con tu URL de GitHub)
git remote add origin https://github.com/TU-USUARIO/music-player.git

# Cambiar el nombre de la rama a 'main' (estándar de GitHub)
git branch -M main

# Subir los archivos a GitHub
git push -u origin main
```

**Importante**: En la línea `git remote add origin`, reemplaza `TU-USUARIO` por tu nombre de usuario en GitHub.

### Si pide credenciales:
En Windows, GitHub ahora requiere un **Personal Access Token (PAT)** en lugar de contraseña:
1. Ve a tu perfil de GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** (o Tokens clásicos).
2. Haz clic en **"Generate new token"**.
3. Dale un nombre (ej: `music-player-push`) y permisos: maraca **repo** (acceso completo al repositorio).
4. Copia el token.
5. Cuando PowerShell te pida contraseña, **pega el token**.

---

## Paso 2 (opción B): Subir archivos directamente en GitHub (sin Git)

Si prefieres no usar línea de comandos:

1. En tu repositorio de GitHub (que acabas de crear), haz clic en **"Add file"** → **"Upload files"**.
2. Selecciona todos tus archivos (`index.html`, `styles.css`, `script.js`, `Secrets.mp3`) y cárgalos.
3. En el campo "Commit message", escribe: `Initial commit - Music Player`
4. Haz clic en **"Commit changes"**.

---

## Paso 3: Activar GitHub Pages

1. En tu repositorio, ve a **Settings** (la pestaña de engranaje).
2. En el menú de la izquierda, busca **"Pages"** (está bajo "Code and automation").
3. En la sección **"Build and deployment"**:
   - **Source**: Selecciona **"Deploy from a branch"**
   - **Branch**: Selecciona **"main"** y carpeta **"/ (root)"**
4. Haz clic en **"Save"**.

GitHub ahora compilará y publicará tu sitio. **Espera 1-2 minutos** mientras GitHub trabaja.

---

## Paso 4: Acceder a tu sitio

Después de 1-2 minutos, GitHub Pages estará listo. Tu URL será:

```
https://tu-usuario.github.io/music-player
```

Reemplaza `tu-usuario` por tu nombre de usuario en GitHub.

Si lo deseas, puedes **asignar un dominio personalizado**:
1. En **Settings → Pages**, en la sección **"Custom domain"**, introduce tu dominio (ej: `mi-music-player.com`).
2. Configura los registros DNS en tu proveedor de dominios (GitHub te mostrará las instrucciones).

---

## Paso 5: Verificación y acceso desde otros dispositivos

1. Abre un navegador y ve a `https://tu-usuario.github.io/music-player`.
2. Deberías ver tu reproductor de música funcionando.
3. **Desde otro dispositivo** (smartphone, tablet, otro PC) en otra red, abre la misma URL — ¡funcionará!

---

## Notas importantes

### Seguridad y archivos privados
- **`Secrets.mp3`**: Si este archivo contiene datos sensibles o no quieres compartirlo, **no lo subas al repositorio público**. 
  - Alternativa 1: Almacénalo en un servidor privado y carga la URL en tu `script.js` desde una fuente externa.
  - Alternativa 2: Usa GitHub [Secrets (para Actions)](https://docs.github.com/es/actions/security-guides/using-secrets-in-github-actions) si quieres hacerlo más sofisticado.

### Actualizaciones futuras
Si haces cambios locales a tus archivos:
```powershell
git add .
git commit -m "Describe tu cambio"
git push
```

GitHub Pages se actualizará automáticamente en 1-2 minutos.

### HTTPS automático
GitHub Pages **siempre proporciona HTTPS gratis**, así que tu sitio es seguro.

---

## Solución de problemas

| Problema | Solución |
|----------|----------|
| No veo la página después de 5 minutos | Ve a Settings → Pages y verifica que la rama sea "main" y esté correctamente guardada. Espera un poco más. |
| Error al hacer `git push` | Verifica que hayas creado el token de acceso y lo hayas pegado correctamente como contraseña. |
| Mi dominio personalizado no funciona | Espera 24-48 horas para que los registros DNS se propaguen. Verifica los registros en tu proveedor de dominios. |
| Los archivos no se ven / están vacíos | Asegúrate de que hayas hecho `git push` correctamente. Actualiza tu navegador (Ctrl+F5) para limpiar el caché. |

---

## Recursos útiles
- [Documentación oficial de GitHub Pages](https://docs.github.com/es/pages)
- [Guía de Git en Windows](https://git-scm.com/book/es/v2)
- [Generar Personal Access Token](https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

---

**¡Ya está! Tu music-player será accesible desde cualquier lugar del mundo con HTTPS seguro y siempre disponible. 🚀**
