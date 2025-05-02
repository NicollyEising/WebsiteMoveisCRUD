from bancoDeDados import Produtos, Session

class ProdutoRepository:
    def __init__(self):
        self.session = Session()

    def criar(self, nome, preco, detalhes, img, marca, cor):
        produto = Produtos(produto=nome, preco=preco, detalhes=detalhes, img=img, marca=marca, cor=cor)
        self.session.add(produto)
        self.session.commit()
        return produto

    def listar_todos(self):
        return self.session.query(Produtos).all()

    def atualizar(self, id_produto, nome, preco, detalhes, img, marca, cor):
        produto = self.session.query(Produtos).filter_by(id=id_produto).first()
        if produto:
            produto.produto = nome
            produto.preco = preco
            produto.detalhes = detalhes
            produto.img = img
            produto.marca = marca
            produto.cor = cor
            self.session.commit()
        return produto

    def deletar(self, id_produto):
        produto = self.session.query(Produtos).filter_by(id=id_produto).first()
        if produto:
            self.session.delete(produto)
            self.session.commit()
            return True
        return False

    def buscar_por_nome(self, nome):
        return self.session.query(Produtos).filter(Produtos.produto.like(f"%{nome}%")).all()
