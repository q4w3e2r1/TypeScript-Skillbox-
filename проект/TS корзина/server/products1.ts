


// class Products{
//    #product:[]= null;

//     get(){
//         if product == nyll{
//             async   fetchProducts(()=>{
//                 await
//                 this.#product = result
//             });
//         }

//         return this.#product


//     }

//     getByCatageroy(){
//         this.get().filter(product => product.category == category)
//     }

// }

export class Products {
  #product: { id: string, name: string, image: string, price: number, description:string, category:string  }[] | null = null;

  async get(category = '', id =-1): Promise<{ id: string, name: string, image: string, price: number, description:string, category:string  }[]> {
    let url = 'http://localhost:3001/products';
    if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    }
    if (id != -1){
      url += `?id=${encodeURIComponent(id)}`;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error: ' + response.status);
      }
      const data = await response.json();
      if(this.#product == null)
        this.#product = data;
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }


  async filter(category: string): Promise<{ id: string, name: string, image: string, price: number, description:string, category:string  }[] | null> {
    if (category === 'all') {
      return this.get();
    } else {
      return this.get(category);
    }
  }

  async findProductById(id: number): Promise<{ id: string, name: string, image: string, price: number, description:string, category:string  } | null> {
    const product = await this.get('', id)
    return product[0]
  }

  async getAll(): Promise<{ id: string, name: string, image: string, price: number, description:string, category:string  }[]> {
    let url = 'http://localhost:3001/products';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error: ' + response.status);
      }
      const data = await response.json();
      if(this.#product == null)
        this.#product = data;
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async filterAll(category: string): Promise<{ id: string, name: string, image: string, price: number, description:string, category:string  }[] | null> {
    if(this.#product == null){
      
      await this.getAll()
    }
    if (category == 'all')
      return this.#product
    return this.#product?.filter((value)=> value.category == category)!
  }


  async findProductByIdAll(id: number): Promise<{ id: string, name: string, image: string, price: number, description:string, category:string  } | null> {
    if(this.#product == null){
      await this.getAll()
    }
    return this.#product?.filter((value)=> value.id == String(id))[0]!
  }
}

  