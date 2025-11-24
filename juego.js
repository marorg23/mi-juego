document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTOS DEL DOM ---
    const pantallas = document.querySelectorAll('.pantalla');
    const pantallaBienvenida = document.getElementById('pantalla-bienvenida');
    const pantallaJuego = document.getElementById('pantalla-juego');
    const pantallaNivel1Completado = document.getElementById('pantalla-nivel1-completado');
    const modalResultado = document.getElementById('modal-resultado');

    const nombreInput = document.getElementById('nombre-jugador');
    const nombreEnJuegoSpan = document.getElementById('nombre-en-juego');
    const infoNivelSpan = document.getElementById('info-nivel');

    const btnJugar = document.getElementById('btn-jugar');
    const btnVerificarN2 = document.getElementById('btn-verificar-n2');
    const btnLupa = document.getElementById('btn-lupa');
    const btnRepetir = document.getElementById('btn-repetir');
    const btnReiniciar = document.getElementById('btn-reiniciar');
    const btnSalir = document.getElementById('btn-salir');
    const btnSiguienteNivel2 = document.getElementById('btn-siguiente-nivel2');
    const btnSalirCompletado = document.getElementById('btn-salir-completado'); // <<< NUEVO BOTÓN

    const nivel1Div = document.getElementById('nivel1');
    const nivel2Div = document.getElementById('nivel2');
    const objetosMesaDiv = document.getElementById('objetos-mesa');
    const cuerdasDiv = document.getElementById('cuerdas');
    const panelCarneDiv = document.getElementById('panel-carne');

    const lupaGrandeDiv = document.getElementById('lupa-grande');
    const imagenLupa = document.getElementById('imagen-lupa');
    const snackbar = document.getElementById('snackbar');

    // --- ESTADO DEL JUEGO ---
    const gameState = {
        nombreJugador: '',
        nivelActual: 1,
        rondaActual: 1,
        insignias: [],
        seleccionadosNivel1: [],
        carnesColocadas: {},
        vidas: 1
    };

    // --- DATOS PARA LA LUPA ---
    const datosLupa = {
        width: '70px',
        height: '70px',
        top: '83%',
        left: '91%',
    };

    // --- DATOS DEL JUEGO ---
    const datosNivel1 = {
        1: {
            backgroundImage: 'url("assets/images/mesa_ronda1.jpg")',
            backgroundImageLupa: 'url("assets/images/mesa_ronda1_lupa.jpg")',
            objetos: [
                { id: 'mango', nombre: 'Mango', img: '...', correcto: false, top: '74%', left: '35%', width: '78px', height: '70px' },
                { id: 'oso', nombre: 'Oso de peluche', img: '...', correcto: false, top: '63%', left: '44%', width: '90px', height: '89px' },
                { id: 'carne-fresca', nombre: 'Carne Fresca', img: '...', correcto: true, top: '88%', left: '45%', width: '128px', height: '34px' },
                { id: 'sal', nombre: 'Sal Gruesa', img: '...', correcto: true, top: '72%', left: '62%', width: '34px', height: '74px' },
                { id: 'platano-amarillo', nombre: 'Plátano Amarillo', img: '...', correcto: false, top: '71%', left: '55%', width: '64px', height: '56px' },
            ]
        },
        2: {
            backgroundImage: 'url("assets/images/mesa_ronda2.jpg")',
            backgroundImageLupa: 'url("assets/images/mesa_ronda2_lupa.jpg")',
            objetos: [
                { id: 'zapato', nombre: 'Zapato', img: '...', correcto: false, top: '63%', left: '42%', width: '105px', height: '75px' },
                { id: 'ajo', nombre: 'Ajo', img: '...', correcto: true, top: '73%', left: '32%', width: '61px', height: '56px' },
                { id: 'ajo-verde', nombre: 'Ajo con Manchas', img: '...', correcto: false, top: '86%', left: '61%', width: '49px', height: '43px' },
                { id: 'platano-verde', nombre: 'Plátano Verde', img: '...', correcto: true, top: '63%', left: '55%', width: '98px', height: '75px' },
                { id: 'carne-grasa', nombre: 'Carne con Grasa', img: '...', correcto: false, top: '87%', left: '40%', width: '153px', height: '45px' },
            ]
        },
        3: {
            backgroundImage: 'url("assets/images/mesa_ronda3.jpg")',
            backgroundImageLupa: 'url("assets/images/mesa_ronda3_lupa.jpg")',
            objetos: [
                { id: 'cebolla', nombre: 'Cebolla', img: '...', correcto: true, top: '69%', left: '44%', width: '53px', height: '39px' },
                { id: 'aji-panca', nombre: 'Ají Panca', img: '...', correcto: true, top: '87%', left: '45%', width: '92px', height: '38px' },
                { id: 'hilo-yute', nombre: 'Hilo de Yute', img: '...', correcto: false, top: '80%', left: '46%', width: '149px', height: '26px' },
                { id: 'hilo-yute-dos', nombre: 'Hilo de Yute', img: '...', correcto: false, top: '86%', left: '55%', width: '75px', height: '21px' },
                { id: 'limon', nombre: 'Limón', img: '...', correcto: true, top: '79%', left: '34%', width: '57px', height: '51px' },
                { id: 'azucar', nombre: 'Azúcar', img: '...', correcto: false, top: '78%', left: '41%', width: '36px', height: '55px' },
            ]
        }
    };

    const datosNivel2 = {
        cuerdas: [
            { id: 'c1', tipo: 'incorrecta-baja', top: '60%', left: '20%' },
            { id: 'c2', tipo: 'correcta', top: '25%', left: '45%' },
            { id: 'c3', tipo: 'incorrecta-arbol', top: '30%', left: '70%' },
            { id: 'c4', tipo: 'correcta', top: '22%', left: '15%' },
            { id: 'c5', tipo: 'incorrecta-sucia', top: '50%', left: '50%' },
            { id: 'c6', tipo: 'correcta', top: '28%', left: '30%' },
        ],
        carnes: [
            { id: 'carne1', img: 'https://cdn-icons-png.flaticon.com/512/2951/2951701.png' },
            { id: 'carne2', img: 'https://cdn-icons-png.flaticon.com/512/2951/2951701.png' },
            { id: 'carne3', img: 'https://cdn-icons-png.flaticon.com/512/2951/2951701.png' },
        ]
    };

    // --- FUNCIONES DE NAVEGACIÓN Y CONTROL ---
    function mostrarPantalla(idPantalla) {
        pantallas.forEach(p => p.classList.remove('activa'));
        document.getElementById(idPantalla).classList.add('activa');
    }

    function iniciarJuego() {
        if (nombreInput.value.trim() === '') {
            mostrarSnackbar('Por favor, ingrese su nombre.');
            return;
        }
        gameState.nombreJugador = nombreInput.value || 'Jugador';
        gameState.nivelActual = 1;
        gameState.rondaActual = 1;
        gameState.insignias = [];
        gameState.seleccionadosNivel1 = [];
        gameState.carnesColocadas = {};
        
        nombreEnJuegoSpan.textContent = gameState.nombreJugador;
        mostrarPantalla('pantalla-juego');
        cargarRondaNivel1(gameState.rondaActual);
    }

    function reiniciarJuego() {
        modalResultado.classList.add('oculto');
        pantallaNivel1Completado.classList.add('oculto');
        nivel2Div.classList.add('oculto');
        nivel1Div.classList.remove('oculto');
        nombreInput.value = '';
        mostrarPantalla('pantalla-bienvenida');
    }
    
    function perderVida() {
        mostrarModalDerrota();
    }

    // --- POPUPS DE RONDA ---
    function mostrarPopupRonda(titulo, mensaje, callback) {
        document.getElementById('titulo-modal').textContent = titulo;
        document.getElementById('mensaje-modal').textContent = mensaje;
        document.getElementById('insignias-modal').innerHTML = '';
        document.getElementById('imagen-final-modal').innerHTML = '';
        
        btnReiniciar.classList.add('oculto');
        
        const botonSiguiente = btnRepetir;
        botonSiguiente.textContent = 'Siguiente';
        botonSiguiente.classList.remove('oculto');
        
        botonSiguiente.onclick = () => {
            modalResultado.classList.add('oculto');
            btnReiniciar.classList.remove('oculto'); 
            callback();
        };
        
        modalResultado.classList.remove('oculto');
    }
    
    function mostrarSnackbar(mensaje) {
        snackbar.textContent = mensaje;
        snackbar.classList.add('show');
        setTimeout(() => {
            snackbar.classList.remove('show');
        }, 3000);
    }

    // --- PANTALLA NIVEL 1 COMPLETADO ---
    function mostrarPantallaNivel1Completado() {
        mostrarPantalla('pantalla-nivel1-completado');
    }

    // --- CONFIGURAR LUPA ---
    function configurarLupa() {
        btnLupa.style.width = datosLupa.width;
        btnLupa.style.height = datosLupa.height;
        btnLupa.style.top = datosLupa.top;
        btnLupa.style.left = datosLupa.left;
    }

    // --- LÓGICA NIVEL 1 ---
    function cargarRondaNivel1(ronda) {
        gameState.seleccionadosNivel1 = [];
        infoNivelSpan.textContent = `Nivel 1 - Ronda ${ronda}`;
        objetosMesaDiv.innerHTML = '';

        const areaNivel1 = document.getElementById('area-nivel1');
        const rondaActualData = datosNivel1[ronda];
        
        if(lupaActiva) {
            lupaActiva = false;
        }
        areaNivel1.style.backgroundImage = rondaActualData.backgroundImage;

        configurarLupa();

        const objetosRonda = rondaActualData.objetos;
        objetosRonda.forEach(obj => {
            const objDiv = document.createElement('div');
            objDiv.className = 'objeto-item';
            objDiv.dataset.id = obj.id;
            objDiv.dataset.correcto = obj.correcto;
            objDiv.style.top = obj.top;
            objDiv.style.left = obj.left;
            objDiv.style.width = obj.width;
            objDiv.style.height = obj.height;
            objDiv.addEventListener('click', manejarClickObjeto);
            objetosMesaDiv.appendChild(objDiv);
        });
    }
    
    function manejarClickObjeto(event) {
        if (lupaActiva) {
            return;
        }
        const obj = event.target;
        const esCorrecto = obj.dataset.correcto === 'true';
        const id = obj.dataset.id;
        const estaSeleccionado = obj.classList.contains('seleccionado');

        if (!estaSeleccionado && !esCorrecto) {
            obj.style.animation = 'shake 0.5s';
            setTimeout(() => { obj.style.animation = ''; }, 500);
            perderVida();
            return;
        }

        obj.classList.toggle('seleccionado');
        if (estaSeleccionado) {
            gameState.seleccionadosNivel1 = gameState.seleccionadosNivel1.filter(s => s !== id);
        } else {
            gameState.seleccionadosNivel1.push(id);
        }

        const objetosRonda = datosNivel1[gameState.rondaActual].objetos;
        const correctosIds = objetosRonda.filter(o => o.correcto).map(o => o.id);
        
        const rondaCompleta = gameState.seleccionadosNivel1.length === correctosIds.length &&
                              correctosIds.every(id => gameState.seleccionadosNivel1.includes(id));

        if (rondaCompleta) {
            if (gameState.rondaActual < 3) {
                const siguienteRonda = gameState.rondaActual + 1;
                mostrarPopupRonda('¡Ronda Completa!', `¡Excelente selección! Prepárate para la ronda ${siguienteRonda}.`, () => {
                    gameState.rondaActual = siguienteRonda;
                    cargarRondaNivel1(gameState.rondaActual);
                });
            } else {
                gameState.insignias.push('manos-sabias');
                mostrarPantallaNivel1Completado();
            }
        }
    }

    // --- LÓGICA NIVEL 2 ---
    function cargarNivel2() {
        gameState.nivelActual = 2;
        mostrarPantalla('pantalla-juego'); // Asegurar que volvemos a la pantalla de juego
        
        infoNivelSpan.textContent = 'Nivel 2 - Secado de la Carne';
        nivel1Div.classList.add('oculto');
        nivel2Div.classList.remove('oculto');
        
        cuerdasDiv.innerHTML = '';
        datosNivel2.cuerdas.forEach(cuerda => {
            const cuerdaDiv = document.createElement('div');
            cuerdaDiv.className = `cuerda ${cuerda.tipo}`;
            cuerdaDiv.dataset.id = cuerda.id;
            cuerdaDiv.style.top = cuerda.top;
            cuerdaDiv.style.left = cuerda.left;
            cuerdaDiv.addEventListener('dragover', manejarDragOver);
            cuerdaDiv.addEventListener('drop', manejarDrop);
            cuerdaDiv.addEventListener('dragleave', manejarDragLeave);
            cuerdaDiv.appendChild(cuerdaDiv);
        });

        panelCarneDiv.innerHTML = '<h3>Arrastra la carne</h3>';
        datosNivel2.carnes.forEach(carne => {
            const carneDiv = document.createElement('div');
            carneDiv.className = 'carne-piece';
            carneDiv.id = carne.id;
            carneDiv.draggable = true;
            carneDiv.style.backgroundImage = `url('${carne.img}')`;
            carneDiv.addEventListener('dragstart', manejarDragStart);
            carneDiv.addEventListener('dragend', manejarDragEnd);
            panelCarneDiv.appendChild(carneDiv);
        });
    }

    let draggedElement = null;
    function manejarDragStart(e) { draggedElement = e.target; e.target.classList.add('dragging'); }
    function manejarDragEnd(e) { e.target.classList.remove('dragging'); }
    function manejarDragOver(e) { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }
    function manejarDragLeave(e) { e.currentTarget.classList.remove('drag-over'); }
    function manejarDrop(e) {
        e.preventDefault();
        const dropZone = e.currentTarget;
        dropZone.classList.remove('drag-over');
        if (draggedElement) {
            const prevCuerdaId = gameState.carnesColocadas[draggedElement.id];
            if (prevCuerdaId) {
                const prevCuerda = document.querySelector(`.cuerda[data-id="${prevCuerdaId}"]`);
                if (prevCuerda && prevCuerda.querySelector('.carne-piece')) { prevCuerda.querySelector('.carne-piece').remove(); }
            }
            dropZone.appendChild(draggedElement);
            gameState.carnesColocadas[draggedElement.id] = dropZone.dataset.id;
        }
    }

    function verificarRespuestasNivel2() {
        const cuerdasCorrectasIds = datosNivel2.cuerdas.filter(c => c.tipo === 'correcta').map(c => c.id);
        const carnesBienColocadas = Object.values(gameState.carnesColocadas).every(cuerdaId => cuerdasCorrectasIds.includes(cuerdaId));
        if (!carnesBienColocadas || Object.keys(gameState.carnesColocadas).length < 3) { perderVida(); return; }
        
        gameState.insignias.push('maestro-tradicion');
        mostrarModalVictoriaFinal('¡Juego Completado!', '¡Eres un verdadero Maestro de la Tradición!');
    }

    // --- MANEJO DE MODALES Y LUPA ---
    function mostrarModalDerrota() {
        document.getElementById('titulo-modal').textContent = '¡Has Fallado!';
        document.getElementById('mensaje-modal').textContent = 'Una mala decisión puede arruinar todo. ¡Intenta de nuevo!';
        document.getElementById('insignias-modal').innerHTML = '';
        document.getElementById('imagen-final-modal').innerHTML = '';
        
        btnRepetir.textContent = 'Repetir Nivel';
        btnRepetir.classList.remove('oculto');
        btnRepetir.onclick = () => {
             modalResultado.classList.add('oculto');
             if (gameState.nivelActual === 1) {
                 cargarRondaNivel1(gameState.rondaActual);
             } else {
                 gameState.carnesColocadas = {};
                 cargarNivel2();
             }
        };

        btnReiniciar.classList.remove('oculto');
        modalResultado.classList.remove('oculto');
    }
    
    function mostrarModalVictoriaFinal(titulo, mensaje) {
        document.getElementById('titulo-modal').textContent = titulo;
        document.getElementById('mensaje-modal').textContent = mensaje;
        let insigniasHTML = '';
        if (gameState.insignias.includes('manos-sabias')) { insigniasHTML += `<div class="insignia" style="background-image: url('https://cdn-icons-png.flaticon.com/512/4323/4323033.png')"></div>`; }
        if (gameState.insignias.includes('maestro-tradicion')) { insigniasHTML += `<div class="insignia" style="background-image: url('https://cdn-icons-png.flaticon.com/512/2951/2951701.png')"></div>`; }
        document.getElementById('insignias-modal').innerHTML = insigniasHTML;
        if (gameState.insignias.length === 2) { document.getElementById('imagen-final-modal').innerHTML = `<img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Carne Seca Lista">`; }
        
        btnRepetir.classList.add('oculto');
        btnReiniciar.classList.remove('oculto');
        modalResultado.classList.remove('oculto');
    }

    // --- MANEJO DE LA LUPA ---
    let lupaActiva = false;
    btnLupa.addEventListener('click', (e) => {
        e.stopPropagation();
        lupaActiva = !lupaActiva;
        
        const areaNivel1 = document.getElementById('area-nivel1');
        const rondaActualData = datosNivel1[gameState.rondaActual];

        if (lupaActiva) {
            areaNivel1.style.backgroundImage = rondaActualData.backgroundImageLupa;
        } else {
            areaNivel1.style.backgroundImage = rondaActualData.backgroundImage;
        }
    });

    document.addEventListener('click', (e) => {
        if (lupaActiva && e.target.id !== 'btn-lupa') {
            lupaActiva = false;
            const areaNivel1 = document.getElementById('area-nivel1');
            const rondaActualData = datosNivel1[gameState.rondaActual];
            areaNivel1.style.backgroundImage = rondaActualData.backgroundImage;
        }
    });

    // --- EVENT LISTENERS ---
    btnJugar.addEventListener('click', iniciarJuego);
    btnVerificarN2.addEventListener('click', verificarRespuestasNivel2);
    btnReiniciar.addEventListener('click', reiniciarJuego);
    btnSalir.addEventListener('click', reiniciarJuego);
    
    // <<< NUEVO EVENT LISTENER
    if (btnSalirCompletado) {
        btnSalirCompletado.addEventListener('click', reiniciarJuego);
    }
    
    btnSiguienteNivel2.addEventListener('click', () => {
        cargarNivel2();
    });
});