import * as THREE from '../three.module.js';

function updatePhysics(player, deltaTime, terrainMesh) {
   
    
    const raycaster = new THREE.Raycaster(player.mesh.position.clone().add(new THREE.Vector3(0, 1.0, 0)), new THREE.Vector3(0, -1, 0));
    const intersects = raycaster.intersectObject(terrainMesh);
    const groundThreshold = 0.05;

    if (intersects.length > 0) {
        const closest = intersects[0];
        const distanceToGround = closest.distance - 1.5; 

        if (distanceToGround <= groundThreshold) {
            player.mesh.position.y -= distanceToGround; 
            player.velocity.y = 0;
            if (!player.isGrounded) {
                console.log("grounded");
            }
            player.isGrounded = true;
        } else {
            if (player.isGrounded) {
                console.log("airborne");
            }
            player.isGrounded = false;
            
            player.velocity.y += -9.81 * deltaTime;
        }
    } else {
        if (player.isGrounded) {
            console.log("airborne");
        }
        player.isGrounded = false;
        
        player.velocity.y += -9.81 * deltaTime;
    }
}

function checkPlayerCollisions(player, collidableObjects) {
    let collisionDetected = false;
    player.hitbox.setFromObject(player.mesh);

    for (let i = 0; i < collidableObjects.length; i++) {
        if (player.hitbox.intersectsBox(new THREE.Box3().setFromObject(collidableObjects[i]))) {
            
            collisionDetected = true;
            break; 
        }
    }

    
    if (collisionDetected) {
        player.mesh.material.color.set(0xAA5733); 
    } else {
        player.mesh.material.color.set(0x0000FF); 
    }
}


export { updatePhysics, checkPlayerCollisions };