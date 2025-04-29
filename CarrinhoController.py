from bancoDeDados import Carrinho, CarrinhoItem, Produtos, Session
from UserController import session

def criar_carrinho(usuario_id):
    novo_carrinho = Carrinho(usuario_id=usuario_id)
    session.add(novo_carrinho)
    session.commit()
    print(f"Carrinho criado para o usuário {usuario_id} com ID {novo_carrinho.id}")

def adicionar_item_carrinho(carrinho_id, produto_id, quantidade):
    item_existente = session.query(CarrinhoItem).filter_by(carrinho_id=carrinho_id, produto_id=produto_id).first()
    if item_existente:
        item_existente.quantidade += quantidade
    else:
        novo_item = CarrinhoItem(carrinho_id=carrinho_id, produto_id=produto_id, quantidade=quantidade)
        session.add(novo_item)
    session.commit()
    print(f"Produto {produto_id} adicionado ao carrinho {carrinho_id}")

def listar_carrinhos():
    carrinhos = session.query(Carrinho).all()
    for carrinho in carrinhos:
        itens = [(item.produto_id, item.quantidade) for item in carrinho.itens]
        print(f"Carrinho ID: {carrinho.id} - Usuário ID: {carrinho.usuario_id} - Itens: {itens}")

def remover_item_carrinho(carrinho_id, produto_id):
    item = session.query(CarrinhoItem).filter_by(carrinho_id=carrinho_id, produto_id=produto_id).first()
    if item:
        session.delete(item)
        session.commit()
        print(f"Produto {produto_id} removido do carrinho {carrinho_id}")
    else:
        print("Item não encontrado no carrinho.")

def deletar_carrinho(carrinho_id):
    carrinho = session.query(Carrinho).filter_by(id=carrinho_id).first()
    if carrinho:
        session.delete(carrinho)
        session.commit()
        print(f"Carrinho deletado: {carrinho_id}")
    else:
        print("Carrinho não encontrado.")
