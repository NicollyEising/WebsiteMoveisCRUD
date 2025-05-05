from bancoDeDados import Session, Usuario, Produtos, Favoritos, Carrinho, CarrinhoItem
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import *
from typing import List
from sqlalchemy.orm import Session as DBSession
from passlib.hash import bcrypt
import jwt
from datetime import datetime, timedelta
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi import status
from sqlalchemy.orm import joinedload




#PS C:\Users\faculdade\Desktop\ecommercePessoal\WebsiteMoveisCRUD> uvicorn api:app --reload 
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ou especifique "http://localhost:3000" para mais segurança
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API está funcionando"}

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"detail": exc.errors()},
    )

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()

# ------------------- PRODUTOS -------------------

@app.on_event("startup")
def adicionar_produtos_iniciais():
    db = Session()
    
    # Verifica se já existem produtos para evitar duplicações
    if not db.query(Produtos).first():
        produtos_base = [
            {
                "produto": "Cadeira Ergonômica Executiva",
                "preco": 789.90,
                "detalhes": "Cadeira ergonômica com encosto ajustável, ideal para escritórios. Revestimento em tela mesh e apoio lombar.",
                "img": "https://images.tcdn.com.br/img/img_prod/1101616/cadeira_ergonomica_relax_presidente_tokyo_para_escritorio_2159_variacao_3677_1_4536d74b142762e2ec01955a0f8db42f.jpg",
                "marca": "Herman Miller",
                "cor": "Preta"
            },
            {
                "produto": "Cadeira Ergonômica Executiva",
                "preco": 789.90,
                "detalhes": "Cadeira com base giratória, ajuste de altura e apoio para os braços. Conforto para longas jornadas de trabalho.",
                "img": "https://a-static.mlcdn.com.br/800x560/cadeira-escritorio-ergonomica-confortavel-reclinavel-tela-mesh-corrige-postura-nr17-top-seat-preta/topseat/13129122566/0ecf34d7e4c73710f9544e8cf2e8118f.jpeg",
                "marca": "Flexform",
                "cor": "Cinza"
            }
        ]
        
        for item in produtos_base:
            for _ in range(5):  # Adiciona 5 de cada produto
                produto = Produtos(**item)
                db.add(produto)
        
        db.commit()
    
    db.close()


@app.post("/produtos", response_model=ProdutoRead)
def criar_produto(prod: ProdutoCreate):
    db = Session()
    novo = Produtos(**prod.dict())
    db.add(novo)
    db.commit()
    db.refresh(novo)
    db.close()
    return novo

@app.get("/produtos", response_model=List[ProdutoRead])
def listar_produtos():
    db = Session()
    data = db.query(Produtos).all()
    db.close()
    return data

@app.get("/produtos/{id}", response_model=ProdutoRead)
def obter_produto(produto_id: int):
    db = Session()
    produto = db.query(Produtos).filter(Produtos.id == produto_id).first()
    db.close()
    if produto is None:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return produto


@app.put("/produtos/{id}", response_model=ProdutoRead)
def atualizar_produto(id: int, prod: ProdutoCreate):
    db = Session()
    p = db.query(Produtos).get(id)
    if not p:
        raise HTTPException(404)
    for k, v in prod.dict().items():
        setattr(p, k, v)
    db.commit()
    db.refresh(p)
    db.close()
    return p

@app.delete("/produtos/{id}")
def deletar_produto(id: int):
    db = Session()
    p = db.query(Produtos).get(id)
    if not p:
        raise HTTPException(404)
    db.delete(p)
    db.commit()
    db.close()
    return {"ok": True}


@app.get("/produtos/busca/", response_model=List[ProdutoSchema])
def buscar_produto_por_nome(nome: str):
    db = Session()
    produtos = db.query(Produtos).filter(Produtos.produto.ilike(f'%{nome}%')).all()
    db.close()
    if not produtos:
        raise HTTPException(status_code=404, detail="Nenhum produto encontrado.")
    return produtos

# ------------------- USUARIOS -------------------

@app.post("/usuarios", response_model=UsuarioRead)
def criar_usuario(usuario: UsuarioCreate):
    db = Session()
    try:
        novo = Usuario(**usuario.dict())
        db.add(novo)
        db.flush()  # Obtém o ID do usuário antes do commit

        # Criar favoritos vazio
        favoritos = Favoritos(usuario_id=novo.id)
        db.add(favoritos)

        # Criar carrinho vazio
        carrinho = Carrinho(usuario_id=novo.id)
        db.add(carrinho)

        db.commit()
        db.refresh(novo)
        return UsuarioRead(id=novo.id, nome=novo.nome, email=novo.email, carrinho=carrinho.id)
    finally:
        db.close()


@app.get("/usuarios/{id}", response_model=UsuarioRead)
def pegar_usuario_por_id(id: int):
    db = Session()
    usuario = db.query(Usuario).filter(Usuario.id == id).first()
    db.close()
    return usuario


@app.get("/usuarios", response_model=List[UsuarioRead])
def listar_usuarios():
    db = Session()
    data = db.query(Usuario).all()
    db.close()
    return data

