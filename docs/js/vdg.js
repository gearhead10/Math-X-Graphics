//Aqui se está retornando el número de conjuntos que se seleccionaron
let userSets = () => {
  var s = D.getId('n-sets');
  var n = s.options[s.selectedIndex].value;
  return n === 'auto' ? 0 : Number.parseInt(n);
}


//Esta función se llama en el fron al momento de seleccional el número de conjuntos
//Lo que hace es contruir los campos(input) donde se ingresarán los valores de cada conjunto
let buildElements = () => {
  var n = userSets();

  var row = D.create('div');
  row.className = 'row';

  var uni = D.create('input');
  uni.setAttribute('id', 'univ');
  uni.setAttribute('type', 'text');


  var Unilabel = D.create('label');
  Unilabel.setAttribute('for', 'univ');
  Unilabel.innerHTML = `Conjunto U`;
  for (var i = 0; i < n; ++i) {
    var letter = String.fromCharCode(65 + i);

    div = D.create('div');
    div.className = 'input-field col s12';



    var input = D.create('input');
    input.setAttribute('id', `sett${letter}`);
    input.setAttribute('type', 'text');

    var label = D.create('label');
    label.setAttribute('id', `settLabel${letter}`);
    label.setAttribute('for', `sett${letter}`);
    label.innerHTML = `Conjunto ${letter}`;




    div.appendChild(input);
    div.appendChild(label);
    row.appendChild(div);
  }
  div2 = D.create('div');
  div2.className = 'input-field col s12';
  div2.appendChild(uni);
  div2.appendChild(Unilabel);
  row.appendChild(div2);


  var e = D.getId('elements');

  while (e.firstChild)
    e.removeChild(e.firstChild);

  e.appendChild(row);

}

let toggleElements = () => {
  var v = D.getId("useEl").checked;
  var e = D.getId("elements");

  if (v) {
    e.classList.add('upp');
    buildElements();
  }
  else
    e.classList.remove('upp');
}

let sets = [];

//Esta variable almacena un vector con los nombres de cada operación, pero de los que salen en el modal del diagrama al dar click en el conjunto
let nameSets = [
  ['A-B', 'B-A', 'A^B', 'S'],
  ['A-B-C', 'B-A-C', 'C-B-A', 'A^B-C', 'B^C-A', 'A^C-B', 'A^B^C', 'S'],
  ['A-B-C-D', 'B-A-C-D', 'C-A-B-D', 'D-A-B-C', 'A^B-C-D', 'A^C-B-D', 'A^D-B-C', 'B^C-A-D', 'B^D-A-C', 'C^D-A-B', 'A^B^C-D', 'A^B^D-C', 'A^C^D-B', 'B^C^D-A', 'A^B^C^D', 'S'],
  ['A-B-C-D-E', 'B-A-C-D-E', 'C-A-B-D-E', 'D-A-B-C-E', 'E-A-B-C-D', 'A^B-C-D-E', 'A^C-B-D-E', 'A^D-B-C-E', 'A^E-B-C-D', 'B^C-A-D-E', 'B^D-A-C-E', 'B^E-A-C-D', 'C^D-A-B-E', 'C^E-A-B-D', 'D^E-A-B-C', 'A^B^C-D-E', 'A^B^D-C-E', 'A^B^E-C-D', 'A^C^D-B-E', 'A^C^E-B-D', 'A^D^E-B-C', 'B^C^D-A-E', 'B^C^E-A-D', 'B^D^E-A-C', 'C^D^E-B-A', 'A^B^C^D-E', 'A^B^C^E-D', 'A^B^D^E-C', 'A^C^D^E-B', 'B^C^D^E-A', 'A^B^C^D^E', 'S']
];

let currentDigram = '';

