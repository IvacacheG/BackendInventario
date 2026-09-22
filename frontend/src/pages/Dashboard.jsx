import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../api/axios';
import { Package, AlertTriangle, ArrowDownUp, LogOut, RefreshCw } from 'lucide-react';

export default function Dashboard() {
  const [productos, setProductos] = useState([]);
  const [stockBajo, setStockBajo] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem('usuario')) || { nombre: 'Usuario' };

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const [resProductos, resStockBajo] = await Promise.all([
        clienteAxios.get('/productos'),
        clienteAxios.get('/productos/stock-bajo')
      ]);
      setProductos(resProductos.data);
      setStockBajo(resStockBajo.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Barra superior */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Package className="text-emerald-400" size={28} />
          <h1 className="text-xl font-bold text-white">Sistema de Inventario</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-300 text-sm">Hola, <strong className="text-emerald-400">{usuario.nombre}</strong></span>
          <button
            onClick={cerrarSesion}
            className="flex items-center gap-2 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white px-3 py-1.5 rounded-lg text-sm border border-rose-500/30 transition-all cursor-pointer"
          >
            <LogOut size={16} /> Salir
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Tarjetas de Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Productos</p>
              <h2 className="text-3xl font-bold text-white mt-1">{productos.length}</h2>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Package size={28} />
            </div>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Alertas de Stock Bajo</p>
              <h2 className="text-3xl font-bold text-amber-400 mt-1">{stockBajo.length}</h2>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
              <AlertTriangle size={28} />
            </div>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Estado de la API</p>
              <span className="inline-block mt-2 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30">
                Online (JWT Activo)
              </span>
            </div>
            <button 
              onClick={cargarDatos}
              className="p-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors cursor-pointer"
              title="Recargar datos"
            >
              <RefreshCw size={24} className={cargando ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Sección de Alertas Críticas (Si existen productos con stock bajo) */}
        {stockBajo.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
            <div className="flex items-center gap-2 text-amber-400 font-semibold mb-3">
              <AlertTriangle size={20} />
              <span>Atención Requerida: Productos con Stock Crítico</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {stockBajo.map((p) => (
                <div key={p._id} className="bg-slate-800/80 p-3 rounded-lg border border-amber-500/20 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-white text-sm">{p.nombre}</p>
                    <p className="text-xs text-slate-400">Mínimo requerido: {p.stockMinimo}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-rose-500/20 text-rose-400 font-bold text-xs rounded-md">
                    Stock: {p.stock}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabla de Productos General */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-lg text-white">Catálogo de Productos</h3>
            <span className="text-xs text-slate-400">Consumido desde GET /api/productos</span>
          </div>

          {cargando ? (
            <div className="p-8 text-center text-slate-400">Cargando inventario...</div>
          ) : productos.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No hay productos registrados en el sistema.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="p-4">Producto</th>
                    <th className="p-4">Código</th>
                    <th className="p-4">Precio</th>
                    <th className="p-4">Stock Actual</th>
                    <th className="p-4">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {productos.map((prod) => (
                    <tr key={prod._id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="p-4 font-medium text-white">{prod.nombre}</td>
                      <td className="p-4 text-slate-400 font-mono text-xs">{prod.codigoBarras || 'N/A'}</td>
                      <td className="p-4 text-emerald-400 font-semibold">${prod.precio}</td>
                      <td className="p-4 font-bold">{prod.stock}</td>
                      <td className="p-4">
                        {prod.stock <= prod.stockMinimo ? (
                          <span className="px-2 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs rounded-md font-medium">
                            Stock Bajo
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs rounded-md font-medium">
                            Disponible
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}