from sqlalchemy import Float, create_engine, Column, Integer, String, ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

## criando tabelas

class Usuario(Base):
    __tablename__ = 'usuarios'
    id = Column(Integer, primary_key=True)
    nome = Column(String(50))
    email = Column(String(100), unique=True, nullable=False)
    senha = Column(String(255), nullable=False)
    carrinho = relationship("Carrinho", back_populates="usuario", uselist=False, cascade="all, delete-orphan")
    favoritos = relationship("Favoritos", back_populates="usuario", uselist=False, cascade="all, delete-orphan")

class Produtos(Base):
    __tablename__ = 'produtos'
    id = Column(Integer, primary_key=True)
    produto = Column(String(50))
    preco = Column(Float)
    detalhes = Column(String(100))
    img = Column(String(500))

# Tabela secundaria
favoritos_produtos = Table(
    'favoritos_produtos', Base.metadata,
    Column('favorito_id', Integer, ForeignKey('favoritos.id')),
    Column('produto_id', Integer, ForeignKey('produtos.id'))
)

class Favoritos(Base):
    __tablename__ = 'favoritos'
    id = Column(Integer, primary_key=True)
    usuario_id = Column(Integer, ForeignKey('usuarios.id'))
    produtos = relationship("Produtos", secondary=favoritos_produtos)
    usuario = relationship("Usuario", back_populates="favoritos")


class Carrinho(Base):
    __tablename__ = 'carrinhos'
    id = Column(Integer, primary_key=True)
    usuario_id = Column(Integer, ForeignKey('usuarios.id'))
    usuario = relationship("Usuario", back_populates="carrinho")
    itens = relationship("CarrinhoItem", back_populates="carrinho")

class CarrinhoItem(Base):
    __tablename__ = 'carrinho_itens'
    id = Column(Integer, primary_key=True)
    carrinho_id = Column(Integer, ForeignKey('carrinhos.id'))
    produto_id = Column(Integer, ForeignKey('produtos.id'))
    quantidade = Column(Integer)

    carrinho = relationship("Carrinho", back_populates="itens")
    produto = relationship("Produtos")


usuario = 'usuario'
senha = 'senha'
host = 'localhost'
porta = '3306'
banco = 'meu_banco'

engine = create_engine("mysql+mysqlconnector://root:@localhost/banco")

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()