//Está función se llama al momento de dar click en el generar conjunto
let eval = () => {
  var x = D.getId("expression").value;

  try {
    var Univ = D.getId("univ").value;
    var valuesUniverso = Univ.split(",");

    x = prepros(x);
    var n = userSets();
    if (x) {
      D.getId('logo').classList.add('hide');

      var p = toPost(x);
      var e = evaluate(p, n);

      for (var i = 2; i < 6; ++i) {
        var tmp = `sets${i}`;
        if (i === n) {
          D.getId(tmp).classList.remove('hide');
          currentDigram = tmp;
        }
        else {
          D.getId(tmp).classList.add('hide');
        }
      }

      for (var i = 0; i < e.length; ++i) {
        var tmp = `f${n}_${i + 1}`;

        if (e[i])
          D.getId(tmp).classList.add('p');

        else
          D.getId(tmp).classList.remove('p');

      }

      var val = D.getId("useEl").checked;

      if (val) {
        sets = evalElements(n);
        console.log(sets);
        if (sets.length == 0) return;
        n === 2 ? sets[3] = valuesUniverso : '';
        n === 3 ? sets[7] = valuesUniverso : '';
        n === 4 ? sets[15] = valuesUniverso : '';
        n === 5 ? sets[31] = valuesUniverso : '';
        var data = `${x} = {`;
        for (var i = 0; i < e.length; ++i) {
          if (e[i])
            if (sets[i] == '' || sets[i + 1] == undefined) {
              data += ''

            } else {
              data += `${sets[i]},`
            }
        }
        data += `}`

        D.getId('elements-result').innerHTML = data;

      }
    } else {
      D.getId('elements-result').innerHTML = '<span class="icon-warning"></span> Recuerda ingresar la operación';
    }
  } catch (error) {
    D.getId('elements-result').innerHTML = '<span class="icon-warning"></span> Recuerda seleccionar el número de conjuntos';
  }

}

let recalculate = (x, y) => {
  var float = D.getId('float');

  var win = window.innerHeight + window.pageYOffset;

  var left = x - 280 < 15 ? 15 : x - 280;
  var top = y + 30 > win - 130 ? y - 130 : y + 30;

  float.style.left = `${left}px`;
  float.style.top = `${top}px`;
}

let floatState;

let floatClick = function (e) {
  var float = D.getId('float');

  if (!float.classList.contains('show') || this !== floatState)
    recalculate(e.pageX, e.pageY);

  if (this === floatState)
    float.classList.toggle('show');
  else
    float.classList.add('show');
  var content = D.create('div');
  content.className = 'float-content';
  var section = this.id.split(/_/)[1];
  var n = this.id.charAt(1);
  var data = '<div style="margin-left:30px;" class = "row"><div class="col s12">';
  data += `<h1 style="color:black;">${nameSets[n - 2][section - 1]}</h1><p>`;
  data += `${(sets[section - 1] == undefined || sets[section - 1] == '' || sets[section - 1].length == 0) ? 'Sin elementos' : sets[section - 1]}`;
  data += '</p></div></div>';

  content.innerHTML = data;

  while (float.firstChild)
    float.removeChild(float.firstChild);

  float.appendChild(content);

  floatState = this;
}

const outsideClick = e => {
  var float = D.getId('float');

  if (e.target.tagName !== 'path' && !float.contains(e.target))
    float.classList.remove('show');
}

function triggerDownload(imgURI) {
  var evt = new MouseEvent('click', {
    view: window,
    bubbles: false,
    cancelable: true
  });

  var a = document.createElement('a');
  a.setAttribute('download', 'DIAGRAM.png');
  a.setAttribute('href', imgURI);
  a.setAttribute('target', '_blank');

  a.dispatchEvent(evt);
}

let importImage = e => {

  if (currentDigram == '') return;

  var svg = document.getElementById(currentDigram).querySelector('svg');
  var canvas = document.getElementById('canvas');

  var svgSize = svg.viewBox.baseVal;
  canvas.width = 500;
  canvas.height = 500;

  var ctx = canvas.getContext('2d');
  var data = (new XMLSerializer()).serializeToString(svg);

  var DOMURL = window.URL || window.webkitURL || window;

  var img = new Image();
  var svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
  var url = DOMURL.createObjectURL(svgBlob);

  img.onload = function () {
    ctx.drawImage(img, 0, 0, 500, 500);
    DOMURL.revokeObjectURL(url);

    var imgURI = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');

    triggerDownload(imgURI);
  };

  img.src = url;
}

let init = () => {
  var sidenavs = M.Sidenav.init(D.queryAll('.sidenav'));
  var modals = M.Modal.init(D.queryAll('.modal'));
  var selects = M.FormSelect.init(D.queryAll('select'));

  var paths = D.getTags('path');

  for (var i = 0; i < paths.length; ++i)
    if (paths[i].id) paths[i].addEventListener('click', floatClick);

  D.addEventListener('click', outsideClick);
  D.getId('imporSVG').addEventListener('click', importImage);
}

if (D.readyState === 'loading')
  D.addEventListener('DOMContentLoaded', init);
else
  init();