let quitRepetitions = array => array.map(set => [...new Set(set)]);;

let joinSet = (a, b) => [...new Set([...new Set(a), ...new Set(b)])];

let diffSet = (a, b) => {
  let x = new Set(a);
  let y = new Set(b);

  let z = new Set([...x].filter(e => !y.has(e)));

  return [...z];
}

let interSet = (sets, n) => {
  let aux = [];
  let sub = 0;

  switch (n) {
    case 2:
      sub = 1;
      break;
    case 3:
      sub = 3;
      break;
    case 4:
      sub = 6;
      break;
    case 5:
      sub = 12;
      break
  }

  for (var i = 0; i < sub; ++i) aux.push([]);

  for (var i = 0; i < n; i++) {
    for (var j = i + 1; j < n; j++) {
      for (var k = 0; k < sets[i].length; k++) {
        for (var h = 0; h < sets[j].length; h++) {

          if (sets[i][k] !== sets[j][h])
            continue;

          if (j == i + 1)
            aux[i].push(sets[i][k]);

          if (j == n - 1 && i == 0 && n > 2)
            aux[j].push(sets[i][k]);

          if (j == i + 2 && n > 3)
            aux[i + n].push(sets[i][k]);

          if ((j == i + 3) && (n == 5))
            aux[i + 2 * n].push(sets[i][k]);

        }
      }
    }
  }
  return aux;
}

