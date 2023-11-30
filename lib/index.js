if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

var container, stats, controls;
var camera, scene, renderer, light;

var clock = new THREE.Clock();

var model = null;
var ground = null;
var groundFlag = false;

var actionFolder = null;
var skinFolder = null;
var cycleControl = null;
var championIndex = 266;
var skinIndex = 0;
var index2name = {};
var name2index = {};
var index2skin = {};
var gui = new dat.GUI();
var options = {
    英雄: "",
    皮肤: "",
    动作: "默认",
    暂停: false,
    提示: "支持键位QWERA"
};

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(100, 200, 700);

    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xa0a0a0);
    // scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

    var textureLoader = new THREE.TextureLoader();
    textureLoader.load('assets/bg.png', function (texture) {
        var material = new THREE.MeshPhongMaterial({
            map: texture,
            // side: THREE.DoubleSide,
            depthWrite: true
        });
        ground = new THREE.Mesh(new THREE.CircleBufferGeometry(300, 100), material);
        ground.rotation.x = - Math.PI / 2;
        ground.receiveShadow = true;
        // scene.add(ground);
    })


    light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 400, 0);
    scene.add(light);

    light = new THREE.SpotLight(0xffffff);
    light.position.set(0, 400, 200);
    light.shadow.camera.far = 5000;
    light.castShadow = true;
    scene.add(light);

    // scene.add( new THREE.CameraHelper( light.shadow.camera ) );

    // var grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
    // grid.material.opacity = 0.2;
    // grid.material.transparent = true;
    // scene.add(grid);
    var textureLoader = new THREE.TextureLoader();

    initGUI();

    $("#loading").show();
    initModel();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 100, 0);
    controls.update();

    window.addEventListener('resize', onWindowResize, false);

    window.addEventListener('keydown', onKeyDown, false);

    stats = new Stats();
    container.appendChild(stats.dom);

}

function onKeyDown(event) {
    if (event.keyCode == 81) {
        model.userData.model.setAnimationOnce('spell1');
    }
    if (event.keyCode == 87) {
        model.userData.model.setAnimationOnce('spell2');
    }
    if (event.keyCode == 69) {
        model.userData.model.setAnimationOnce('spell3');
    }
    if (event.keyCode == 82) {
        model.userData.model.setAnimationOnce('spell4');
    }
    if (event.keyCode == 65) {
        model.userData.model.setAnimationOnce('attack1');
    }
}

function initModel() {
    var loader = new LOLLoader();
    loader.load([championIndex, skinIndex], { static: false }).then(function (object) {
        model = object;
        if (actionFolder) updateGUI(actionFolder, model.userData.animations);
        scene.add(ground);
        groundFlag = true;
        scene.add(object);
        $('#loading').hide();
    }, () => {
        scene.add(ground);
        groundFlag = true;
        $('#loading').hide();
    })
}

function updateGUI(target, list) {
    innerHTMLStr = "";
    if (list.constructor.name == 'Array') {
        for (var i = 0; i < list.length; i++) {
            var str = "<option value='" + list[i] + "'>" + list[i] + "</option>";
            innerHTMLStr += str;
        }
    }

    if (list.constructor.name == 'Object') {
        for (var key in list) {
            var str = "<option value='" + list[key] + "'>" + key + "</option>";
            innerHTMLStr += str;
        }
    }
    if (innerHTMLStr != "") target.domElement.children[0].innerHTML = innerHTMLStr;
}

function initGUI() {

    $.getJSON('./assets/index2name.json', function (data) {
        // load index2name
        $.each(data, function (key, val) {
            index2name[key] = val;
        });
        // load index2skin
        $.getJSON('./assets/index2skin.json', function (data) {
            $.each(data, function (key, val) {
                index2skin[key] = val;
            });
            let sortedIndex = Object.keys(index2name).sort(function(a, b) { return index2name[a].localeCompare(index2name[b]) });
            let names = sortedIndex.map(index => index2name[index]);
            let skins = sortedIndex.map(index => index2skin[index]);

            // have loaded two json
            // init champion
            options['英雄'] = index2name[championIndex.toString()];
            // only need to add once
            gui.add(options, '英雄', names).onChange(function (val) {
                scene.remove(ground);
                groundFlag = false;
                $('#loading').show();
                championIndex = name2index[val];
                updateGUI(skinFolder, index2skin[championIndex.toString()]);
                skinIndex = 0;
                if (model) {
                    scene.remove(model);
                } 
                model = null;
                initModel();
            });

            options['皮肤'] = index2skin[championIndex.toString()][0];

            skinFolder = gui.add(options, '皮肤', index2skin[championIndex.toString()]).onChange(function (val) {
                scene.remove(ground);
                groundFlag = false;
                $('#loading').show();
                for (let i = 0; i < index2skin[championIndex.toString()].length; i++) {
                    if (index2skin[championIndex.toString()][i] == val) {
                        skinIndex = i;
                        break;
                    }
                }
                if (model) {
                    scene.remove(model);
                }
                model = null;
                initModel();
            });
            actionFolder = gui.add(options, '动作', []).onChange(function (val) {
                model.userData.model.setAnimation(val);
            });
            gui.add(options, '暂停').onChange(function (val) {
                model.userData.model.toggleAnimation(val);
            });
            gui.add(options, '提示');
        });
    });


    $.getJSON('./assets/name2index.json', function (data) {
        $.each(data, function (key, val) {
            name2index[key] = val;
        });
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate() {
    requestAnimationFrame(animate);
    var delta = clock.getDelta();
    renderer.render(scene, camera);
    stats.update();
    if (model) model.userData.model.update(clock.getElapsedTime() * 1000);
    if (ground && groundFlag) ground.rotateZ(0.5 * delta);
}
