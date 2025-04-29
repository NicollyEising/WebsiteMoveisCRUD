from bancoDeDados import Session, Usuario, Produtos, Favoritos, Carrinho, CarrinhoItem
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import *

#PS C:\Users\faculdade\Desktop\ecommercePessoal\WebsiteMoveisCRUD> uvicorn api:app --reload 
app = FastAPI()

@app.get("/")
def root():
    return {"message": "API está funcionando"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------- PRODUTOS -------------------
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

# ------------------- USUARIOS -------------------
@app.post("/usuarios", response_model=UsuarioRead)
def criar_usuario(usuario: UsuarioCreate):
    db = Session()
    novo = Usuario(**usuario.dict())
    db.add(novo)
    db.commit()
    db.refresh(novo)
    db.close()
    return novo

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
def listar_carrinhos():
    db = Session()
    data = db.query(Carrinho).all()
    db.close()
    return data

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
