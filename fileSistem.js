class ProductManager {
    constructor() {
      this.products = [];
      this.lastId = 0;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validar que todos los campos sean obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Todos los campos son obligatorios');
        return;
      }
  
      // Validar que no se repita el campo "code"
      const codeExists = this.products.some(product => product.code === code);
      if (codeExists) {
        console.error('El código ya existe. No se pueden repetir códigos.');
        return;
      }
  
      // Incrementar el id autoincrementable
      this.lastId++;
  
      // Crear el producto con un id autoincrementable
      const product = {
        id: this.lastId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      // Agregar el producto al arreglo de productos
      this.products.push(product);
  
      // Devolver el producto recién agregado
      return product;
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(productId) {
      const product = this.products.find(product => product.id === productId);
  
      if (product) {
        return product;
      } else {
        console.error('Producto no encontrado');
        return null;
      }
    }
  
    updateProduct(productId, updatedFields) {
      const productIndex = this.products.findIndex(product => product.id === productId);
  
      if (productIndex !== -1) {
        // Actualizar los campos proporcionados
        this.products[productIndex] = {
          ...this.products[productIndex],
          ...updatedFields,
        };
  
        return this.products[productIndex];
      } else {
        console.error('Producto no encontrado. No se puede actualizar.');
        return null;
      }
    }
  
    deleteProduct(productId) {
      const initialLength = this.products.length;
      this.products = this.products.filter(product => product.id !== productId);
  
      if (this.products.length === initialLength) {
        console.error('Producto no encontrado. No se puede eliminar.');
        return null;
      }
  
      console.log(`Producto con ID ${productId} eliminado correctamente.`);
    }
  }
  
  // Ejemplo de uso
  const productManager = new ProductManager();
  
  // Agregar productos
  const nuevoProducto = productManager.addProduct('Dragon', 'Impreso en 3d', 9000, 'imagen1.jpg', 'ABC123', 50);
  console.log('Nuevo producto:', nuevoProducto);
  
  // Obtener todos los productos
  const allProducts = productManager.getProducts();
  console.log('Todos los productos:', allProducts);
  
  // Obtener un producto por ID
  const productById = productManager.getProductById(1);
  console.log('Producto con ID 1:', productById);
  
  // Intentar agregar un producto con el mismo código (debería mostrar un error)
  productManager.addProduct('Figura personalizada', 'Impreso en resina', 6.000, 'imagen3.jpg', 'ABC123', 20);
  
  // Actualizar un producto
  const updatedProduct = productManager.updateProduct(1, { price: 9500 });
  console.log('Producto actualizado:', updatedProduct);
  
  // Eliminar un producto
  productManager.deleteProduct(1);
  