const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST - Sistema de Inventario',
      version: '1.0.0',
      description: 'Documentación interactiva de la API para clientes Web y Móvil',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
    paths: {
      '/api/productos': {
        get: {
          summary: 'Obtiene la lista de todos los productos',
          responses: {
            200: { description: 'Lista de productos obtenida con éxito' }
          }
        },
        post: {
          summary: 'Crea un nuevo producto',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nombre: { type: 'string', example: 'Coca Cola 2L' },
                    precio: { type: 'number', example: 4600 },
                    stock: { type: 'number', example: 10 },
                    codigoBarras: { type: 'string', example: '779123456789' },
                    stockMinimo: { type: 'number', example: 5 }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Producto creado con éxito' },
            400: { description: 'Datos incompletos' }
          }
        }
      },
      '/api/productos/{id}': {
        get: {
          summary: 'Obtiene un producto por su ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
          ],
          responses: {
            200: { description: 'Producto encontrado' },
            404: { description: 'Producto no encontrado' }
          }
        },
        put: {
          summary: 'Actualiza un producto por su ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nombre: { type: 'string', example: 'Coca Cola 2.25L' },
                    precio: { type: 'number', example: 4800 },
                    stock: { type: 'number', example: 15 }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Producto actualizado con éxito' },
            404: { description: 'Producto no encontrado' }
          }
        },
        delete: {
          summary: 'Elimina un producto por su ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
          ],
          responses: {
            200: { description: 'Producto eliminado con éxito' },
            404: { description: 'Producto no encontrado' }
          }
        }
      }
    }
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;