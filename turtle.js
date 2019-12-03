
//rotate a part of the torsor, according to the name
//increase/decrease the angle depending on the keyCode 187(+) or 189(-)
function rotate(object, name, keyCode){
  if (name == "hip") {
    var hipAngle = object.rotation.y;

    if (keyCode == 189 && hipAngle > -Math.PI / 2 )
      object.rotation.y -= Math.PI / 60;
    else if (keyCode == 187 && hipAngle < Math.PI / 2)
      object.rotation.y += Math.PI / 60;
  }
  else if (name == "knee") {
    var kneeAngle = object.rotation.y;

    if (keyCode == 189 && kneeAngle > -Math.PI / 2)
      object.rotation.y -= Math.PI / 45;
    else if (keyCode == 187 && kneeAngle < 0)
      object.rotation.y +=  Math.PI / 45;
  }
  else if (name == "ankle") {
    var ankleAngle = object.rotation.y;

    if (keyCode == 189 && ankleAngle > -Math.PI / 3)
      object.rotation.y -= Math.PI / 45;
    else if (keyCode == 187 && ankleAngle < Math.PI / 3)
      object.rotation.y += Math.PI / 45;
  }
  else if (name == "neck") {
    var headAngle = object.rotation.z;
    if (keyCode == 189 && headAngle > -Math.PI / 2)
      object.rotation.z -= Math.PI / 45;
    else if (keyCode == 187 && headAngle < Math.PI / 2)
      object.rotation.z += Math.PI / 45;
  }
  else {
    var tailAngle = object.rotation.z;
    if (keyCode == 187 && tailAngle > -Math.PI / 2)
      object.rotation.z -= Math.PI / 45;
    else if (keyCode == 189 && tailAngle < Math.PI / 2)
      object.rotation.z += Math.PI / 45;
  }
}

//to swtich between true/false status when pressing the same key
function switchStatus(status) {
  if (!status)
    return true;
  else
    return false;
}

var showingLight = true;
function toggleLight() {
  directionalLight.visible = !showingLight;
  if (showingLight) {
    directionalLight.enabled = true;
  } else {
    directionalLight.enabled = false;
  }
  showingLight = !showingLight;
//  render();
}

function handleKeyDown(event)
{
  switch (event.keyCode) {
    //X
    case 88:
        toggleAxes();
        break;
    //L
    case 76:
      toggleLight();
      break;
    //M
    case 77:
      toggleWireframe();
      break;

    //left arrow
    case 37:
      left = switchStatus(left);
      document.getElementById("leftStatus").innerHTML = left;
      break;
    //right arrow
    case 39:
      right = switchStatus(right);
      document.getElementById("rightStatus").innerHTML = right;
      break;
    //up arrow
    case 38:
      front = switchStatus(front);
      document.getElementById("frontStatus").innerHTML = front;
      break;
    //down arrow
    case 40:
      rear = switchStatus(rear);
      document.getElementById("rearStatus").innerHTML = rear;
      break;
      //H
    case 72:
      selectedLeg = findLeg();
      selectedLegPart = findLegPart(selectedLeg, 72);
      break;
    //A
    case 65:
      selectedLeg = findLeg();
      selectedLegPart = findLegPart(selectedLeg, 65);
      break;
    //K
    case 75:
      selectedLeg = findLeg();
      selectedLegPart = findLegPart(selectedLeg, 75);
      break;
    //N
    case 78:
      selectedLegPart = scene.getObjectByName("neck");
      break;
    //T
    case 84:
       selectedLegPart = scene.getObjectByName("tail");
      break;
    //+
    case 187:
      rotate(selectedLegPart, selectedLegPart.name, 187);
      break;
    //-
    case 189:
      rotate(selectedLegPart, selectedLegPart.name, 189);
      break;
  }
}

