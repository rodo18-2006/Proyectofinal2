/* import { useEffect, useState } from "react";
import "./PerfilAdmin.css";

export default function PerfilAdmin() {
  const [admin, setAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sesiones, setSesiones] = useState(0);
  const [imagenNueva, setImagenNueva] = useState(null);
  const [showAdmins, setShowAdmins] = useState(false);
  const [nuevoAdmin, setNuevoAdmin] = useState({
    nombre: "",
    usuario: "",
    email: "",
    telefono: "",
    direccion: "",
    rol: "",
    creado: new Date().toLocaleDateString(),
    ultimaSesion: "",
    sesiones: 0,
    foto: "",
  });

  const [adminsData, setAdminsData] = useState({
    Rodolfo: {
      nombre: "Rodolfo Juárez",
      usuario: "Rodolfo",
      email: "rodo@fitgym.com",
      telefono: "123456789",
      direccion: "Pasaje Democracia al 100",
      rol: "Administrador General",
      creado: "2024-01-01",
      ultimaSesion: new Date().toLocaleString(),
      sesiones: 17,
      foto: "./img/Rodo.jpeg",
    },
    Sofia: {
      nombre: "Sofía Caldez",
      usuario: "Sofia",
      email: "sofia@fitgym.com",
      telefono: "987654321",
      direccion: "Avenida Central 456",
      rol: "Administradora de Ventas",
      creado: "2024-02-10",
      ultimaSesion: new Date().toLocaleString(),
      sesiones: 12,
      foto: "./img/sofia.jpeg",
    },
    Celeste: {
      nombre: "Celeste Galindo",
      usuario: "Celeste",
      email: "celeste@fitgym.com",
      telefono: "456789123",
      direccion: "Calle Norte 789",
      rol: "Administradora de Turnos",
      creado: "2024-03-05",
      ultimaSesion: new Date().toLocaleString(),
      sesiones: 8,
      foto: "./img/celeste.jpeg",
    },
    Ignacio: {
      nombre: "Ignacio Teseira",
      usuario: "Ignacio",
      email: "nacho@fitgym.com",
      telefono: "321654987",
      direccion: "Pasaje Sur 321",
      rol: "Administrador de Finanzas",
      creado: "2024-04-15",
      ultimaSesion: new Date().toLocaleString(),
      sesiones: 6,
      foto: "./img/nacho.jpeg",
    },
    Mateo: {
      nombre: "Mateo Manzares",
      usuario: "Mateo",
      email: "mateo@fitgym.com",
      telefono: "654321987",
      direccion: "Boulevard Este 222",
      rol: "Administrador Auxiliar",
      creado: "2024-05-20",
      ultimaSesion: new Date().toLocaleString(),
      sesiones: 4,
      foto: "./img/mateo.jpeg",
    },
  });

  useEffect(() => {
    const nombre = localStorage.getItem("adminNombre");
    if (nombre && adminsData[nombre]) {
      const data = adminsData[nombre];
      setAdmin(data);
      let count = 0;
      const interval = setInterval(() => {
        if (count < data.sesiones) {
          setSesiones((prev) => prev + 1);
          count++;
        } else clearInterval(interval);
      }, 100);
    }
  }, [adminsData]);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleChange = (field, value) =>
    setAdmin((prev) => ({ ...prev, [field]: value }));
  const handleNuevoAdminChange = (field, value) => {
    setNuevoAdmin((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


 const crearNuevoAdmin = async () => {
 
   if (!nuevoAdmin.nombre || !nuevoAdmin.usuario || !nuevoAdmin.email) {
     return alert("Nombre, usuario y email son obligatorios");
   }

   try {
     const res = await fetch("http://localhost:5000/api/admins", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(nuevoAdmin),
     });

     if (!res.ok) {
       const errorText = await res.text(); 
       throw new Error(errorText || "Error al crear el administrador");
     }

     const adminCreado = await res.json();
     setAdminsData((prev) => ({
       ...prev,
       [adminCreado.usuario]: adminCreado,
     }));

   const [nuevoAdmin, setNuevoAdmin] = useState({
     nombre: "",
     usuario: "",
     email: "",
     telefono: "",
     direccion: "",
     rol: "",
     creado: new Date(), // <-- Date real
     ultimaSesion: "",
     sesiones: 0,
     foto: "",
   });

     setShowAdmins(false);
   } catch (err) {
     console.error(err);
     alert("No se pudo crear el administrador: " + err.message);
   }
 };



  const eliminarAdmin = async (usuario, id) => {
    if (!window.confirm(`¿Eliminar al administrador ${usuario}?`)) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admins/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar");

      setAdminsData((prev) => {
        const copia = { ...prev };
        delete copia[usuario];
        return copia;
      });
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el administrador");
    }
  };


  if (!admin)
    return <p className="loading">Cargando datos del administrador...</p>;

  return (
    <div className="perfil-admin-container">
      <h2 className="perfil-title">👤 Perfil del Administrador</h2>
      <div className="perfil-card">
        <img
          src={imagenNueva ? URL.createObjectURL(imagenNueva) : admin.foto}
          alt={`Foto de ${admin.nombre}`}
          className="foto-perfil-admin"
        />
        {isEditing && (
          <label htmlFor="fotoUpload" className="btn-cambiar-foto">
            Cambiar Foto
            <input
              type="file"
              id="fotoUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) =>
                e.target.files[0] && setImagenNueva(e.target.files[0])
              }
            />
          </label>
        )}
        <div className="perfil-info">
          <p>
            <strong>Nombre:</strong>{" "}
            {isEditing ? (
              <input
                value={admin.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
              />
            ) : (
              admin.nombre
            )}
          </p>
          <p>
            <strong>Usuario:</strong> {admin.usuario}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <input
                value={admin.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            ) : (
              admin.email
            )}
          </p>
          <p>
            <strong>Teléfono:</strong>{" "}
            {isEditing ? (
              <input
                value={admin.telefono}
                onChange={(e) => handleChange("telefono", e.target.value)}
              />
            ) : (
              admin.telefono
            )}
          </p>
          <p>
            <strong>Dirección:</strong>{" "}
            {isEditing ? (
              <input
                value={admin.direccion}
                onChange={(e) => handleChange("direccion", e.target.value)}
              />
            ) : (
              admin.direccion
            )}
          </p>
          <p>
            <strong>Rol:</strong> {admin.rol}
          </p>
          <p>
            <strong>Fecha de creación:</strong> {admin.creado}
          </p>
          <p>
            <strong>Última sesión:</strong> {admin.ultimaSesion}
          </p>
        </div>
        <div className="admin-buttons">
          {isEditing ? (
            <button className="btn-guardar" onClick={handleSave}>
              Guardar
            </button>
          ) : (
            <button className="btn-editar" onClick={handleEdit}>
              Editar
            </button>
          )}
          <button className="btn-crear" onClick={() => setShowAdmins(false)}>
            Crear Nuevo Administrador
          </button>
          <button className="btn-ver" onClick={() => setShowAdmins(true)}>
            Ver Administradores
          </button>
        </div>
      </div>

      {!showAdmins && (
        <div className="nuevo-admin-form">
          <h3>Crear Nuevo Administrador</h3>
          <input
            placeholder="Nombre"
            value={nuevoAdmin.nombre}
            onChange={(e) => handleNuevoAdminChange("nombre", e.target.value)}
          />
          <input
            placeholder="Usuario"
            value={nuevoAdmin.usuario}
            onChange={(e) => handleNuevoAdminChange("usuario", e.target.value)}
          />
          <input
            placeholder="Email"
            value={nuevoAdmin.email}
            onChange={(e) => handleNuevoAdminChange("email", e.target.value)}
          />
          <input
            placeholder="Teléfono"
            value={nuevoAdmin.telefono}
            onChange={(e) => handleNuevoAdminChange("telefono", e.target.value)}
          />
          <input
            placeholder="Dirección"
            value={nuevoAdmin.direccion}
            onChange={(e) =>
              handleNuevoAdminChange("direccion", e.target.value)
            }
          />
          <input
            placeholder="Rol"
            value={nuevoAdmin.rol}
            onChange={(e) => handleNuevoAdminChange("rol", e.target.value)}
          />
          <button className="btn-crear-admin" onClick={crearNuevoAdmin}>
            Crear Administrador
          </button>
        </div>
      )}

      {showAdmins && (
        <div className="lista-admins">
          <h3>Administradores Registrados</h3>
          <div className="admins-grid">
            {Object.values(adminsData).map((a) => (
              <div key={a.usuario} className="admin-card">
                <img src={a.foto} alt={a.nombre} className="admin-card-foto" />
                <p>
                  <strong>{a.nombre}</strong>
                </p>
                <p>{a.usuario}</p>
                <p>{a.rol}</p>
                {a.usuario !== admin.usuario && (
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarAdmin(a.usuario, a._id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



 */

