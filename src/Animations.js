// var Animation = {
//   animateMesh : function(aubengine, mesh, position, frames) {
//       //1 calculate distance
//       var current_pos = mesh.getPosition();
//       mesh.setPosition[position];
//
//   };
// }
//
//
// function animate(){
// 	pos_sphere += dx_sphere;
//     if (pos_sphere >= 30 || pos_sphere <=-30){
//     	dx_sphere = -dx_sphere;
//     }
//
//     pos_cone += dx_cone;
//     if (pos_cone >= 35 || pos_cone <=-35){
//     	dx_cone = -dx_cone;
//     }
// 	draw();
// }
//
// function onFrame(){
//     elapsedTime = (new Date).getTime() - initialTime;
//     if (elapsedTime < frequency) return; //come back later!
//
//     var steps = Math.floor(elapsedTime / frequency);
//     while(steps > 0){
//         animate();
//         steps -= 1;
//     }
//     initialTime = (new Date).getTime();
// }
