from bancoDeDados import Usuario, Session

session = Session()

# Funções CRUD

def criar_usuario(nome, email, senha):
    novo_usuario = Usuario(nome=nome, email=email, senha=senha)
    session.add(novo_usuario)
    session.commit()
    print(f"Usuário criado: {novo_usuario.id} - {novo_usuario.nome}")


def listar_usuarios():
    usuarios = session.query(Usuario).all()
    for usuario in usuarios:
        print(f"{usuario.id}: {usuario.nome} - {usuario.email}")

def atualizar_usuario(id_usuario, novo_nome, novo_email, nova_senha):
    usuario = session.query(Usuario).filter_by(id=id_usuario).first()
    if usuario:
        usuario.nome = novo_nome
        usuario.email = novo_email
        usuario.senha = nova_senha
        session.commit()
        print(f"Usuário atualizado: {usuario.id} - {usuario.nome}")
    else:
        print("Usuário não encontrado.")

def deletar_usuario(id_usuario):
    usuario = session.query(Usuario).filter_by(id=id_usuario).first()
    if usuario:
        session.delete(usuario)
        session.commit()
        print(f"Usuário deletado: {id_usuario}")
    else:
        print("Usuário não encontrado.")

def buscar_usuario_por_nome(nome):
    usuarios = session.query(Usuario).filter(Usuario.nome.like(f'%{nome}%')).all()
    if usuarios:
        for usuario in usuarios:
            print(f"{usuario.id}: {usuario.nome} - {usuario.email}")
    else:
        print("Nenhum usuário encontrado com esse nome.")


#criar_usuario("Maria Souza", "maria@email.com", "senha123")
#listar_usuarios()
#atualizar_usuario(1, "Maria Oliveira", "maria@novoemail.com", "novaSenha456")
#deletar_usuario(1)
#buscar_usuario_por_nome("Maria")