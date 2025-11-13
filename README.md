# Reproductor de Música con Visualización Tesla

Página web interactiva que reproduce música con una **visualización espectacular de Bobinas Tesla** dispuestas en triángulo, con rayos azules animados que reaccionan a la música. **Totalmente responsive y optimizado para celulares.**

## Características

- 🎵 **Reproductor funcional**: play, pause, siguiente, anterior, barra de progreso, control de volumen.
- ⚡ **Bobinas Tesla en triángulo**: Tres bobinas espirales azules posicionadas en los vértices de un triángulo.
- 🌩️ **Rayos dinámicos azules**: Descargas eléctricas que varían en intensidad según la música.
- 📱 **Responsive 100%**: Optimizado para desktop, tablets y celulares (incluso muy pequeños).
- 🎨 **Colores azul cian**: Espectro azul calmante y profesional.
- 📁 **Carga de archivos**: Arrastra y suelta archivos .mp3/.wav o usa el botón de carga.
- 📋 **Playlist**: Reproducción continua con loop opcional.
- 🎶 **Canción por defecto**: "Secrets" de OneRepublic preseleccionada.

## Características

- 🎵 **Reproductor funcional**: play, pause, siguiente, anterior, barra de progreso, control de volumen.
- ⚡ **Bobinas Tesla en triángulo**: Tres bobinas espirales posicionadas en los vértices de un triángulo.
- 🌩️ **Rayos dinámicos**: Descargas eléctricas entre las bobinas que varían en intensidad según la música.
- 🎨 **Colores psicodélicos**: Espectro HSL que cambia continuamente.
- 📁 **Carga de archivos**: Arrastra y suelta archivos .mp3/.wav o usa el botón de carga.
- 📋 **Playlist**: Reproducción continua con loop opcional.

## Archivos

- `index.html` - Estructura HTML con canvas y reproductor compacto.
- `styles.css` - Estilos responsivos (canvas fullscreen + panel lateral).
- `script.js` - Lógica del reproductor + animación de rayos Tesla sincronizada con música.
- `README.md` - Este archivo.

## Cómo usar

1. **Abre el archivo** `c:\Users\Imanol\Documents\Python\music-player\index.html` en tu navegador.
   - **Windows Desktop**: Arrastra el archivo al navegador o ejecuta:
     ```powershell
     start 'c:\Users\Imanol\Documents\Python\music-player\index.html'
     ```
   - **Celular**: Copia el archivo a tu dispositivo o usa un servidor local HTTP.

2. **Reproduce música**:
   - Haz clic en "Secrets - OneRepublic" (ya está preseleccionada) o elige otra pista.
   - Usa los botones: Play/Pause (▶️/⏸), Anterior (⏮), Siguiente (⏭).
   - Ajusta el volumen con el control deslizante.

3. **Carga tus propios archivos**:
   - Arrastra archivos .mp3/.wav al área de carga (en desktop).
   - O haz clic en el botón de archivo para seleccionar localmente.

4. **Observa la visualización Tesla**:
   - La pantalla muestra tres bobinas Tesla azules formando un triángulo.
   - Los rayos cobran vida cuando la música está en reproducción.
   - La intensidad y cantidad de rayos varían con el sonido.

## Detalles de la visualización

- **Bobinas**: Tres espirales concéntricas azules en cada vértice del triángulo, con centro brillante cian.
- **Rayos**: Descargas eléctricas azules que conectan las bobinas.
- **Rayos principales**: 3 rayos base que siempre conectan cada bobina con las adyacentes.
- **Rayos internos**: Cuando la música suena, se generan rayos caóticos adicionales.
- **Partículas**: Energía azul-cian que orbita alrededor de cada bobina.
- **Responsividad**: 
  - **Desktop** (>768px): Bobinas grandes, panel compacto a la derecha.
  - **Tablets** (768px): Bobinas medianas, panel ancho.
  - **Celulares** (<480px): Bobinas pequeñas, panel fullwidth abajo, interfaz adaptada al tacto.

## Notas

- Las pistas de ejemplo usan URLs públicas (SoundHelix). Necesitas internet para reproducirlas.
- **Secrets** de OneRepublic es la canción por defecto, pero actualmente usa una pista de prueba.
- Archivos locales se reproducen con `URL.createObjectURL`; funcionan dentro de la misma sesión.
- Para guardar una playlist permanente, puedes usar localStorage (extensión futura).
- Los rayos se animan de forma independiente a ~60fps usando `requestAnimationFrame`.
- **En celulares**: Los controles están optimizados para tacto, la playlist se puede desplazar, y el canvas se adapta automáticamente.

## Extensiones posibles

- Analizar audio en tiempo real con Web Audio API para sincronizar rayos con frecuencias.
- Permitir cambio de tema (colores, número de bobinas, forma geométrica).
- Guardar playlists en localStorage.
- Soporte para streaming de Spotify/YouTube.
- Visualizador espectral en lugar de rayos.

**¡Disfruta la experiencia Tesla!** ⚡🎵✨
