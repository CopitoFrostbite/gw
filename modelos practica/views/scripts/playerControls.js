// PlayerControls.js
 class PlayerControls {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement;
        this.jump = false;
        // Escuchar eventos de teclado en todo el documento
        this.moveState = { forward: false, backward: false, left: false, right: false };

        document.addEventListener('keydown', (e) => this.onKeyDown(e), false);
        document.addEventListener('keyup', (e) => this.onKeyUp(e), false);
    }

    onKeyDown(event) {
        if (event.repeat) {
            return; // Ignorar eventos de tecla repetidos
        }

        switch (event.code) {
           
            case 'KeyW':
                this.moveState.forward = true;
                break;
            
            case 'KeyA':
                this.moveState.left = true;
                break;
            
            case 'KeyS':
                this.moveState.backward = true;
                break;
            
            case 'KeyD':
                this.moveState.right = true;
                break;
            case 'Space':
                this.jump = true;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.code) {
            
            case 'KeyW':
                this.moveState.forward = false;
                break;
           
            case 'KeyA':
                this.moveState.left = false;
                break;
           
            case 'KeyS':
                this.moveState.backward = false;
                break;
           
            case 'KeyD':
                this.moveState.right = false;
                break;
            case 'Space':
                this.jump = false;
                break;
        }
    }

    // Una nueva función para obtener el estado de movimiento
    getMovement() {
        return this.moveState;
    }
}
export default PlayerControls;