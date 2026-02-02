// debug-overlay.js
// Script para ajustar visualmente el model-viewer

(function () {
    console.log("Debug Overlay Initializing...");

    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Buscar el model-viewer
        const mv = document.querySelector('model-viewer');
        if (!mv) {
            console.warn("No model-viewer found for debug overlay.");
            return;
        }

        // Crear contenedor del overlay
        const overlay = document.createElement('div');
        overlay.id = 'mv-debug-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '10px';
        overlay.style.right = '10px';
        overlay.style.width = '300px';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.color = '#fff';
        overlay.style.padding = '15px';
        overlay.style.borderRadius = '8px';
        overlay.style.zIndex = '999999';
        overlay.style.fontFamily = 'monospace';
        overlay.style.fontSize = '12px';
        overlay.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
        overlay.style.display = 'none'; // Oculto por defecto, se activa con tecla o botón

        // Botón flotante para mostrar/ocultar
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = '🛠️ Debug 3D';
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.bottom = '20px';
        toggleBtn.style.right = '20px';
        toggleBtn.style.zIndex = '999999';
        toggleBtn.style.padding = '10px 15px';
        toggleBtn.style.borderRadius = '30px';
        toggleBtn.style.border = 'none';
        toggleBtn.style.backgroundColor = '#ff0055';
        toggleBtn.style.color = 'white';
        toggleBtn.style.fontWeight = 'bold';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.style.boxShadow = '0 4px 10px rgba(255, 0, 85, 0.4)';

        toggleBtn.addEventListener('click', () => {
            overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
        });

        document.body.appendChild(toggleBtn);
        document.body.appendChild(overlay);

        // Estilos para inputs
        const style = document.createElement('style');
        style.textContent = `
            #mv-debug-overlay label { display: block; margin-top: 10px; margin-bottom: 2px; color: #aaa; }
            #mv-debug-overlay input[type="range"] { width: 100%; }
            #mv-debug-overlay input[type="text"] { width: 100%; background: #333; border: 1px solid #555; color: #fff; padding: 4px; margin-top: 2px; }
            #mv-debug-overlay .value-display { float: right; color: #00ffaa; }
            #mv-debug-overlay button { margin-top: 15px; width: 100%; padding: 8px; background: #444; color: #fff; border: 1px solid #666; cursor: pointer; }
            #mv-debug-overlay button:hover { background: #555; }
            #mv-debug-overlay .section-title { font-weight: bold; color: #fff; border-bottom: 1px solid #444; padding-bottom: 5px; margin-bottom: 10px; font-size: 14px; }
        `;
        document.head.appendChild(style);

        // Contenido del overlay
        overlay.innerHTML = `
            <div class="section-title">Ajustes de Cámara (v2.2) <span style="cursor:pointer;float:right" id="close-debug">✖</span></div>
            
            <label>Target X (Lateral) <span id="val-target-x" class="value-display"></span></label>
            <input type="range" id="in-target-x" min="-2" max="2" step="0.01" value="0">

            <label>Target Y (Altura) <span id="val-target-y" class="value-display"></span></label>
            <input type="range" id="in-target-y" min="-1" max="4" step="0.01" value="0.5">

            <label>Target Z (Profundidad) <span id="val-target-z" class="value-display"></span></label>
            <input type="range" id="in-target-z" min="-2" max="2" step="0.01" value="0">

            <hr style="border-color:#444; margin: 10px 0;">

            <label>Camera Orbit (Theta) <span id="val-theta" class="value-display"></span></label>
            <input type="range" id="in-theta" min="-180" max="180" step="1">
            
            <label>Camera Orbit (Phi) <span id="val-phi" class="value-display"></span></label>
            <input type="range" id="in-phi" min="0" max="180" step="1">
            
            <label>Camera Orbit (Radius %) <span id="val-radius" class="value-display"></span></label>
            <input type="range" id="in-radius" min="50" max="500" step="1" value="100">
            
            <label>Field of View (FOV) <span id="val-fov" class="value-display"></span></label>
            <input type="range" id="in-fov" min="1" max="100" step="1">

            <label>Min Radius (Zoom In Limit) <span id="val-min-radius" class="value-display"></span></label>
            <input type="range" id="in-min-radius" min="0" max="20" step="0.1" value="0">

            <label>Max Radius (Zoom Out Limit) <span id="val-max-radius" class="value-display"></span></label>
            <input type="range" id="in-max-radius" min="1" max="50" step="0.1" value="10">

            <div style="margin-top: 15px; border-top: 1px solid #444; padding-top: 10px;">
                <label>Resultado (Copiar para HTML):</label>
                <textarea id="out-config" rows="7" style="width:100%; background:#222; color:#0f0; border:none; padding:5px; font-size:11px;" readonly></textarea>
                <button id="btn-reset">Reset Camera</button>
            </div>
        `;

        // Referencias a elementos
        const inTargetX = overlay.querySelector('#in-target-x');
        const inTargetY = overlay.querySelector('#in-target-y');
        const inTargetZ = overlay.querySelector('#in-target-z');
        const inTheta = overlay.querySelector('#in-theta');
        const inPhi = overlay.querySelector('#in-phi');
        const inRadius = overlay.querySelector('#in-radius');
        const inFov = overlay.querySelector('#in-fov');
        const inMinRadius = overlay.querySelector('#in-min-radius');
        const inMaxRadius = overlay.querySelector('#in-max-radius');
        const outConfig = overlay.querySelector('#out-config');

        const valTargetX = overlay.querySelector('#val-target-x');
        const valTargetY = overlay.querySelector('#val-target-y');
        const valTargetZ = overlay.querySelector('#val-target-z');
        const valTheta = overlay.querySelector('#val-theta');
        const valPhi = overlay.querySelector('#val-phi');
        const valRadius = overlay.querySelector('#val-radius');
        const valFov = overlay.querySelector('#val-fov');
        const valMinRadius = overlay.querySelector('#val-min-radius');
        const valMaxRadius = overlay.querySelector('#val-max-radius');

        overlay.querySelector('#close-debug').addEventListener('click', () => {
            overlay.style.display = 'none';
        });

        overlay.querySelector('#btn-reset').addEventListener('click', () => {
            // Valores por defecto aproximados
            mv.cameraTarget = '0m 0.5m 0m';
            mv.cameraOrbit = '0deg 75deg 105%';
            mv.fieldOfView = '30deg';
            mv.minCameraOrbit = 'auto auto auto';
            mv.maxCameraOrbit = 'auto auto auto';
            updateInputsFromModel();
        });

        // Función para actualizar el modelo desde inputs
        function updateModel() {
            const x = inTargetX.value + 'm';
            const y = inTargetY.value + 'm';
            const z = inTargetZ.value + 'm';
            const theta = inTheta.value + 'deg';
            const phi = inPhi.value + 'deg';
            const radius = inRadius.value + '%';
            const fov = inFov.value + 'deg';
            const minRadius = inMinRadius.value + 'm';
            const maxRadius = inMaxRadius.value + 'm';

            mv.cameraTarget = `${x} ${y} ${z}`;
            mv.cameraOrbit = `${theta} ${phi} ${radius}`;
            mv.fieldOfView = fov;
            mv.minCameraOrbit = `auto auto ${minRadius}`;
            mv.maxCameraOrbit = `auto auto ${maxRadius}`;

            // Actualizar displays
            valTargetX.textContent = x;
            valTargetY.textContent = y;
            valTargetZ.textContent = z;
            valTheta.textContent = theta;
            valPhi.textContent = phi;
            valRadius.textContent = radius;
            valFov.textContent = fov;
            valMinRadius.textContent = minRadius;
            valMaxRadius.textContent = maxRadius;

            // Generar string de configuración
            outConfig.value = `camera-target="${x} ${y} ${z}"\ncamera-orbit="${theta} ${phi} ${radius}"\nfield-of-view="${fov}"\nmin-camera-orbit="auto auto ${minRadius}"\nmax-camera-orbit="auto auto ${maxRadius}"`;
        }

        // Función para leer estado actual del modelo y actualizar inputs
        function updateInputsFromModel() {
            const orbit = mv.getCameraOrbit(); // {theta: rad, phi: rad, radius: m}
            const target = mv.getCameraTarget(); // {x, y, z}
            const fov = mv.getFieldOfView(); // deg

            // Convertir rad a deg
            const thetaDeg = (orbit.theta * 180 / Math.PI).toFixed(0);
            const phiDeg = (orbit.phi * 180 / Math.PI).toFixed(0);

            inTargetX.value = target.x.toFixed(2);
            inTargetY.value = target.y.toFixed(2);
            inTargetZ.value = target.z.toFixed(2);
            inTheta.value = thetaDeg;
            inPhi.value = phiDeg;
            inFov.value = fov.toFixed(0);

            valTargetX.textContent = target.x.toFixed(2) + 'm';
            valTargetY.textContent = target.y.toFixed(2) + 'm';
            valTargetZ.textContent = target.z.toFixed(2) + 'm';
            // Radius lo dejamos quieto o need more logic to parse 'm' back to '%' or maintain state
        }

        // Listeners changes
        inTargetX.addEventListener('input', updateModel);
        inTargetY.addEventListener('input', updateModel);
        inTargetZ.addEventListener('input', updateModel);
        inTheta.addEventListener('input', updateModel);
        inPhi.addEventListener('input', updateModel);
        inRadius.addEventListener('input', updateModel);
        inFov.addEventListener('input', updateModel);
        inMinRadius.addEventListener('input', updateModel);
        inMaxRadius.addEventListener('input', updateModel);

        // Escuchar cambios externos en la cámara (ej. interacción usuario)
        mv.addEventListener('camera-change', (e) => {
            if (e.detail.source === 'user-interaction') {
                updateInputsFromModel();
            }
        });

        // Inicializar
        updateInputsFromModel();
        // Nota: updateModel se llama automáticamente por los inputs durante el flujo
    }
})();
