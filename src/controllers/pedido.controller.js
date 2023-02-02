import PedidosService from '../services/pedido.service.js'

async function getPedidos(req, res, next){
  const pedidos = await getAllPedidos();

  res.json(pedidos);
}

async function getAllPedidos(){
  const base = await PedidosService.getPedidos();

  return base;
}

async function criarPedido(req, res, next){
  try{
    const {cliente, produto, valor} = req.body;
  
    if(!cliente){
      throw new Error('Informe o cliente');
    }else if(!produto){
      throw new Error('Informe o produto');
    }else if(!valor){
      throw new Error('Informe o valor');
    }

    const novoPedido = await PedidosService.criarPedido(cliente, valor, produto);

    return res.json({ pedido: novoPedido });

  }catch(err){
    next(err);
  }
  
}

async function atualizarPedido(req, res, next){
  try {

    const id = req.params.id;
    const {cliente, valor, entregue, produto} = req.body;
    const base = await getAllPedidos();
    const pedido = base.pedidos.find(item => item.id == id);

    if(pedido.length === 0){
      throw new Error('Pedido não existe');
    }

    const updatePedido = await PedidosService.atualizarPedido(pedido, cliente, valor, entregue, produto);

    return res.json({ pedido: updatePedido});

  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function atualizarPedidoEntrega(req, res, next) {
  try {

    const base = await getAllPedidos();
    const {entregue} = req.body;
    const id = req.params.id;
    const pedido = base.pedidos.find(item => item.id == id);

    if(!entregue){
      throw new Error('Informe o status da entrega');
    }
    if(pedido.length === 0){
      throw new Error('Pedido não existe');
    }


    const updatedPedido = await PedidosService.atualizarPedidoEntrega(pedido, entregue);

    return res.json({ pedido: updatedPedido});

  } catch (error) {
    next(error);
  }

}

async function deletarPedido(req, res, next){
  try {

    const id = req.params.id;
    const base = await getAllPedidos();
    
    const response = await PedidosService.deletarPedido(id);

    return res.json({ message: 'deletado com sucesso' });

  } catch (error) {
    next(error);
  }
}

async function findByIdPedido(req, res, next){

  try {
    const id = req.params.id;
      
    const pedido = await PedidosService.findByIdPedido(id);

    return res.json({ pedido });
  } catch (error) {
    next(error);
  }
  
}

async function getPedidosByCustomer(req, res, next){

  try {
    const cliente = req.body.cliente;
    
    if(!cliente) throw new Error("informe o cliente");

    const total = await PedidosService.getPedidosByCustomer(cliente);

    return res.json({ total });
  } catch (error) {
    next(error);
  }

}

async function getPedidosByProduct(req, res, next){

  try {
    const produto = req.body.produto;
    
    if(!produto) throw new Error("informe o produto");

    const total = await PedidosService.getPedidosByProduct(produto);

    return res.json({ total });
  } catch (error) {
    next(error);
  }

}

async function getPedidosMaisVendidos(req, res, next){
    
    const maisVendidos = await PedidosService.getPedidosMaisVendidos();

    return res.json({ maisVendidos });

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