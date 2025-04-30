from bancoDeDados import Produtos, Session
from UserController import session

def criar_produto(produto, preco, detalhes, img):
    novo_produto = Produtos(produto=produto, preco=preco, detalhes=detalhes, img=img)
    session.add(novo_produto)
    session.commit()
    print(f"Produto criado: {novo_produto.id} - {novo_produto.produto}")

def listar_produtos():
    produtos = session.query(Produtos).all()
    for produto in produtos:
        print(f"{produto.id}: {produto.produto} - {produto.preco} - {produto.detalhes} - {produto.img}")

def atualizar_produtos(id_produto, novo_preco, novo_detalhe, novo_produto, nova_imagem):
    produto = session.query(Produtos).filter_by(id=id_produto).first()
    if produto:
        produto.produto = novo_produto
        produto.preco = novo_preco
        produto.detalhes = novo_detalhe
        produto.img = nova_imagem
        session.commit()
        print(f"Produto atualizado: {produto.produto} - {produto.preco} - {produto.detalhes} - {produto.img}")
    else:
        print("Produto não encontrado.")

def deletar_produto(id_produto):
    produto = session.query(Produtos).filter_by(id=id_produto).first()
    if produto:
        session.delete(produto)
        session.commit()
        print(f"Produto deletado: {id_produto}")
    else:
        print("Produto não encontrado.")

def buscar_produto_por_nome(produto):
    produtos = session.query(Produtos).filter(Produtos.produto.like(f'%{produto}%')).all()
    if produtos:
        for produto in produtos:
            print(f"{produto.id}: {produto.produto} - {produto.preco} - {produto.detalhes} - {produto.img}")
    else:
        print(f"Nenhum produto encontrado.")


#criar_produto("Shoes", 190.00 , "sldkfjaskldjflasdjflkjasklfjakld")
#listar_produtos()
#atualizar_produtos(1, 2.00, "nnovodetalhe", "Pencil")
#deletar_produto(1)
#buscar_produto_por_nome("Shoes")