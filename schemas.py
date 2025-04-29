from pydantic import BaseModel
from typing import List, Optional

# -------- Produtos --------
class ProdutoBase(BaseModel):
    produto: str
    preco: float
    detalhes: Optional[str]

class ProdutoCreate(ProdutoBase):
    pass

class ProdutoRead(ProdutoBase):
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
class CarrinhoItemBase(BaseModel):
    produto_id: int
    quantidade: int

class CarrinhoItemCreate(CarrinhoItemBase):
    pass

class CarrinhoItemRead(CarrinhoItemBase):
    id: int
    class Config:
        orm_mode = True

class CarrinhoCreate(BaseModel):
    usuario_id: int
    itens: List[CarrinhoItemBase]

class CarrinhoRead(BaseModel):
    id: int
    usuario_id: int
    itens: List[CarrinhoItemRead]
    class Config:
        orm_mode = True
