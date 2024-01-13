export const authorize = (rol) => {
    return (req, res, next) => {
      try {
        const user = req.user;
  
        if (!user || !user.role) {
          return res.status(403).json({ message: 'Acceso denegado' });
        }
  
        if (!rol.includes(user.role)) {
          return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
        }
  
        // Usuario tiene el rol necesario, permite el acceso
        next();
      } catch (error) {
        res.status(500).json({ message: 'Error en la autorización' });
      }
    };
  };
  
