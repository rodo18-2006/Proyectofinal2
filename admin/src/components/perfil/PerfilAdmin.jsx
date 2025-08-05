import { useEffect, useState } from "react";
import "./PerfilAdmin.css";

export default function PerfilAdmin() {
  const [admin, setAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sesiones, setSesiones] = useState(0);
  const [imagenNueva, setImagenNueva] = useState(null);


  useEffect(() => {
    const nombre = localStorage.getItem("adminNombre");

    const adminsData = {
      Rodolfo: {
        nombre: "Rodolfo Juárez",
        usuario: "Rodolfo",
        email: "rodo@fitgym.com",
        telefono: "123456789",
        direccion: "Calle Ficticia 123",
        rol: "Administrador General",
        creado: "2024-01-01",
        ultimaSesion: new Date().toLocaleString(),
        sesiones: 17,
        foto: "./img/rodo.png",
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
        foto: "/img/celeste.jpeg",
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
        foto: "/img/admins/ignacio.jpg",
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
        foto: "/img/admins/mateo.jpg",
      },
    };

    if (nombre && adminsData[nombre]) {
      const data = adminsData[nombre];
      setAdmin(data);

      // animación contador de sesiones
      let count = 0;
      const interval = setInterval(() => {
        if (count < data.sesiones) {
          setSesiones((prev) => prev + 1);
          count++;
        } else {
          clearInterval(interval);
        }
      }, 100);
    }
  }, []);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  const handleChange = (field, value) => {
    setAdmin((prev) => ({ ...prev, [field]: value }));
  };

  if (!admin)
    return <p className="loading">Cargando datos del administrador...</p>;

  return (
    <div className="perfil-admin-container fade-in">
      <h2>👤 Perfil del Administrador</h2>

      <img
        src={imagenNueva ? URL.createObjectURL(imagenNueva) : admin.foto}
        alt={`Foto de ${admin.nombre}`}
        className="foto-perfil-admin"
      />
      {isEditing && (
        <div className="cambiar-foto">
          <label htmlFor="fotoUpload" className="btn-cambiar-foto">
            Cambiar Foto
          </label>
          <input
            type="file"
            id="fotoUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files[0]) {
                setImagenNueva(e.target.files[0]);
              }
            }}
          />
        </div>
      )}

      <ul className="admin-info-list">
        <li>
          <strong>Nombre:</strong>{" "}
          {isEditing ? (
            <input
              value={admin.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
            />
          ) : (
            admin.nombre
          )}
        </li>
        <li>
          <strong>Usuario:</strong> {admin.usuario}
        </li>
        <li>
          <strong>Email:</strong>{" "}
          {isEditing ? (
            <input
              value={admin.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          ) : (
            admin.email
          )}
        </li>
        <li>
          <strong>Teléfono:</strong>{" "}
          {isEditing ? (
            <input
              value={admin.telefono}
              onChange={(e) => handleChange("telefono", e.target.value)}
            />
          ) : (
            admin.telefono
          )}
        </li>
        <li>
          <strong>Dirección:</strong>{" "}
          {isEditing ? (
            <input
              value={admin.direccion}
              onChange={(e) => handleChange("direccion", e.target.value)}
            />
          ) : (
            admin.direccion
          )}
        </li>
        <li>
          <strong>Rol:</strong> {admin.rol}
        </li>
        <li>
          <strong>Fecha de creación:</strong> {admin.creado}
        </li>
        <li>
          <strong>Última sesión:</strong> {admin.ultimaSesion}
        </li>
        <li>
          <strong>Sesiones iniciadas:</strong>{" "}
          <span className="contador">{sesiones}</span>
        </li>
      </ul>

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
      </div>
    </div>
  );
}
