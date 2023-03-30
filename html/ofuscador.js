const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');
const { PythonShell } = require('python-shell');

const ofuscarJS = (nome_arquivo, nome_arquivo_ofuscado) => {
  const codigo = fs.readFileSync(nome_arquivo, 'utf8');
  const codigo_ofuscado = JavaScriptObfuscator.obfuscate(codigo, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    shuffleStringArray: true,
    splitStrings: true,
    stringArray: true,
    stringArrayEncoding: 'base64',
    stringArrayThreshold: 1,
    unicodeEscapeSequence: true,
  }).getObfuscatedCode();
  fs.writeFileSync(nome_arquivo_ofuscado, codigo_ofuscado, 'utf8');
};

const ofuscarPy = (nome_arquivo, nome_arquivo_ofuscado) => {
  const opcoes_python = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: '',
    args: [nome_arquivo, nome_arquivo_ofuscado]
  };
  PythonShell.run('ofuscador.py', opcoes_python, (err, results) => {
    if (err) throw err;
  });
};

const ofuscarArquivo = (nome_arquivo, nome_arquivo_ofuscado) => {
  const extensao = nome_arquivo.split('.').pop();
  switch (extensao) {
    case 'js':
      ofuscarJS(nome_arquivo, nome_arquivo_ofuscado);
      console.log('Arquivo ofuscado com sucesso. Salvo em', nome_arquivo_ofuscado);
      break;
    case 'py':
    case 'lua':
      ofuscarPy(nome_arquivo, nome_arquivo_ofuscado);
      console.log('Arquivo ofuscado com sucesso. Salvo em', nome_arquivo_ofuscado);
      break;
    default:
      console.log('Erro: formato de arquivo não suportado.');
  }
};

const nome_arquivo = process.argv[2];
const nome_arquivo_ofuscado = process.argv[3];
if (nome_arquivo && nome_arquivo_ofuscado) {
  if (fs.existsSync(nome_arquivo)) {
    ofuscarArquivo(nome_arquivo, nome_arquivo_ofuscado);
  } else {
    console.log('Erro: arquivo não encontrado.');
  }
} else {
  console.log('Erro: o nome do arquivo ou o nome do arquivo ofuscado não foi especificado.');
}