import { useEffect, useState } from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import "./PerfilAdmin.css";

export default function PerfilAdmin() {
  const [admin, setAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagenNueva, setImagenNueva] = useState(null);
  const [showAdmins, setShowAdmins] = useState(false);
  const [nuevoAdmin, setNuevoAdmin] = useState({
    nombre: "",
    usuario: "",
    email: "",
    telefono: "",
    direccion: "",
    rol: "",
    password: "",
    creado: new Date(),
    ultimaSesion: new Date(),
    sesiones: 0,
    foto: "",
  });

  const adminNombre = localStorage.getItem("adminNombre");

  // Administradores hardcodeados iniciales
  const adminsHardcodeados = {
    Rodolfo: {
      nombre: "Rodolfo Juárez",
      usuario: "Rodolfo",
      email: "rodo@fitgym.com",
      telefono: "3815986914",
      direccion: "Pasaje Democracia al 100",
      rol: "Administrador General",
      creado: new Date("2024-01-01"),
      ultimaSesion: new Date(),
      sesiones: 17,
      foto: "./img/Rodo.jpeg",
    },
    Sofia: {
      nombre: "Sofía Caldez",
      usuario: "Sofia",
      email: "sofia@fitgym.com",
      telefono: "3816490497",
      direccion: "Las piedras 2100",
      rol: "Administradora de Ventas",
      creado: new Date("2024-02-10"),
      ultimaSesion: new Date(),
      sesiones: 12,
      foto: "./img/sofia.jpeg",
    },
    Celeste: {
      nombre: "Celeste Galindo",
      usuario: "Celeste",
      email: "celeste@fitgym.com",
      telefono: "3815810584",
      direccion: "Junin 645",
      rol: "Administradora de Turnos",
      creado: new Date("2024-03-05"),
      ultimaSesion: new Date(),
      sesiones: 8,
      foto: "./img/celeste.jpeg",
    },
    Ignacio: {
      nombre: "Ignacio Teseira",
      usuario: "Ignacio",
      email: "nacho@fitgym.com",
      telefono: "3813343138",
      direccion: "Virgen de la merced 587",
      rol: "Administrador de Finanzas",
      creado: new Date("2024-04-15"),
      ultimaSesion: new Date(),
      sesiones: 6,
      foto: "./img/nacho.jpeg",
    },
    Mateo: {
      nombre: "Mateo Manzares",
      usuario: "Mateo",
      email: "mateo@fitgym.com",
      telefono: "3812206197",
      direccion: "Diaz velez 1370",
      rol: "Administrador Auxiliar",
      creado: new Date("2024-05-20"),
      ultimaSesion: new Date(),
      sesiones: 4,
      foto: "./img/mateo.jpeg",
    },
  };

  const [adminsData, setAdminsData] = useState(adminsHardcodeados);

  // Traer administradores de MongoDB y combinarlos con los hardcodeados
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admins");
        const data = await res.json();

        // Convertir el array de MongoDB a objeto por usuario
        const mongoAdminsObj = {};
        data.forEach((a) => {
          mongoAdminsObj[a.usuario] = {
            ...a,
            creado: new Date(a.creado),
            ultimaSesion: new Date(a.ultimaSesion),
          };
        });

        setAdminsData({ ...adminsHardcodeados, ...mongoAdminsObj });

        // Seleccionar admin logueado
        if (
          adminNombre &&
          (mongoAdminsObj[adminNombre] || adminsHardcodeados[adminNombre])
        ) {
          setAdmin(
            mongoAdminsObj[adminNombre] || adminsHardcodeados[adminNombre]
          );
        }
      } catch (err) {
        console.error("Error al cargar administradores:", err);
      }
    };

    fetchAdmins();
  }, [adminNombre]);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleChange = (field, value) =>
    setAdmin((prev) => ({ ...prev, [field]: value }));
  const handleNuevoAdminChange = (field, value) =>
    setNuevoAdmin((prev) => ({ ...prev, [field]: value }));

  // Crear nuevo administrador en MongoDB
  const crearNuevoAdmin = async () => {
    if (
      !nuevoAdmin.nombre ||
      !nuevoAdmin.usuario ||
      !nuevoAdmin.email ||
      !nuevoAdmin.password
    ) {
      return alert("Nombre, usuario, email y contraseña son obligatorios");
    }

    try {
      const res = await fetch("http://localhost:5000/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nuevoAdmin.nombre,
          usuario: nuevoAdmin.usuario,
          contrasena: nuevoAdmin.password,
          email: nuevoAdmin.email,
          telefono: nuevoAdmin.telefono,
          direccion: nuevoAdmin.direccion,
          rol: nuevoAdmin.rol,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Error al crear el administrador");
      }

      const adminCreado = await res.json();
      setAdminsData((prev) => ({
        ...prev,
        [adminCreado.usuario]: {
          ...adminCreado,
          creado: new Date(adminCreado.creado),
          ultimaSesion: new Date(adminCreado.ultimaSesion),
        },
      }));

      setNuevoAdmin({
        nombre: "",
        usuario: "",
        email: "",
        telefono: "",
        direccion: "",
        rol: "",
        password: "",
        creado: new Date(),
        ultimaSesion: new Date(),
        sesiones: 0,
        foto: "",
      });

      setShowAdmins(false);
      alert("Administrador creado con éxito");
    } catch (err) {
      console.error(err);
      alert("No se pudo crear el administrador: " + err.message);
    }
  };

  // Eliminar administrador
  const eliminarAdmin = async (usuario, id) => {
    if (!window.confirm(`¿Eliminar al administrador ${usuario}?`)) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admins/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar");

      setAdminsData((prev) => {
        const copia = { ...prev };
        delete copia[usuario];
        return copia;
      });
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el administrador");
    }
  };

  if (!admin)
    return <p className="loading">Cargando datos del administrador...</p>;

  return (
    <div className="perfil-admin-container">
      <h2 className="perfil-title">👤 Perfil del Administrador</h2>
      <div className="perfil-card">
        <img
          src={
            imagenNueva
              ? URL.createObjectURL(imagenNueva)
              : admin.foto || "./img/default.jpeg"
          }
          alt={`Foto de ${admin.nombre}`}
          className="foto-perfil-admin"
        />
        {isEditing && (
          <label htmlFor="fotoUpload" className="btn-cambiar-foto">
            Cambiar Foto
            <input
              type="file"
              id="fotoUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) =>
                e.target.files[0] && setImagenNueva(e.target.files[0])
              }
            />
          </label>
        )}
        <div className="perfil-info">
          <p>
            <strong>Nombre:</strong>{" "}
            {isEditing ? (
              <input
                value={admin.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
              />
            ) : (
              admin.nombre
            )}
          </p>
          <p>
            <strong>Usuario:</strong> {admin.usuario}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <input
                value={admin.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            ) : (
              admin.email
            )}
          </p>
          <p>
            <strong>Teléfono:</strong>{" "}
            {isEditing ? (
              <input
                value={admin.telefono || ""}
                onChange={(e) => handleChange("telefono", e.target.value)}
              />
            ) : (
              admin.telefono || "-"
            )}
          </p>
          <p>
            <strong>Dirección:</strong>{" "}
            {isEditing ? (
              <input
                value={admin.direccion || ""}
                onChange={(e) => handleChange("direccion", e.target.value)}
              />
            ) : (
              admin.direccion || "-"
            )}
          </p>
          <p>
            <strong>Rol:</strong> {admin.rol || "-"}
          </p>
        </div>
        <div className="admin-buttons">
          {isEditing ? (
            <button className="btn-guardar" onClick={handleSave}>
              Guardar
            </button>
          ) : (
            <button className="btn-editar" onClick={handleEdit}>
              Editar
            </button>
          )}
          <button className="btn-crear" onClick={() => setShowAdmins(false)}>
            Crear Nuevo Administrador
          </button>
          <button className="btn-ver" onClick={() => setShowAdmins(true)}>
            Ver Administradores
          </button>
        </div>
      </div>

      {!showAdmins && (
        <Card className="p-4 my-3">
          <Card.Title as="h3">Crear Nuevo Administrador</Card.Title>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              crearNuevoAdmin();
            }}
          >
            <Row className="mb-3">
              <Col md={6}>
                <Form.Control
                  placeholder="Nombre"
                  value={nuevoAdmin.nombre}
                  onChange={(e) =>
                    handleNuevoAdminChange("nombre", e.target.value)
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  placeholder="Usuario"
                  value={nuevoAdmin.usuario}
                  onChange={(e) =>
                    handleNuevoAdminChange("usuario", e.target.value)
                  }
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Control
                  placeholder="Email"
                  type="email"
                  value={nuevoAdmin.email}
                  onChange={(e) =>
                    handleNuevoAdminChange("email", e.target.value)
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  placeholder="Teléfono"
                  value={nuevoAdmin.telefono}
                  onChange={(e) =>
                    handleNuevoAdminChange("telefono", e.target.value)
                  }
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Control
                  placeholder="Dirección"
                  value={nuevoAdmin.direccion}
                  onChange={(e) =>
                    handleNuevoAdminChange("direccion", e.target.value)
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  placeholder="Rol"
                  value={nuevoAdmin.rol}
                  onChange={(e) =>
                    handleNuevoAdminChange("rol", e.target.value)
                  }
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Control
                  placeholder="Contraseña"
                  type="password"
                  value={nuevoAdmin.password}
                  onChange={(e) =>
                    handleNuevoAdminChange("password", e.target.value)
                  }
                />
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Button type="submit" variant="primary" className="w-100">
                  Crear Administrador
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      )}

      {showAdmins && (
        <div className="lista-admins">
          <h3>Administradores Registrados</h3>
          <div className="admins-grid">
            {Object.values(adminsData).map((a) => (
              <div key={a.usuario} className="admin-card">
                <img
                  src={a.foto || "./img/default.jpeg"}
                  alt={a.nombre}
                  className="admin-card-foto"
                />
                <p>
                  <strong>{a.nombre}</strong>
                </p>
                <p>{a.usuario}</p>
                <p>{a.rol || "-"}</p>
                {a.usuario !== admin.usuario && (
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarAdmin(a.usuario, a._id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