//return the selected leg based on the arrow keys pressed
function findLeg(){
  if (front && left && !right && !rear)
    return scene.getObjectByName("fLLeg");
  else if (front && right && !left && !rear)
    return scene.getObjectByName("fRLeg");
  else if (rear && left && !right && !front)
    return scene.getObjectByName("rLLeg");
  else if (rear && right && !front && !left)
    return scene.getObjectByName("rRLeg");
  return null;
}

//return a specific leg part based on a keycode
function findLegPart(leg, keyCode) {
  //key "h", return "hip", first children of the leg
  if (keyCode == 72)
    return leg.children[0];
  //key "k", return "knee", third children of the leg
  else if (keyCode == 75)
    return leg.children[0].children[0].children[0];
  //key "a", return "ankle", fifth children of the leg
  else if (keyCode == 65)
    return leg.children[0].children[0].children[0].children[0].children[0];
  return null;
}

//create a turtle
function createTurtle(turtleMaterial, eyeMaterial){
  //0.43, 0, 0.75,
  fRLeg = createLeg(turtleMaterial);
  fRLeg.position.x = Math.cos(Math.PI / 6) * Math.cos(Math.PI / 3);
  fRLeg.position.z = Math.cos(Math.PI / 6) * Math.sin(Math.PI / 3);
  fRLeg.rotation.y = -Math.PI / 3;
  fRLeg.name = "fRLeg";

  //0.43, 0, -0.75,
  fLLeg = createLeg(turtleMaterial);
  fLLeg.position.x = Math.cos(Math.PI / 6) * Math.cos(Math.PI / 3);
  fLLeg.position.z = -Math.cos(Math.PI / 6) * Math.sin(Math.PI / 3);
  fLLeg.rotation.y = Math.PI / 3;
  fLLeg.name = "fLLeg";

  //-0.43, 0, -0.75,
  rLLeg = createLeg(turtleMaterial);
  rLLeg.rotation.y = (Math.PI / 3) * 2;
  rLLeg.position.x = -Math.cos(Math.PI / 6) * Math.cos(Math.PI / 3);
  rLLeg.position.z = -Math.cos(Math.PI / 6) * Math.sin(Math.PI / 3);
  rLLeg.name = "rLLeg";

  //-0.43, 0, 0.75,
  rRLeg = createLeg(turtleMaterial);
  rRLeg.position.x = -Math.cos(Math.PI / 6) * Math.cos(Math.PI / 3);
  rRLeg.position.z = Math.cos(Math.PI / 6) * Math.sin(Math.PI / 3);
  rRLeg.rotation.y = -(Math.PI / 3) * 2;
  rRLeg.name = "rRLeg";

  head = createHead(turtleMaterial, eyeMaterial);
  head.position.x = Math.cos(Math.PI / 6);
  head.name = "neck";

  tail = createTail(turtleMaterial);
  tail.position.x = -Math.cos(Math.PI / 6);
  tail.name = "tail";

  var bodyMaterial = new THREE.MeshPhongMaterial({
		flatShading: true
	});

  body = createBody(bodyMaterial);
  bodyAxes = createAxes(2);
  var turtle = new THREE.Object3D();

  turtle.add(fRLeg);
  turtle.add(fLLeg);
  turtle.add(rLLeg);
  turtle.add(rRLeg);
  turtle.add(head);
  turtle.add(tail);
  turtle.add(body);
  turtle.add(bodyAxes);

  return turtle;
}

