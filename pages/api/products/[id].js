let products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Teclado", price: 50 },
];

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    products = products.filter((p) => p.id !== parseInt(id));
    return res.status(200).json({ message: "Producto eliminado" });
  }

  res.status(405).json({ message: "Método no permitido" });
}