let buildPieces = (sets, n) => {
  let aux = interSet(sets, n);
  let r = [];
  let aux1 = [];
  let aux2 = [];

  switch (n) {
    case 2:
      r.push(diffSet(sets[0], aux[0]));
      r.push(diffSet(sets[1], aux[0]));
      r.push(aux[0]);
      break;
    case 3:
      r.push(diffSet(diffSet(sets[0], sets[1]), sets[2]));
      r.push(diffSet(diffSet(sets[1], sets[0]), sets[2]));
      r.push(diffSet(diffSet(sets[2], sets[1]), sets[0]));
      r.push(diffSet(aux[0], sets[2]));
      r.push(diffSet(aux[1], sets[0]));
      r.push(diffSet(aux[2], sets[1]));
      break;
    case 4:
      r.push(diffSet(diffSet(diffSet(sets[0], sets[1]), sets[2]), sets[3]));//1
      r.push(diffSet(diffSet(diffSet(sets[1], sets[0]), sets[2]), sets[3]));//2
      r.push(diffSet(diffSet(diffSet(sets[2], sets[1]), sets[0]), sets[3]));//3
      r.push(diffSet(diffSet(diffSet(sets[3], sets[1]), sets[2]), sets[0]));//4

      r.push((diffSet(diffSet(aux[0], sets[2]), sets[3])));//5
      r.push((diffSet(diffSet(aux[4], sets[1]), sets[3])));//6
      r.push((diffSet(diffSet(aux[3], sets[2]), sets[1])));//7
      r.push((diffSet(diffSet(aux[1], sets[0]), sets[3])));//8
      r.push((diffSet(diffSet(aux[5], sets[0]), sets[2])));//9
      r.push((diffSet(diffSet(aux[2], sets[0]), sets[1])));//10
      r.push((diffSet(diffSet(aux[1], sets[3]), r[7])));//11
      r.push((diffSet(diffSet(aux[3], sets[2]), r[6])));//12
      r.push((diffSet(diffSet(aux[2], sets[1]), r[9])));//13
      r.push((diffSet(diffSet(aux[2], sets[0]), r[9])));//14
      r.push((diffSet(diffSet(diffSet(aux[2], r[12]), r[13]), r[9])));//15
      break;
    case 5:
      r.push(diffSet(diffSet(diffSet(diffSet(sets[0], sets[1]), sets[2]), sets[3]), sets[4]));//1
      r.push(diffSet(diffSet(diffSet(diffSet(sets[1], sets[0]), sets[2]), sets[3]), sets[4]));//2
      r.push(diffSet(diffSet(diffSet(diffSet(sets[2], sets[1]), sets[0]), sets[3]), sets[4]));//3
      r.push(diffSet(diffSet(diffSet(diffSet(sets[3], sets[1]), sets[2]), sets[0]), sets[4]));//4
      r.push(diffSet(diffSet(diffSet(diffSet(sets[4], sets[1]), sets[2]), sets[3]), sets[0]));//5
      r.push(diffSet(diffSet(diffSet(aux[0], sets[2]), sets[3]), sets[4]));//6
      r.push(diffSet(diffSet(diffSet(aux[5], sets[1]), sets[3]), sets[4]));//7
      r.push(diffSet(diffSet(diffSet(aux[10], sets[2]), sets[4]), sets[1]));//8
      r.push(diffSet(diffSet(diffSet(aux[4], sets[2]), sets[3]), sets[1]));//9
      r.push(diffSet(diffSet(diffSet(aux[1], sets[0]), sets[3]), sets[4]));//10
      r.push(diffSet(diffSet(diffSet(aux[6], sets[2]), sets[0]), sets[4]));//11
      r.push(diffSet(diffSet(diffSet(aux[11], sets[2]), sets[3]), sets[0]));//12
      r.push(diffSet(diffSet(diffSet(aux[2], sets[0]), sets[2]), sets[4]));//13 -
      r.push(diffSet(diffSet(diffSet(aux[7], sets[0]), sets[3]), sets[1]));//14
      r.push(diffSet(diffSet(diffSet(aux[3], sets[2]), sets[0]), sets[1]));//15
      r.push(diffSet(diffSet(diffSet(aux[0], sets[4]), sets[3]), r[5]));//16
      r.push(diffSet(diffSet(diffSet(aux[0], sets[2]), sets[4]), r[5]));//17 -
      r.push(diffSet(diffSet(diffSet(aux[0], sets[2]), sets[3]), r[5]));//18
      r.push(diffSet(diffSet(diffSet(aux[5], sets[1]), sets[4]), r[6]));//19
      r.push(diffSet(diffSet(diffSet(aux[5], sets[1]), sets[3]), r[6]));//20
      r.push(diffSet(diffSet(diffSet(aux[10], sets[1]), sets[2]), r[7]));//21
      r.push(diffSet(diffSet(diffSet(aux[1], sets[0]), sets[4]), r[9]));//22
      r.push(diffSet(diffSet(diffSet(aux[1], sets[0]), sets[3]), r[9]));//23
      r.push(diffSet(diffSet(diffSet(aux[6], sets[0]), sets[2]), r[10]));//24
      r.push(diffSet(diffSet(diffSet(aux[2], sets[1]), sets[0]), r[12]));//25
      r.push(diffSet(diffSet(diffSet(diffSet(aux[0], sets[4]), r[15]), r[16]), r[5]));//26
      r.push(diffSet(diffSet(diffSet(diffSet(aux[0], sets[3]), r[15]), r[17]), r[5]));//27
      r.push(diffSet(diffSet(diffSet(diffSet(aux[0], sets[2]), r[15]), r[17]), r[5]));//28
      r.push(diffSet(diffSet(diffSet(diffSet(aux[5], sets[1]), r[18]), r[6]), r[19]));//29
      r.push(diffSet(diffSet(diffSet(diffSet(aux[1], sets[0]), r[21]), r[9]), r[22]));//30
      r.push(diffSet(diffSet(diffSet(diffSet(diffSet(diffSet(diffSet(aux[0], r[16]), r[5]), r[27]), r[17]), r[26]), r[15]), r[25]));//31
      break;
  }

  for (var i = 0; i < r.length; i++)
    aux1 = joinSet(aux1, r[i]);

  for (var i = 0; i < sets.length; i++)
    aux2 = joinSet(aux2, sets[i]);

  r.push(diffSet(aux2, aux1));

  r = quitRepetitions(r);
  r = quitRepetitions(r);

  return r;
}
let evalElements = n => {

  let sets = [];
  let count = 0;

  if (n === 1) {
    var stmp = $(`#settA`).val();
    var words = stmp.split(/\s*,+\s*/);
    words = words.filter(e => e !== '');
    var stmp2 = document.getElementById('univ').value;
    var words2 = stmp2.split(/\s*,+\s*/);
    words2 = words2.filter(e => e !== '');

    if(stmp = '' || stmp == undefined || words.length == 0){
      document.getElementById('elements-result').innerHTML = "Hey hey no ingresaste valores"
    }

    console.log(words)
    console.log(words2)
    
    sets.concat(words)
    sets.push(words2) 

  } else {
    var uniSet = document.getElementById('univ').value;
    var words3 = uniSet.split(/\s*,+\s*/);

    for (var i = 0; i < n; ++i) {
      var letter = String.fromCharCode(65 + i);
      var stmp = $(`#sett${letter}`).val();
      var words = stmp.split(/\s*,+\s*/);
      words = words.filter(e => e !== '');
      console.log(words)
      if (words.length === 0) count++;

      if(stmp = '' || stmp == undefined || words.length == 0 || uniSet == ''){
        document.getElementById('elements-result').innerHTML = "Hey hey no ingresaste valores"
      }else{
        sets.push(words);
      }
      
    }
    sets.push(words3);
    console.log(sets)
  }
  if (count == n) return [];
  console.log(buildPieces(sets, n))
  return buildPieces(sets, n);
}

// let A = ['F','D','C','G','C'];
// let B = ['D','E','D','D','C'];
// let C = ['C','C','C','G','C'];
// let D = ['B','G','A','G','F'];
// let E = ['C','B','F','B','E'];
// let R = buildPieces([A, B, C, D, E], 5);

// console.log(R);