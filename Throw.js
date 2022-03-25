AFRAME.registerComponent("balls", {
  init: function () {
    this.throwBall();
  },
  throwBall: function () {
    window.addEventListener("keydown", (e) => {
     

      if (e.key === "x" || e.key === "X") {
        var ball = document.createElement("a-entity");

        ball.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.5,
        });

        ball.setAttribute("material", "color", "black");
        ball.setAttribute("dynamic-body",{
          shape:'sphere',
          mass:0
        });

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        ball.setAttribute("position", {
          x: pos.x,
          y: 1.7,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        ball.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");

        // Add Event listener to bullet
        ball.addEventListener('collide',this.removeBall);
        scene.appendChild(ball);
      }
    });
  },
  removeBall: function(e){
    
     //ball Element
     var element = e.detail.target.el;

     //element which is hit
     var elementHit = e.detail.body.el;

     if(elementHit.id.includes('pin')){

      //impulse and point vector
      var impulse = new CANNON.Vec3(0, 1, -15);
      var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute('position'));

      elementHit.body.applyForce(impulse, worldPoint);

      //remove event listener
      element.removeEventListener('collide',this.removeBall);
      
      //remove the balls from the scene
      var scene = document.querySelector("#scene");
      scene.removeChild(element);
     }

  }
});


