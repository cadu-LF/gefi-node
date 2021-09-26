import { EntityRepository, Repository } from "typeorm";
import Produto from "../Entities/Produto";

@EntityRepository(Produto)
export default class ProductRepository extends Repository<Produto>{

  /**
   * busca produto pela decrição
   * 
   * @param string: descProdutos
   * @return Promise<Produto | undefined>
   */
  public async findByDescricao(descProduto: string): Promise<Produto | undefined> {
    
    const produto = await this.findOne({
      where: { 
        descProduto
      }
    })

    return produto
  }

  /**
 
   * Busca produto pelo codigo
   * @param number: codProduto
   * @return Promise<Produto | undefined>
   */
  public async findByCodigo(codProduto: number): Promise<Produto | undefined> {
    
    const produto = await this.findOne({
      where: { 
        codProduto
      }
    })

    return produto
  }
}