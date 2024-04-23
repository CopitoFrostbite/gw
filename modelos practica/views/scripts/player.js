import * as THREE from '../three.module.js';
import { updatePhysics } from './physics.js';

class Player {
    constructor(id, gltf,characterName, controls, scene, terrainMesh) {
        this.id = id;
        this.characterName = characterName;
        this.mesh = gltf; 
       
        this.mixer = new THREE.AnimationMixer(this.mesh);
       
       
       
       
       
        this.controls = controls; 
        this.scene = scene; 
        this.terrainMesh = terrainMesh;
        this.velocity = new THREE.Vector3(); 
        this.friction = 0.98
      
        this.isGrounded = false;
        this.isMoving = false;  
        this.hitbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.hitbox.setFromObject(this.mesh);
    }

    update(deltaTime) {
        // Actualiza la lógica del jugador cada frame
        this.handleInput(deltaTime);
        this.handlePhysics(deltaTime);
        this.mesh.position.addScaledVector(this.velocity, deltaTime);
        this.velocity.multiplyScalar(this.friction);
       
        this.hitbox.setFromObject(this.mesh);
        const currentPosition = this.mesh.position.clone();

       
        
    }

    handleInput(deltaTime) {
        const movement = this.controls.getMovement();
        const acceleration = 20.0;
        
       // Aplicar entradas de movimiento
        if (movement.forward ) {
            this.velocity.z -= acceleration * deltaTime;
           this.isMoving = true;
           this.isRunning = true;
        }
       
        if (movement.backward ) {
            this.velocity.z += acceleration * deltaTime;
            this.isMoving = true;
            this.isRunning = true;
        }
        if (movement.left ) {
            this.velocity.x -= acceleration * deltaTime;
            this.isRunning = true;
            this.isMoving = true;
            
        }
        if (movement.right ) {
            this.velocity.x += acceleration * deltaTime;
            
            this.isRunning = true;
            this.isMoving = true;
        }
        if (!movement.right ) {
            
            
            this.isRunning = false;
            this.isMoving = false;
        }
        if (movement.jump && this.isGrounded) {
            this.velocity.y += this.jumpForce; 
            this.isGrounded = false; 
        }
       
        
    }
   

    handlePhysics(deltaTime) {
        // Aplica la física, como la gravedad y las colisiones
        updatePhysics(this, deltaTime, this.terrainMesh);
        this.velocity.x *= this.friction;
        this.velocity.z *= this.friction;

        // Aplicar la velocidad al mesh del jugador
        this.mesh.position.addScaledVector(this.velocity, deltaTime);
         
        
       
    }

    

  
}


export default Player;