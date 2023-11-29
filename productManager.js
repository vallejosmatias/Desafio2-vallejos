const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    try {
      const products = this.getProducts();
      const newProduct = {
        id: products.length + 1, // Incrementar automáticamente el ID
        ...product,
      };
      products.push(newProduct);
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
      return newProduct;
    } catch (error) {
      throw new Error(`Error al agregar el producto: ${error.message}`);
    }
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }

  getProductById(productId) {
    try {
      const products = this.getProducts();
      const product = products.find(p => p.id === productId);
      if (product) {
        return product;
      } else {
        throw new Error('Producto no encontrado.');
      }
    } catch (error) {
      throw new Error(`Error al obtener el producto por ID: ${error.message}`);
    }
  }

  updateProduct(productId, updatedFields) {
    try {
      const products = this.getProducts();
      const index = products.findIndex(p => p.id === productId);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedFields, id: productId };
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
        return products[index];
      } else {
        throw new Error('Producto no encontrado para actualizar.');
      }
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }

  deleteProduct(productId) {
    try {
      let products = this.getProducts();
      const index = products.findIndex(p => p.id === productId);
      if (index !== -1) {
        products.splice(index, 1);
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
      } else {
        throw new Error('Producto no encontrado para eliminar.');
      }
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  }
}

// Ejemplo de uso
const productManager = new ProductManager('./data/products.json');

try {
  // Agregar productos
  productManager.addProduct({
    title: 'Dragon',
    description: 'Impreso en 3d',
    price: 9000,
    thumbnail: 'imagen1.jpg',
    code: 'ABC123',
    stock: 50,
  });

  productManager.addProduct({
    title: 'Oso',
    description: 'articulado 3d',
    price: 3500,
    thumbnail: 'imagen2.jpg',
    code: 'DEF456',
    stock: 30,
  });

  // Obtener todos los productos
  const allProducts = productManager.getProducts();
  console.log('Todos los productos:', allProducts);

  // Obtener un producto por ID
  const productById = productManager.getProductById(1);
  console.log('Producto con ID 1:', productById);

  // Actualizar un producto
  const updatedProduct = productManager.updateProduct(1, { price: 9500, stock: 45 });
  console.log('Producto actualizado:', updatedProduct);

  // Eliminar un producto
  productManager.deleteProduct(1);
  console.log('Producto eliminado. Nuevos productos:', productManager.getProducts());
} catch (error) {
  console.error(error.message);
}
