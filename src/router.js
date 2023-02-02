import { Router } from 'express';
import PedidoController from '../src/controllers/pedido.controller.js'

export const routes = Router();

routes.get('/pedidos', PedidoController.getPedidos);
routes.get('/pedidos/cliente', PedidoController.getPedidosByCustomer);
routes.get('/pedidos/produto', PedidoController.getPedidosByProduct);
routes.get('/pedidos/produto/maisvendidos', PedidoController.getPedidosMaisVendidos);
routes.get('/pedidos/:id', PedidoController.findByIdPedido);
routes.post('/pedidos', PedidoController.criarPedido);
routes.patch('/pedidos/:id', PedidoController.atualizarPedido);
routes.patch('/pedidos/:id/entrega', PedidoController.atualizarPedidoEntrega);
routes.delete('/pedidos/:id', PedidoController.deletarPedido);
