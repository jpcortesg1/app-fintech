# Documentación para Ejecutar la Aplicación

Esta documentación proporciona instrucciones detalladas sobre cómo ejecutar la aplicación "Nombre de tu Aplicación". La aplicación consta de un frontend desarrollado en React utilizando Material UI para el estilo, y un backend en Flask. La aplicación utiliza JWT para la autenticación y cifrado de datos. A continuación, se presentan tres métodos para ejecutar la aplicación: localmente, mediante Docker Compose y utilizando Docker.

## Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de tener instalados los siguientes componentes:

- Python (para el backend)
- Node.js y PNPM (para el frontend)
- Docker (opcional para el método de Docker)
- Docker Compose (opcional para el método de Docker Compose)

## Método 1: Ejecución Local

Sigue estos pasos para ejecutar la aplicación localmente:

### Backend

Navega al directorio "backend" en tu proyecto.
Crea un entorno virtual para el backend (se recomienda utilizar virtualenv).

```Copy code
python -m venv venv
```

Activa el entorno virtual.
En Windows:

```bash Copy code
venv\Scripts\activate
```

En macOS y Linux:

```bash Copy code
source venv/bin/activate
```

Instala las dependencias del backend.

```bash Copy code
pip install -r requirements.txt
```

Crea un archivo .env en el directorio "backend" con las siguientes variables:

```makefile Copy code
SECRET_KEY=Tu_Clave_Secreta
DATABASE_URI=Tu_URL_de_Base_de_Datos
URL_FRONT=URL_del_Frontend
ENCRYPT_KEY=Tu_Clave_de_Cifrado
```

Inicia la aplicación Flask.

```bash Copy code
flask run
```

### Frontend

Navega al directorio "frontend" en tu proyecto.
Instala las dependencias del frontend.

```bash Copy code
pnpm i
```

Crea un archivo .env en el directorio "frontend" con la variable:

```makefile Copy code
VITE_BASE_URL_API=URL_del_Backend
```

Inicia el servidor de desarrollo del frontend.

```bash Copy code
pnpm run dev
```

## Método 2: Docker Compose

Sigue estos pasos para ejecutar la aplicación utilizando Docker Compose:

Asegúrate de tener Docker Compose instalado.

En la raíz de tu proyecto, crea un archivo .env para configurar las variables de entorno necesarias para Docker Compose. Aquí tienes un ejemplo:

```makefile Copy code
SECRET_KEY=Tu_Clave_Secreta
DATABASE_URI=Tu_URL_de_Base_de_Datos
URL_FRONT=URL_del_Frontend
ENCRYPT_KEY=Tu_Clave_de_Cifrado
```

En la raíz de tu proyecto, ejecuta el siguiente comando para iniciar la aplicación:

```bash Copy code
docker-compose up -d
```

## Método 3: Docker

Sigue estos pasos para ejecutar la aplicación utilizando Docker:

### Backend

Navega al directorio "backend" en tu proyecto.

Abre el archivo Dockerfile y asegúrate de que el puerto necesario esté expuesto (por defecto, 5000).

Crea la imagen de Docker para el backend:

```bash Copy code
docker build -t nombre-etiqueta-backend .
```

Ejecuta el contenedor Docker:

```bash Copy code
docker run -d -p puerto:5000 nombre-etiqueta-backend
```

### Frontend

Navega al directorio "frontend" en tu proyecto.

Abre el archivo Dockerfile y asegúrate de que el puerto necesario esté expuesto (por defecto, 3000).

Crea la imagen de Docker para el frontend:

```bash Copy code
docker build -t nombre-etiqueta-frontend .
```

Ejecuta el contenedor Docker:

```bash Copy code
docker run -d -p puerto:3000 nombre-etiqueta-frontend
```

### Uso de la Aplicación

Una vez que la aplicación esté en ejecución, puedes acceder a ella en tu navegador web. Por defecto, la aplicación estará disponible en la dirección http://localhost:puerto. Inicia sesión o regístrate para acceder al dashboard, ver cuentas, realizar transacciones y gestionar tu presupuesto.

# Notas Adicionales

Para realizar transacciones a otras cuentas, asegúrate de que la cuenta de destino exista en la base de datos.
La aplicación está desplegada en Railway. Puedes acceder a la versión en línea en https://righteous-current-production.up.railway.app/budgets.
