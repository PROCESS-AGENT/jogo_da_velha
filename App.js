// import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles1 from './AppStyle';

export default function App() {
  const [tela, setTela] = useState('menu');
  const [jogadorAtual, setJogadorAtual] = useState('')
  const [tabuleiro, setTabuleiro] = useState([])
  const [nrJogadas, setNrJogadas] = useState(1)

  switch (tela) {
    case 'menu':
      return getTelaMenu()

    case 'tabuleiro':
      return getTabuleiro()

    case 'resultado':
     return getResultado()

    default:
      break;
  }


  function getResultado() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Resultado</Text>
        <TouchableOpacity style={styles.BoxJogador} onPress={() => setTela('menu')} >
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  function iniciarJogo(jogador) {
    setJogadorAtual(jogador)
    setNrJogadas(1)

    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ])

    setTela('tabuleiro')
  }


  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Jogo da velha</Text>
        <Text style={styles.subtitulo}>Selecione o primeiro jogador</Text>
        <View style={styles.inlineItens}>
          <TouchableOpacity style={styles.BoxJogador} onPress={() => iniciarJogo('X')} >
            <Text style={styles.jogadorX}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.BoxJogador} onPress={() => iniciarJogo('O')} >
            <Text style={styles.jogadorO}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function jogar(linha, coluna) {

    //Atribuindo valor para uma referência
    tabuleiro[linha][coluna] = jogadorAtual

    //Persistir no estado gerenciado pelo hook do react
    setTabuleiro([...tabuleiro])

    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X')

    setNrJogadas(nrJogadas + 1)


    console.log(nrJogadas)

    if (nrJogadas === 9) {
      setTela('resultado')
    }

  }

  function getTabuleiro() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Jogo da velha</Text>
        <Text style={styles.subtitulo}>Vez do Jogador - {jogadorAtual}</Text>

        {
          tabuleiro.map((linha, nrLinha) => {
            return (
              <View key={nrLinha} style={styles.inlineItens}>
                {
                  linha.map((coluna, nrColuna) => {
                    return (
                      <TouchableOpacity
                        key={nrColuna}
                        disabled={coluna != ''}
                        style={styles.BoxJogador}
                        onPress={() => jogar(nrLinha, nrColuna)}
                      >
                        <Text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO}>{coluna}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            )
          })
        }
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BoxJogador: {
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333'
  },
  subtitulo: {
    fontSize: 20,
    color: '#555',
    marginTop: 20
  },
  inlineItens: {
    flexDirection: 'row'
  },
  jogadorX: {
    fontSize: 40,
    color: 'blue'

  },
  jogadorO: {
    fontSize: 40,
    color: 'brown'
  }
});