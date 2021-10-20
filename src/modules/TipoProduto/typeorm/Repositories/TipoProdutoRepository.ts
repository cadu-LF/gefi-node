import { EntityRepository, Repository } from "typeorm";
import TipoProduto from "../Entities/TipoProduto";

@EntityRepository(TipoProduto)
export default class TipoProdutoRepository extends Repository<TipoProduto>{

  /**
   * Busca Tipo do Produto pela descrição
   * 
   * @param string: descricao
   * @return Promisse<TipoProduto | undefined>
   */
  public async findByDescricao(descricao: string): Promise<TipoProduto | undefined> {
    
    const tipoProduto = await this.findOne({
      where: { 
        descricao
      }
    })

    return tipoProduto
  }

  /**
   * Busca Tipo de Produto pelo id
   * 
   * @param number: id
   * @return Promisse<TipoProduto | undefined>
   */
  public async findById(id: number): Promise<TipoProduto | undefined> {
    
    const tipoProduto = await this.findOne({
      where: { 
        id
      }
    })

    return tipoProduto
  }
}