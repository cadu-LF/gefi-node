import { EntityRepository, Repository } from "typeorm";
import Usuario from "../Entities/Usuario";

@EntityRepository(Usuario)
export default class UsuarioRepository extends Repository<Usuario>{

  public async findByName(name: string): Promise<Usuario | undefined> {
    
    const user = await this.findOne({
      where: { 
        name
      }
    });

    return user;
  }

  public async findByEmail(requestEmail: string): Promise<Usuario | undefined> {
    
    // aqui está falhando
    const user = await this.findOne({ email: requestEmail });

    return user;
  }

  public async findById(id: number): Promise<Usuario | undefined> {
    
    const user = await this.findOne({
      where: { 
        id
      }
    });
    
    return user;
  }
}