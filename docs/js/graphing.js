let bitCount = n => {
  var r = 0;

  while (n) n >>>= 1, r++;

  return r;
}

//Aqui se indica cuales seran los simbolos de cada operación
let isOperator = c => {
  switch (c) {
    case 'U':
    case '-':
    case '^':
    case "'":
    case '(':
    case ')':
    case '#':
      return true;
  }
  return false;
}

let pre = x => {
  switch (x) {
    case '-':
      return 1;
    case 'U':
      return 2;
    case '^':
      return 3;
    case "'":
      return 5;
  }

  return Infinity;
}

let precedencia = (x, y) => pre(x) - pre(y);

let setUniverse = n => {
  var sets = [0, 0, 0, 0, 0, 1, 0];

  switch (n) {
    case 2:
      sets[0] = 10; // 1010
      sets[1] = 6;  //  110
      sets[6] = 15; // 1111
      break;

    case 3:
      sets[0] = 150; // 10010110
      sets[1] = 90;  //  1011010
      sets[2] = 46;  //   101110
      sets[6] = 255; // 11111111
      break;

    case 4:
      sets[0] = 36410;  // 1000111000111010
      sets[1] = 18870;  //  100100110110110
      sets[2] = 9582;   //   10010101101110
      sets[3] = 4830;   //    1001011011110
      sets[6] = 65535;  // 1111111111111111
      break;

    case 5:
      sets[0] = 2273441914; // 10000111100000011111100001111010
      sets[1] = 1148307318; //  1000100011100011100011101110110
      sets[2] = 575485678;  //   100010010011010011011011101110
      sets[3] = 288009694;  //    10001001010101010110111011110
      sets[4] = 144071614;  //     1000100101100101101110111110
      sets[6] = 4294967295; // 11111111111111111111111111111111
      break;
  }

  return sets;
}

let toPost = infix => {
  let post = '';
  let pila = new Array(200);
  let ptr = 0;

  for (var i = 0; i < infix.length; ++i) {
    var c = infix.charAt(i);
    console.log(c)
    if (!isOperator(c))
      post += c

    else if (c === '(')
      pila[++ptr] = c;

    else if (c === ')') {
      while (pila[ptr] !== '(' && ptr > 0)
        post += pila[ptr--];

      if (pila[ptr] === '(')
        ptr--;
    }

    else {
      let v = precedencia(c, pila[ptr]);
      while (precedencia(c, pila[ptr]) <= 0 && pila[ptr] !== '(' && ptr > 0)
        post += pila[ptr--];

      pila[++ptr] = c;
    }
  }

  while (ptr > 0)
    post += pila[ptr--];

  return post;
}

let myuniver = () => {
  var conjuntoU = []
  var uni = document.getElementById('univ').value;
  var words = uni.split(",");
  conjuntoU.concat(words);
  return conjuntoU
}

let union = (a, b) => a | b;

let intersection = (a, b) => a & b;


let substraction = (a, b) => a ^ b & a;
let complement = (a, u) => substraction(u, a);


let diferencia = (a, b) => substraction(a,b) | substraction(b,a);

let evaluate = (postfix, n) => {
  var sets = setUniverse(n);
  var universe = sets[6];
  var pila = new Array(200);
  var j = -1;

  for (var i = 0; i < postfix.length; ++i) {
    var c = postfix.charAt(i);

    if (isOperator(c)) {
      switch (c) {
        case 'U':
          pila[j - 1] = union(pila[j - 1], pila[j]);
          j--;
          break;

        case '-':
          pila[j - 1] = substraction(pila[j - 1], pila[j]);
          j--;
          break;

        case '^':
          pila[j - 1] = intersection(pila[j - 1], pila[j]);
          j--;
          break;

        case "'":
          pila[j-1] = complement(pila[j-1], universe);
          j--;
          break;

        case "#":
          pila[j] = diferencia(pila[j-1], pila[j]);
          break;
      }

      continue;
    }

    switch (c) {
      case 'A': case 'a':
        pila[++j] = sets[0];
        break;

      case 'B': case 'b':
        pila[++j] = sets[1];
        break;

      case 'C': case 'c':
        pila[++j] = sets[2];
        break;

      case 'D': case 'd':
        pila[++j] = sets[3];
        break;

      case 'E': case 'e':
        pila[++j] = sets[4];
        break;

      case 'S': case 's':
        pila[++j] = sets[5];
        break;

      case 'Ω': case 'O':
        pila[++j] = sets[6];
        break;

      case '∅': case '0': case 'Ø':
        pila[++j] = 0;
        break;

      default:
        throw "Símbolo desconocido: " + c;
    }
  }

  let r = [], l = bitCount(universe);
  for (var i = l - 1; i >= 0; --i)
    r.push((pila[j] >> i) & 1);
console.log(r)
  return r;
}

let isTerminal = c => {
  switch (c) {
    case 'A': case 'a':
    case 'B': case 'b':
    case 'C': case 'c':
    case 'D': case 'd':
    case 'E': case 'e':
    case 'S': case 's':
    case 'Ω': case 'O':
    case '∅': case '0': case 'Ø':
      return true;
  }
  return false;
}

let prepros = s => {
  s = s.replace(/\s/g, '');
  for (var i = 0; i < s.length - 1; ++i) {
    if (isTerminal(s.charAt(i)) && isTerminal(s.charAt(i + 1))) {
      var left = s.substring(0, i + 1);
      var right = s.substring(i + 1, s.length);

      s = left + '^' + right;
    }
  }

  return s;
}