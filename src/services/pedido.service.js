import PedidoRepository from "../repositories/pedido.repository.js";

async function getPedidos(){
  return await PedidoRepository.getPedidos();
}

async function criarPedido(cliente, valor, produto){
  return await PedidoRepository.criarPedido(cliente, valor, produto);
}

async function atualizarPedido(pedido, cliente, valor, entregue, produto){
  return await PedidoRepository.atualizarPedido(pedido, cliente, valor, entregue, produto);
}

async function atualizarPedidoEntrega(pedido, entregue){
  return await PedidoRepository.atualizarPedidoEntrega(pedido, entregue);
}

async function deletarPedido(id){
  return await PedidoRepository.deletarPedido(id);
}

async function findByIdPedido(id){
  return await PedidoRepository.findByIdPedido(id);
}

async function getPedidosByCustomer(cliente){
  return await PedidoRepository.getPedidosByCustomer(cliente);
}

async function getPedidosByProduct(produto){
  return await PedidoRepository.getPedidosByProduct(produto);
}

async function getPedidosMaisVendidos(){
  return await PedidoRepository.getPedidosMaisVendidos();
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