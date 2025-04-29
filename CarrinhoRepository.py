from bancoDeDados import Carrinho, CarrinhoItem, Produtos, Session

class CarrinhoRepository:
    def __init__(self):
        self.session = Session()

    def criar_carrinho(self, usuario_id):
        carrinho = Carrinho(usuario_id=usuario_id)
        self.session.add(carrinho)
        self.session.commit()
        return carrinho

    def adicionar_item(self, carrinho_id, produto_id, quantidade):
        item = self.session.query(CarrinhoItem).filter_by(carrinho_id=carrinho_id, produto_id=produto_id).first()
        if item:
            item.quantidade += quantidade
        else:
            item = CarrinhoItem(carrinho_id=carrinho_id, produto_id=produto_id, quantidade=quantidade)
            self.session.add(item)
        self.session.commit()
        return item

    def listar_todos(self):
        return self.session.query(Carrinho).all()

    def remover_item(self, carrinho_id, produto_id):
        item = self.session.query(CarrinhoItem).filter_by(carrinho_id=carrinho_id, produto_id=produto_id).first()
        if item:
            self.session.delete(item)
            self.session.commit()
            return True
        return False

    def deletar_carrinho(self, carrinho_id):
        carrinho = self.session.query(Carrinho).filter_by(id=carrinho_id).first()
        if carrinho:
            self.session.delete(carrinho)
            self.session.commit()
            return True
        return False
