let users = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", age: 25 },
  { id: 2, name: "María López", email: "maria@example.com", age: 30 },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    const { name, email, age } = req.body;

    if (!name || !email || age === undefined) {
      return res
        .status(400)
        .json({ message: "name, email y age son requeridos" });
    }

    const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const newUser = { id: nextId, name, email, age };
    users.push(newUser);
    return res.status(201).json(newUser);
  }

  if (req.method === "PUT") {
    const id = parseInt(req.query.id ?? req.body.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const { name, email, age } = req.body;
    const changes = {};
    if (name !== undefined) changes.name = name;
    if (email !== undefined) changes.email = email;
    if (age !== undefined) changes.age = age;

    users[index] = { ...users[index], ...changes };
    return res.status(200).json(users[index]);
  }

  if (req.method === "DELETE") {
    const id = parseInt(req.query.id ?? req.body.id);
    const exists = users.some((u) => u.id === id);

    if (!exists) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    users = users.filter((u) => u.id !== id);
    return res.status(200).json({ message: "Usuario eliminado" });
  }

  res.status(405).json({ message: "Método no permitido" });
}