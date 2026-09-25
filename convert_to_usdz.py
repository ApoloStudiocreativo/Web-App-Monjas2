import os
import subprocess
import sys

# Lista de carpetas con modelos
folders = [
    "bargueno-relicario", "bayeu-inmaculada", "bayeu-san-benito",
    "bayeu-santa-gertrudis", "casulla-santa-ana", "cristo-atado-a-la-columna",
    "cristo-yacente", "ecce-homo", "goya-san-carlos-borromeo",
    "goya-santa-engracia", "goya-transito-de-san-jose", "jesus-en-la-cruz",
    "la-elevacion-de-la-cruz", "novisimos", "reliquia-dorada",
    "san-bernardo-con-la-virgen", "san-jose-con-el-nino", "tapiz",
    "virgen-asuncion", "virgen-de-mena", "virgen-romanica"
]

models_dir = "models"
converted = 0
failed = 0

print("🔄 Iniciando conversión de GLB a USDZ...")
print(f"📁 Total de modelos: {len(folders)}\n")

for folder in folders:
    glb_path = os.path.join(models_dir, folder, f"{folder}.glb")
    usdz_path = os.path.join(models_dir, folder, f"{folder}.usdz")
    
    if not os.path.exists(glb_path):
        print(f"⚠️  {folder}: GLB no encontrado")
        failed += 1
        continue
    
    if os.path.exists(usdz_path):
        print(f"⏭️  {folder}: USDZ ya existe, omitiendo")
        continue
    
    print(f"🔄 Convirtiendo {folder}...", end=" ")
    
    try:
        result = subprocess.run(
            ["usdz_converter", glb_path, usdz_path],
            capture_output=True,
            text=True,
            timeout=60
        )
        
        if result.returncode == 0 and os.path.exists(usdz_path):
            size_mb = os.path.getsize(usdz_path) / (1024 * 1024)
            print(f"✅ ({size_mb:.1f} MB)")
            converted += 1
        else:
            print(f"❌ Error: {result.stderr[:100]}")
            failed += 1
    except subprocess.TimeoutExpired:
        print("❌ Timeout (archivo muy grande)")
        failed += 1
    except FileNotFoundError:
        print("❌ usdz_converter no encontrado")
        print("\n⚠️  Instala USD tools: pip install usd-core")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error: {str(e)[:100]}")
        failed += 1

print(f"\n✅ Conversión completada:")
print(f"   - Convertidos: {converted}")
print(f"   - Fallidos: {failed}")
print(f"   - Total: {len(folders)}")
