import {readFile, writeFile} from 'fs/promises'

async function getPedidos(){
  const data = await readFile('pedidos.json').then(data => {
    return JSON.parse(data);
  });

  return data;
}

async function save(dados){
  await writeFile('pedidos.json', JSON.stringify(dados)).then(data => {
    return true;
  });
}

async function criarPedido(cliente, valor, produto){
  const base = await getPedidos();

  const newPedido = {
    cliente: cliente,
    valor: parseFloat(valor),
    produto: produto,
    id: parseInt(base.nextId++),
    entregue: false,
    timestamp: new Date(),
  }

  base.pedidos.push(newPedido);

  const response = await save(base);

  return newPedido;
}

async function atualizarPedido(pedido, cliente, valor, entregue, produto){
  const base = await getPedidos();
  
  const pedidoUpdate = {
    cliente: typeof cliente === "undefined" ? pedido.cliente : cliente,
    valor: typeof valor === "undefined" ? pedido.valor : valor,
    entregue: typeof entregue === "undefined" ? pedido.entregue : entregue,
    produto: typeof produto === "undefined" ? pedido.produto : produto,
    timestamp: pedido.timestamp,
    id: pedido.id
  }

  const index = base.pedidos.findIndex(item => item.id === pedido.id);
  base.pedidos.splice(index, 1, pedidoUpdate);

  const response = await save(base);

  return pedidoUpdate;
}

async function atualizarPedidoEntrega(pedido, entregue){
  const base = await getPedidos();

  const pedidoUpdate = {
    cliente: pedido.cliente,
    valor: pedido.valor,
    entregue: typeof entregue === "undefined" ? pedido.entregue : entregue,
    produto: pedido.produto,
    timestamp: pedido.timestamp,
    id: pedido.id
  }

  const index = base.pedidos.findIndex(item => item.id === pedido.id);
  base.pedidos.splice(index, 1, pedidoUpdate);

  const response = await save(base);

  return pedidoUpdate;
}

async function deletarPedido(id){
  const base = await getPedidos();

  const index = base.pedidos.findIndex(item => item.id == id);
  delete base.pedidos[index];
  
  const response = await save(base);

  return true;
}

async function findByIdPedido(id){
  const base = await getPedidos();

  const pedido = base.pedidos.find(item => item.id == id);
  
  return pedido;
}

async function getPedidosByCustomer(cliente){
  const base = await getPedidos();

  const pedidos = base.pedidos.filter(item => item.cliente == cliente && item.entregue === true);

  const totalPedidos = pedidos.reduce((acc, item) => {
    return acc += item.valor;
  }, 0);

  console.log(totalPedidos);
  
  return totalPedidos;
}

async function getPedidosByProduct(produto){
  const base = await getPedidos();

  const pedidos = base.pedidos.filter(item => item.produto == produto && item.entregue === true);

  const totalPedidos = pedidos.reduce((acc, item) => {
    return acc += item.valor;
  }, 0);

  console.log(totalPedidos);
  
  return totalPedidos;
}

async function getPedidosMaisVendidos(){
  const base = await getPedidos();

  function groupBy(arr, key){
    return arr.reduce((hash, obj) => {
      if(obj[key] === undefined) return hash;

      return Object.assign(hash, { [obj[key]]:(hash[obj[key]] || []).concat(obj) })
    }, {})
  }

  const groupArray = groupBy(base.pedidos, "produto");

  console.log(groupArray);
  // const orderByArray = mapArray.sort((a, b) => {
  //   if(a.quantidade < b.quantidade){
  //     return -1;
  //   }
  //   if(a.quantidade > b.quantidade){
  //     return 1;
  //   }

  //   return 0;
  // });
  
  return groupArray;
}

export default {
  getPedidos,
  criarPedido,
  atualizarPedido,
  atualizarPedidoEntrega,
  deletarPedido,
  findByIdPedido,
  getPedidosByCustomer,
  getPedidosByProduct,
  getPedidosMaisVendidos
}