import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { bancoDados } from '../config/firebaseConfig';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

export default function TelaProdutos({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Buscar produtos em tempo real do Firestore
  useEffect(() => {
    const produtosRef = collection(bancoDados, 'produtos');
    const desinscrever = onSnapshot(produtosRef, (querySnapshot) => {
      const lista = [];
      querySnapshot.forEach((docSnap) => {
        lista.push({ id: docSnap.id, ...docSnap.data() });
      });
      setProdutos(lista);
      setCarregando(false);
    }, (erro) => {
      console.error("Erro ao buscar produtos:", erro);
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
      setCarregando(false);
    });

    return desinscrever;
  }, []);

  // Popular com produtos padrão se estiver vazio
  const popularProdutosPadrao = async () => {
    setCarregando(true);
    try {
      const produtosRef = collection(bancoDados, 'produtos');
      const produtosExemplo = [
        {
          Produto: 'Smartphone Quantum X',
          Preço: '1599.90',
          Descrição: 'Smartphone com tela AMOLED de 6.7 polegadas, 128GB de armazenamento e câmera quádrupla de 64MP.',
          Foto: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          Foto2: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60',
          Foto3: 'https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=500&auto=format&fit=crop&q=60',
          ValorNormal: '1999.90',
          ValorDesconto: '400.00',
          Desconto: '20%',
        },
        {
          Produto: 'Notebook Gamer Pro',
          Preço: '4599.00',
          Descrição: 'Processador de última geração, 16GB RAM, SSD 512GB e placa de vídeo dedicada de 4GB.',
          Foto: 'https://images.unsplash.com/photo-1496181130204-755241544e3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          Foto2: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60',
          Foto3: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60',
          ValorNormal: '5499.00',
          ValorDesconto: '900.00',
          Desconto: '16%',
        },
        {
          Produto: 'Fone Noise Cancelling',
          Preço: '299.90',
          Descrição: 'Fones de ouvido over-ear sem fio com cancelamento de ruído ativo e bateria de 40 horas.',
          Foto: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          Foto2: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60',
          Foto3: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format&fit=crop&q=60',
          ValorNormal: '499.90',
          ValorDesconto: '200.00',
          Desconto: '40%',
        },
        {
          Produto: 'Smartwatch Sport Fit',
          Preço: '189.90',
          Descrição: 'Monitor de ritmo cardíaco, GPS integrado, resistente à água e múltiplos modos esportivos.',
          Foto: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          Foto2: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60',
          Foto3: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60',
          ValorNormal: '269.90',
          ValorDesconto: '80.00',
          Desconto: '30%',
        }
      ];

      for (const prod of produtosExemplo) {
        await addDoc(produtosRef, prod);
      }
      Alert.alert('Sucesso', 'Produtos padrão criados no Firestore para demonstração!');
    } catch (erro) {
      console.error("Erro ao popular produtos:", erro);
      Alert.alert('Erro', 'Falha ao gerar produtos padrão.');
    } finally {
      setCarregando(false);
    }
  };

  const comprarProduto = (produto) => {
    Alert.alert(
      'Compra Realizada!',
      `Parabéns! Você iniciou a compra de:\n\n🛍️ ${produto.Produto}\n💰 Valor: ${formatarMoeda(produto.Preço)}\n\nNossa equipe entrará em contato!`,
      [{ text: 'OK' }]
    );
  };

  const formatarMoeda = (valor) => {
    if (!valor) return 'R$ 0,00';
    const num = parseFloat(valor.toString().replace(',', '.'));
    if (isNaN(num)) return `R$ ${valor}`;
    return `R$ ${num.toFixed(2).replace('.', ',')}`;
  };

  const renderItem = ({ item }) => {
    // Calcular desconto percentual se não estiver preenchido mas termos ValorNormal e Preço
    let descontoTexto = item.Desconto;
    if (!descontoTexto && item.ValorNormal && item.Preço) {
      const normal = parseFloat(item.ValorNormal.toString().replace(',', '.'));
      const preco = parseFloat(item.Preço.toString().replace(',', '.'));
      if (!isNaN(normal) && !isNaN(preco) && normal > preco) {
        const perc = Math.round(((normal - preco) / normal) * 100);
        descontoTexto = `${perc}%`;
      }
    }

    return (
      <View style={estilos.card}>
        {/* Badge de desconto no topo direito */}
        {descontoTexto ? (
          <View style={estilos.badgeDesconto}>
            <Text style={estilos.textoBadgeDesconto}>{descontoTexto} OFF</Text>
          </View>
        ) : null}

        <TouchableOpacity onPress={() => navigation.navigate('DetalheProduto', { produto: item })}>
          <Image source={{ uri: item.Foto }} style={estilos.imagemProduto} />
        </TouchableOpacity>
        
        <View style={estilos.infoContainer}>
          <Text numberOfLines={2} style={estilos.nomeProduto}>{item.Produto}</Text>
          
          {item.Descrição ? (
            <Text numberOfLines={1} style={estilos.descricaoProduto}>{item.Descrição}</Text>
          ) : null}

          <View style={estilos.precosContainer}>
            {item.ValorNormal ? (
              <Text style={estilos.precoNormal}>{formatarMoeda(item.ValorNormal)}</Text>
            ) : null}
            
            <Text style={estilos.precoVenda}>{formatarMoeda(item.Preço)}</Text>

            {item.ValorDesconto ? (
              <Text style={estilos.valorDescontoDescricao}>
                Economize {formatarMoeda(item.ValorDesconto)}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity style={estilos.botaoComprar} onPress={() => comprarProduto(item)}>
            <Text style={estilos.textoBotaoComprar}>🛒 Comprar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <Text style={estilos.subtitulo}>
          {produtos.length} {produtos.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
        </Text>
      </View>

      {carregando ? (
        <View style={estilos.centralizado}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={estilos.textoCarregando}>Carregando produtos...</Text>
        </View>
      ) : produtos.length === 0 ? (
        <View style={estilos.semProdutos}>
          <Text style={estilos.textoSemProdutos}>Nenhum produto cadastrado no Firestore.</Text>
          <TouchableOpacity style={estilos.botaoPopular} onPress={popularProdutosPadrao}>
            <Text style={estilos.textoBotaoPopular}>✨ Gerar Produtos de Exemplo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={estilos.linhaGrid}
          contentContainerStyle={estilos.lista}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  subtitulo: {
    fontSize: 14,
    color: '#657786',
    fontWeight: '600',
  },
  centralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textoCarregando: {
    marginTop: 10,
    color: '#657786',
    fontSize: 14,
  },
  semProdutos: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  textoSemProdutos: {
    fontSize: 16,
    color: '#657786',
    textAlign: 'center',
    marginBottom: 20,
  },
  botaoPopular: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textoBotaoPopular: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  lista: {
    padding: 8,
  },
  linhaGrid: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e1e8ed',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    position: 'relative',
  },
  badgeDesconto: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: '#e0245e',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  textoBadgeDesconto: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  imagemProduto: {
    width: '100%',
    height: 140,
    backgroundColor: '#f8f9fa',
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  nomeProduto: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#14171a',
    marginBottom: 4,
    lineHeight: 18,
  },
  descricaoProduto: {
    fontSize: 12,
    color: '#657786',
    marginBottom: 8,
  },
  precosContainer: {
    marginBottom: 10,
  },
  precoNormal: {
    fontSize: 12,
    color: '#657786',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  precoVenda: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  valorDescontoDescricao: {
    fontSize: 10,
    color: '#28a745',
    fontWeight: '600',
    marginTop: 2,
  },
  botaoComprar: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  textoBotaoComprar: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});