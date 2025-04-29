from bancoDeDados import Favoritos, Produtos, Session

class FavoritoRepository:
    def __init__(self):
        self.session = Session()

    def criar(self, usuario_id, produto_ids):
        favorito = Favoritos(usuario_id=usuario_id)
        produtos = self.session.query(Produtos).filter(Produtos.id.in_(produto_ids)).all()
        favorito.produtos.extend(produtos)
        self.session.add(favorito)
        self.session.commit()
        return favorito

    def listar_todos(self):
        return self.session.query(Favoritos).all()

    def deletar(self, favorito_id):
        favorito = self.session.query(Favoritos).filter_by(id=favorito_id).first()
        if favorito:
            self.session.delete(favorito)
            self.session.commit()
            return True
        return False
