from pydantic import BaseModel
from typing import List, Optional


# -------- Produtos --------
class ProdutoBase(BaseModel):
    produto: str
    preco: float
    detalhes: Optional[str]
    img: str
    id: int 
    marca: str
    cor: str

class ProdutoCreate(ProdutoBase):
    pass

class ProdutoRead(ProdutoBase):
    id: int
    class Config:
        orm_mode = True

class ProdutoSchema(BaseModel):
    produto: str
    preco: float
    detalhes: Optional[str]
    img: str
    id: int 
    marca: str
    cor: str

    class Config:
        orm_mode = True

class ProdutoRead(BaseModel):
    produto: str
    preco: float
    detalhes: Optional[str]
    img: str
    id: int

    class Config:
        orm_mode = True

# -------- Usuario --------
class UsuarioBase(BaseModel):
    nome: str
    email: str
    senha: str

class UsuarioCreate(UsuarioBase):
    pass

class UsuarioRead(BaseModel):
    id: int
    nome: str
    email: str
    class Config:
        orm_mode = True

class LoginData(BaseModel):
    email: str
    senha: str
        

# -------- Favoritos --------
class FavoritosCreate(BaseModel):
    usuario_id: int
    produtos_ids: List[int]

class FavoritosRead(BaseModel):
    id: int
    usuario_id: int
    produtos: List[ProdutoRead]
    class Config:
        orm_mode = True

# -------- Carrinho e Itens --------
# Classe base para o item no carrinho
class CarrinhoItemBase(BaseModel):
    produto_id: int
    quantidade: int

# Classe para criação de um item no carrinho
class CarrinhoItemCreate(CarrinhoItemBase):
    pass

# Classe para leitura de um item no carrinho, incluindo os dados do produto
class CarrinhoItemRead(CarrinhoItemBase):
    id: int
    produto: ProdutoRead  # Incluindo as informações do produto

    class Config:
        orm_mode = True

# Classe para criação de um carrinho
class CarrinhoCreate(BaseModel):
    usuario_id: int
    itens: List[CarrinhoItemBase]  # Lista de itens a serem adicionados no carrinho

# Classe para leitura de um carrinho, incluindo os itens do carrinho e os dados dos produtos
class CarrinhoRead(BaseModel):
    id: int
    usuario_id: int
    itens: List[CarrinhoItemRead]  # Lista de itens no carrinho com os dados completos

    class Config:
        orm_mode = True