//create the turtle tail
function createTail(material) {
  var geometry = new THREE.Geometry();
  var p0 = new THREE.Vector3(0, -0.15, 0);
  var p1 = new THREE.Vector3(0, 0, 0.15);
  var p2 = new THREE.Vector3(-0.5, 0, 0);
  var p3 = new THREE.Vector3(0, 0, -0.15);
  geometry.vertices.push(p0);
  geometry.vertices.push(p1);
  geometry.vertices.push(p2);
  geometry.vertices.push(p3);
  geometry.faces.push(new THREE.Face3(3, 2, 1));
  geometry.faces.push(new THREE.Face3(1, 2, 0));
  geometry.faces.push(new THREE.Face3(3, 0, 2));
  geometry.faces.push(new THREE.Face3(1, 0, 3));
  var a = new THREE.MeshPhongMaterial({color: 0xff9966});
  var tail = new THREE.Mesh(geometry, a);

  var tailJoint = new THREE.Object3D();

  tailJoint.name = "tail;"
//  tailJoint.position.set(x, y, z);
  var axes = createAxes(0.5);

  tailJoint.add(axes);
  tailJoint.add(tail);

  return tailJoint;
}

function createHead(material, material1) {
  var neck = new THREE.Object3D();
  var head = createAxes(0.5);
  head.name = "headAxes";
  head.position.x = 0.5;
  neck.add(head);

  headOct = createOctahedron(material);
  headOct.position.x = 0.5;
  head.add(headOct);

  var eye1 = createOctahedron(material1);
  var eye2 = createOctahedron(material1);
  eye1.name = "eye1";
  eye2.name = "eye2";
  eye1.position.x += 0.2;
  eye1.position.y += 0.1;
  eye1.position.z += 0.15;
  eye1.scale.x = 0.2;
  eye1.scale.z = 0.3;
  eye1.scale.y = 0.3;

  eye2.position.x += 0.2;
  eye2.position.y += 0.1;
  eye2.position.z -= 0.15;
  eye2.scale.x = 0.2;
  eye2.scale.z = 0.3;
  eye2.scale.y = 0.3;

  headOct.add(eye1);
  headOct.add(eye2);

  return head;
}

function createLeg(material) {
  var hip = new THREE.Object3D();
  var hipJoint = createAxes(0.5);
  hipJoint.name = "hip";
  hip.add(hipJoint);

  var upLeg = createOctahedron(material);
  upLeg.position.x = 0.5;
  var upLegAxes = createAxes(0.5);
  hipJoint.add(upLeg);

  var knee = createAxes(0.5);
  knee.name = "knee";
  knee.position.x = 0.5;
  knee.rotation.z = -Math.PI / 4;
  upLeg.add(knee);

  var lowLeg = createOctahedron(material);
  lowLeg.position.x = 0.5;
  var lowLegAxes = createAxes(0.5);
  knee.add(lowLeg);

  var ankle = createAxes(0.5);
  ankle.name = "ankle";
  ankle.position.x = 0.5;
  ankle.rotation.z = -Math.PI / 4;
  lowLeg.add(ankle);

  var feet = createOctahedron(material);
  feet.position.x = 0.5;
  ankle.add(feet);

  return hip;
}


function createOctahedron(material){
  var geometry = new THREE.Geometry();
  var p0 = new THREE.Vector3(0, 0.3, 0);
  var p1 = new THREE.Vector3(0, 0, -0.3);
  var p2 = new THREE.Vector3(0.5, 0, 0);
  var p3 = new THREE.Vector3(0, 0, 0.3);
  var p4 = new THREE.Vector3(-0.5, 0, 0);
  var p5 = new THREE.Vector3(0, -0.3, 0);
  geometry.vertices.push(p0);
  geometry.vertices.push(p1);
  geometry.vertices.push(p2);
  geometry.vertices.push(p3);
  geometry.vertices.push(p4);
  geometry.vertices.push(p5);
  geometry.faces.push(new THREE.Face3(2, 1, 0));
  geometry.faces.push(new THREE.Face3(3, 2, 0));
  geometry.faces.push(new THREE.Face3(4, 3, 0));
  geometry.faces.push(new THREE.Face3(1, 4, 0));
  geometry.faces.push(new THREE.Face3(1, 2, 5));
  geometry.faces.push(new THREE.Face3(2, 3, 5));
  geometry.faces.push(new THREE.Face3(3, 4, 5));
  geometry.faces.push(new THREE.Face3(4, 1, 5));


  var octahedron = new THREE.Mesh(geometry, material);
  return octahedron;
}

