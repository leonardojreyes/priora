---
description: Diagnostica un error sin editar nada. Reporta la causa raíz y propone la corrección para aprobar.
argument-hint: <descripción del error, mensaje o prueba que falla>
---
Diagnostica: $ARGUMENTS

**No edites, no crees ni borres archivos, no hagas commits.** Solo lees y ejecutas comandos de lectura o de prueba.

1. Reproduce el error con el comando más pequeño posible (una prueba, un endpoint, un script). Si no se reproduce, dilo y pide datos.
2. Lee solo los archivos involucrados en la traza y su `CLAUDE.md` de carpeta. Revisa `git log -p` reciente de esos archivos si el error es nuevo.
3. Formula hipótesis y descártalas con evidencia (salida de comandos, líneas concretas). No adivines.
4. Entrega:
   - **Síntoma** (qué falla y cómo se reproduce)
   - **Causa raíz** (archivo:línea y por qué), con la evidencia
   - **Por qué no lo detectaron las pruebas** y qué prueba lo habría atrapado
   - **Corrección propuesta** (cambios concretos, archivos, riesgo) y **alternativas**
   - **Prueba de regresión** que se agregará
5. Espera aprobación. La corrección se hace después con `/implement` o con una instrucción explícita.
