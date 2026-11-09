let products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Teclado", price: 50 },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    const { minPrice, maxPrice, name } = req.query;
    let result = products;

    if (minPrice !== undefined) {
      result = result.filter((p) => p.price >= parseFloat(minPrice));
    }
    if (maxPrice !== undefined) {
      result = result.filter((p) => p.price <= parseFloat(maxPrice));
    }
    if (name) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    return res.status(200).json(result);
  }

  if (req.method === "POST") {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Nombre y precio son requeridos" });
    }

    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    return res.status(201).json(newProduct);
  }

  res.status(405).json({ message: "Método no permitido" });
}