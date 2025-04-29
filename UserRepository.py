from bancoDeDados import Usuario, Session

class UsuarioRepository:
    def __init__(self):
        self.session = Session()

    def criar(self, nome, email, senha):
        usuario = Usuario(nome=nome, email=email, senha=senha)
        self.session.add(usuario)
        self.session.commit()
        return usuario

    def listar_todos(self):
        return self.session.query(Usuario).all()

    def atualizar(self, id_usuario, nome, email, senha):
        usuario = self.session.query(Usuario).filter_by(id=id_usuario).first()
        if usuario:
            usuario.nome = nome
            usuario.email = email
            usuario.senha = senha
            self.session.commit()
        return usuario

    def deletar(self, id_usuario):
        usuario = self.session.query(Usuario).filter_by(id=id_usuario).first()
        if usuario:
            self.session.delete(usuario)
            self.session.commit()
            return True
        return False

    def buscar_por_nome(self, nome):
        return self.session.query(Usuario).filter(Usuario.nome.like(f"%{nome}%")).all()
