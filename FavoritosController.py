from bancoDeDados import Favoritos, Produtos, Session
from UserController import session

def criar_favorito(usuario_id, lista_produto_ids):
    novo_favorito = Favoritos(usuario_id=usuario_id)
    produtos = session.query(Produtos).filter(Produtos.id.in_(lista_produto_ids)).all()
    novo_favorito.produtos.extend(produtos)
    session.add(novo_favorito)
    session.commit()
    print(f"Favorito criado para o usuário {usuario_id} com os produtos {[p.id for p in produtos]}")

def listar_favoritos():
    favoritos = session.query(Favoritos).all()
    for favorito in favoritos:
        produtos_ids = [produto.id for produto in favorito.produtos]
        print(f"Favorito ID: {favorito.id} - Usuário ID: {favorito.usuario_id} - Produtos: {produtos_ids}")

def deletar_favorito(favorito_id):
    favorito = session.query(Favoritos).filter_by(id=favorito_id).first()
    if favorito:
        session.delete(favorito)
        session.commit()
        print(f"Favorito deletado: {favorito_id}")
    else:
        print("Favorito não encontrado.")