function createBody(material){
  var geometry = new THREE.Geometry();
  var a = Math.sin(Math.PI / 6);
  var b = Math.sin(Math.PI / 3);
  var p0 = new THREE.Vector3(0, a, 0);
  var p1 = new THREE.Vector3(b, 0, a);
  var p2 = new THREE.Vector3(0, 0, 1);
  var p3 = new THREE.Vector3(-b, 0, a);
  var p4 = new THREE.Vector3(-b, 0, -a);
  var p5 = new THREE.Vector3(0, 0, -1);
  var p6 = new THREE.Vector3(b, 0, -a);
  var p7 = new THREE.Vector3(0, -a, 0);
  geometry.vertices.push(p0);
  geometry.vertices.push(p1);
  geometry.vertices.push(p2);
  geometry.vertices.push(p3);
  geometry.vertices.push(p4);
  geometry.vertices.push(p5);
  geometry.vertices.push(p6);
  geometry.vertices.push(p7);

  geometry.faces.push(new THREE.Face3(0, 2, 1));
  geometry.faces.push(new THREE.Face3(0, 3, 2));
  geometry.faces.push(new THREE.Face3(0, 4, 3));
  geometry.faces.push(new THREE.Face3(0, 5, 4));
  geometry.faces.push(new THREE.Face3(0, 6, 5));
  geometry.faces.push(new THREE.Face3(0, 1, 6));
  geometry.faces.push(new THREE.Face3(7, 1, 2));
  geometry.faces.push(new THREE.Face3(7, 2, 3));
  geometry.faces.push(new THREE.Face3(7, 3, 4));
  geometry.faces.push(new THREE.Face3(7, 4, 5));
  geometry.faces.push(new THREE.Face3(7, 5, 6));
  geometry.faces.push(new THREE.Face3(7, 6, 1));

  var UVs = [
      new THREE.Vector2(0.5, 0.5),
      new THREE.Vector2(0.25, 0.063),
      new THREE.Vector2(0.5, 0.063)];

  for (var i = 0; i < 12; i++) {
    geometry.faceVertexUvs[0].push([UVs[0], UVs[1], UVs[2]]);

  }
  var object = new THREE.Mesh(geometry, material);
  var loader = new THREE.TextureLoader();
  var texture = loader.load("./shell-tex1.png");
  object.material.map = texture;

  var body = new THREE.Mesh(geometry, material);
  return body;
}

function createAxes(length){
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(length, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, length, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, length));
  geometry.colors.push(new THREE.Color(0xff0000));
  geometry.colors.push(new THREE.Color(0xff0000));
  geometry.colors.push(new THREE.Color(0x00ff00));
  geometry.colors.push(new THREE.Color(0x00ff00));
  geometry.colors.push(new THREE.Color(0x0000ff));
  geometry.colors.push(new THREE.Color(0x0000ff));

  var material = new THREE.LineBasicMaterial();
  material.vertexColors = THREE.VertexColors;

  var axes = new THREE.LineSegments(geometry, material);
  axes.name = "axes";

  return axes;
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    render();
    requestAnimationFrame(animate);
    controls.update();
}

var showAxes = true;
function toggleAxes() {
  scene.traverse(function(node) {
    if (node.name == "axes" ||
        node.name == "hip" || node.name == "knee" ||
        node.name == "ankle" || node.name == "neck") {
      node.material.visible = !showAxes;
    }
  });
  showAxes = !showAxes;
}

var isShowingWirefram = false;
function toggleWireframe() {
  scene.traverse(function(node) {
    if (node instanceof THREE.Mesh) {
      node.material.wireframe = !isShowingWirefram;
    }
  });
  isShowingWirefram = !isShowingWirefram;
  render();
}
