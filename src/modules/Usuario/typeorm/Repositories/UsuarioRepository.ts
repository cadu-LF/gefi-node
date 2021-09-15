
// repository pega do banco
export default class UsuarioRepository extends Repository<Usuario>{

  public async findByUserName(userName:string): Promise<Usuario | undefined>{

    const user = await this.findOne({
      where: { 
        userName
      }
    });

    return user;
  }
}