@app.put("/usuarios/{id}", response_model=UsuarioRead)
def atualizar_usuario(id: int, usuario: UsuarioCreate):
    db = Session()
    u = db.query(Usuario).get(id)
    if not u:
        raise HTTPException(404)
    for k, v in usuario.dict().items():
        setattr(u, k, v)
    db.commit()
    db.refresh(u)
    db.close()
    return u

@app.delete("/usuarios/{id}")
def deletar_usuario(id: int):
    db = Session()
    u = db.query(Usuario).get(id)
    if not u:
        raise HTTPException(404)
    db.delete(u)
    db.commit()
    db.close()
    return {"ok": True}

@app.post("/login")
def login_usuario(data: LoginData, db: DBSession = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.email == data.email).first()
    
    if not usuario or usuario.senha != data.senha:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    
    # Acessa o carrinho do usuário
    carrinho = db.query(Carrinho).filter(Carrinho.usuario_id == usuario.id).first()

    if not carrinho:
        raise HTTPException(status_code=404, detail="Carrinho não encontrado")

    # Gerar um token JWT
    token = jwt.encode(
        {"usuario_id": usuario.id, "exp": datetime.utcnow() + timedelta(hours=1)},
        "secret-key",  # Chave secreta para assinatura do token
        algorithm="HS256"
    )

    return {
        "mensagem": "Login realizado com sucesso",
        "token": token,
        "userId": usuario.id,
        "carrinhoId": carrinho.id  # Passa o ID do carrinho associado ao usuário
    }

# ------------------- FAVORITOS -------------------

@app.post("/favoritos", response_model=FavoritosRead)
def criar_favoritos(data: FavoritosCreate):
    db = Session()
    favoritos = Favoritos(usuario_id=data.usuario_id)
    favoritos.produtos = db.query(Produtos).filter(Produtos.id.in_(data.produtos_ids)).all()
    db.add(favoritos)
    db.commit()
    db.refresh(favoritos)
    db.close()
    return favoritos

@app.get("/favoritos", response_model=List[FavoritosRead])
def listar_favoritos():
    db = Session()
    data = db.query(Favoritos).all()
    db.close()
    return data

@app.delete("/favoritos/{id}")
def deletar_favoritos(id: int):
    db = Session()
    fav = db.query(Favoritos).get(id)
    if not fav:
        raise HTTPException(404)
    db.delete(fav)
    db.commit()
    db.close()
    return {"ok": True}

# ------------------- CARRINHO -------------------

@app.post("/carrinhos", response_model=CarrinhoRead)
def criar_carrinho(carrinho: CarrinhoCreate):
    db = Session()
    novo_carrinho = Carrinho(usuario_id=carrinho.usuario_id)
    db.add(novo_carrinho)
    db.flush()
    for item in carrinho.itens:
        db.add(CarrinhoItem(carrinho_id=novo_carrinho.id, **item.dict()))
    db.commit()
    db.refresh(novo_carrinho)
    db.close()
    return novo_carrinho

@app.get("/carrinhos", response_model=List[CarrinhoRead])
def listar_carrinhos(usuario_id: int, db: DBSession = Depends(get_db)):
    # Carrega os carrinhos do usuário com os itens e os produtos relacionados
    db_carrinhos = db.query(Carrinho).filter(Carrinho.usuario_id == usuario_id).options(
        joinedload(Carrinho.itens).joinedload(CarrinhoItem.produto)  # Carrega os produtos associados aos itens
    ).all()

    if not db_carrinhos:
        raise HTTPException(status_code=404, detail="Carrinho não encontrado para esse usuário.")
    
    # Convertendo os carrinhos e itens para o formato esperado
    return db_carrinhos

@app.delete("/carrinhos/{id}")
def deletar_carrinho(id: int):
    db = Session()
    c = db.query(Carrinho).get(id)
    if not c:
        raise HTTPException(404)
    db.delete(c)
    db.commit()
    db.close()
    return {"ok": True}

@app.post("/carrinhos/{carrinho_id}/itens")
def adicionar_item_ao_carrinho(carrinho_id: int, item: CarrinhoItemCreate, db: DBSession = Depends(get_db)):
    carrinho = db.query(Carrinho).get(carrinho_id)
    if not carrinho:
        raise HTTPException(status_code=404, detail="Carrinho não encontrado.")
    novo_item = CarrinhoItem(carrinho_id=carrinho_id, **item.dict())
    db.add(novo_item)
    db.commit()
    return {"ok": True}


@app.delete("/carrinhos/{carrinho_id}/itens/{item_id}")
def deletar_item_do_carrinho(carrinho_id: int, item_id: int, db: DBSession = Depends(get_db)):
    # Verifica se o carrinho existe
    carrinho = db.query(Carrinho).get(carrinho_id)
    if not carrinho:
        raise HTTPException(status_code=404, detail="Carrinho não encontrado.")
    
    # Verifica se o item existe no carrinho
    item = db.query(CarrinhoItem).filter(CarrinhoItem.id == item_id, CarrinhoItem.carrinho_id == carrinho_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado no carrinho.")
    
    db.delete(item)
    db.commit()
    return {"ok": True}
