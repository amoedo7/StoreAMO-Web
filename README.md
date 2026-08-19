<div align="center">

# StoreAMO Web

**La tienda del ecosistema DesarrollAMO, accesible desde cualquier dispositivo.**

`device-aware` · `StoreAMO Catalog` · `verified releases` · `sin cuenta obligatoria`

</div>

---

StoreAMO Web detecta localmente la plataforma del navegador y prioriza la descarga adecuada. No obliga a mirar siempre Android, Windows, macOS y Linux a la vez.

```text
Android → muestra primero APK
Windows → muestra primero build Windows
macOS   → muestra primero build macOS
Linux   → muestra primero build Linux
             ↓
          VER MÁS
             ↓
      otras plataformas
```

La detección es una comodidad, no una cárcel: en **Ajustes → Dispositivo** el usuario puede cambiar manualmente la plataforma.

## UX

La interfaz toma ideas útiles de una tienda moderna —inicio, apps, actualizaciones, biblioteca, búsqueda y configuración— pero conserva **branding propio de DesarrollAMO**: fondo azul noche, cyan, violeta y rosa; jerarquía limpia; cards amplias; verificación visible y sin copiar la identidad de Google Play.

## Privacidad

- la detección de plataforma se hace en el navegador;
- sin telemetría por defecto;
- el catálogo es público;
- StoreAMO no necesita token de GitHub para consultar releases públicas;
- “solo verificadas” está activo por defecto.

## Desarrollo local

Servir estos archivos desde cualquier servidor estático, por ejemplo:

```bash
python -m http.server 8080
```

Luego abrir `http://localhost:8080`.

El catálogo se carga desde `amoedo7/StoreAMO-Catalog`.

---

**DesarrollAMO** · un ecosistema, una tienda, varias plataformas.