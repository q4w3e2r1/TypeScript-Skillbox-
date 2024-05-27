
export class Products {
  #product: { id: number, name: string, image: string, price: number, description:string, category:string  }[] | null = null;


  // 1 вариант запрос деалется 1 раз, далее работа как с массивом 
  async get(): Promise<{ id: number, name: string, image: string, price: number, description:string, category:string  }[]> {
    const url = 'http://localhost:3001/products';
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

  async filter(category: string): Promise<{ id: number, name: string, image: string, price: number, description:string, category:string  }[] | null> {
    if(this.#product == null){
      
      await this.get()
    }
    if (category == 'all')
      return this.#product
    return this.#product?.filter((value)=> value.category == category)!
  }


  async findProductByIdAll(id: number): Promise<{ id: number, name: string, image: string, price: number, description:string, category:string  } | null> {
    if(this.#product == null){
      await this.get()
    }
    return this.#product?.filter((value)=> value.id == (id))[0]!
  }



   // 2 вариант с запросом на каждый вызов и использованием встроенных в запрос фильтрации, нахождении по id элемента
   async get2(category = '', id =-1): Promise<{ id: number, name: string, image: string, price: number, description:string, category:string  }[]> {
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

  async filter2(category: string): Promise<{ id: number, name: string, image: string, price: number, description:string, category:string  }[] | null> {
    if (category === 'all') {
      return this.get2();
    } else {
      return this.get2(category);
    }
  }

  async findProductById2(id: number): Promise<{ id: number, name: string, image: string, price: number, description:string, category:string  } | null> {
    const product = await this.get2('', id)
    return product[0]
  }


}

  