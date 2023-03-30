import sys
import jsbeautifier
import pyminifier
import luamin
import os


def ofuscar_arquivo(nome_arquivo):
    """
    Ofusca o arquivo especificado e salva o resultado em um novo arquivo com sufixo '_ofuscado' no mesmo diretório.

    :param nome_arquivo: O nome do arquivo a ser ofuscado.
    :type nome_arquivo: str
    """
    # Verifica se o arquivo é .js, .py ou .lua e faz a ofuscação correspondente
    if nome_arquivo.endswith('.js'):
        with open(nome_arquivo, 'r') as arquivo:
            codigo = arquivo.read()
            codigo_ofuscado = jsbeautifier.optimize(codigo)
            nome_arquivo_ofuscado = nome_arquivo[:-3] + '_ofuscado.js'
            with open(nome_arquivo_ofuscado, 'w') as arquivo_ofuscado:
                arquivo_ofuscado.write(codigo_ofuscado)
            print('Arquivo ofuscado com sucesso. Salvo em', nome_arquivo_ofuscado)
    elif nome_arquivo.endswith('.py'):
        with open(nome_arquivo, 'r') as arquivo:
            codigo = arquivo.read()
            codigo_ofuscado = pyminifier.remove_comments_and_docstrings(codigo)
            nome_arquivo_ofuscado = nome_arquivo[:-3] + '_ofuscado.py'
            with open(nome_arquivo_ofuscado, 'w') as arquivo_ofuscado:
                arquivo_ofuscado.write(codigo_ofuscado)
            print('Arquivo ofuscado com sucesso. Salvo em', nome_arquivo_ofuscado)
    elif nome_arquivo.endswith('.lua'):
        with open(nome_arquivo, 'r') as arquivo:
            codigo = arquivo.read()
            codigo_ofuscado = luamin.minify(codigo)
            nome_arquivo_ofuscado = nome_arquivo[:-4] + '_ofuscado.lua'
            with open(nome_arquivo_ofuscado, 'w') as arquivo_ofuscado:
                arquivo_ofuscado.write(codigo_ofuscado)
            print('Arquivo ofuscado com sucesso. Salvo em', nome_arquivo_ofuscado)
    else:
        print('Erro: formato de arquivo não suportado.')


if __name__ == '__main__':
    # Verifica se o nome do arquivo foi passado como argumento na linha de comando
    if len(sys.argv) < 2:
        print('Erro: o nome do arquivo não foi especificado.')
    else:
        nome_arquivo = sys.argv[1]

        # Verifica se o arquivo existe
        if not os.path.exists(nome_arquivo):
            print('Erro: arquivo não encontrado.')
        elif os.path.isdir(nome_arquivo):
            print('Erro: o caminho especificado é um diretório. Especifique um arquivo.')
        else:
            ofuscar_arquivo(nome_arquivo)
