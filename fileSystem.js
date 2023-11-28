const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.lastId = 0;
    this.fileName = 'productos.json'; // Nombre del archivo donde se almacenarán los productos
    this.loadProductsFromFile();
  }

  loadProductsFromFile() {
    try {
      const data = fs.readFileSync(this.fileName, 'utf8');
      this.products = JSON.parse(data);
      this.updateLastId();
    } catch (error) {
      console.error('Error al cargar productos desde el archivo:', error.message);
    }
  }

  saveProductsToFile() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.fileName, data, 'utf8');
      console.log('Productos guardados correctamente en el archivo:', this.fileName);
    } catch (error) {
      console.error('Error al guardar productos en el archivo:', error.message);
    }
  }

  updateLastId() {
    if (this.products.length > 0) {
      this.lastId = Math.max(...this.products.map(product => product.id));
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    const codeExists = this.products.some(product => product.code === code);
    if (codeExists) {
      console.error('El código ya existe. No se pueden repetir códigos.');
      return;
    }

    this.lastId++;
    const product = {
      id: this.lastId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
    this.saveProductsToFile();

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
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedFields,
      };

      this.saveProductsToFile();
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

    this.saveProductsToFile();
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
productManager.addProduct('Figura personalizada', 'Impreso en resina', 6000, 'imagen3.jpg', 'ABC123', 20);

// Actualizar un producto
const updatedProduct = productManager.updateProduct(1, { price: 9500 });
console.log('Producto actualizado:', updatedProduct);

// Eliminar un producto
productManager.deleteProduct(1);
