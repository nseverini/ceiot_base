# Ejercicio CiberKillChain - Ataque

Hacer una copia de este documento para utilizar com plantilla para el ejercicio quitando las instrucciones y el ejemplo.

## Alumno

Nahuel Severini

## Enunciado

Armar una cyberkillchain usando técnicas de la matriz de Att&ck para un escenario relacionado al trabajo práctico de la carrera.

### Instrucciones

Debe haber un objetivo para el ataque.

El escenario debe ser con el sistema ya funcionando en el futuro.

Debe ser en primera persona, es el punto de vista del atacante.

Es recomendable hacer dos o tres pasadas, en la primera la idea, en las siguientes refinamientos especificando las técnicas.
PURO ATAQUE, nada de andar pensando cómo corregir nada.

Para cada etapa, si hay varias medidas posibles, ordenar dejando para lo último lo que se va a hacer en el siguiente paso.

### Ejemplo adaptado a un juego de guerra inventado:

Objetivo del ataque: inhabilitar sin destruir el puerto enemigo con vistas a posteriormente tomarlo.

* Reconnaissance
  - Imagen satelital identifica una pista de aterrizaje.
  - Espías dicen que por el puerto entra el combustible.
  - Espías locales dicen que la playa cercana no tiene buena vigilancia.

* Weaponization
  - Puedo preparar un bombardeo.
  - Decido preparar un equipo de comandos de sabotage.
  
* Delivery
  - Envío al equipo de sabotage a la playa cercana en submarino.
  
* Exploit
  - El equipo logra desembarcar sin incidentes en la playa.
  
* Installation  
  - El equipo se hace pasar por una compañia de circo como camuflaje.

* Command & Control
  - Podría utilizar palomas mensajeras.
  - Decido utilizar Super High TeraHertz Radio que el adversario no puede detectar.
  
* Actions on Objectives
  - El equipo de comandos provoca daños menores en las cañerías.
  - El equipo de comandos coloca minas en el puerto dejando un camino para el desembarco.
  

## Datos trabajo práctico

[Planificación del trabajo](https://github.com/nseverini/plantilla-planificacion/blob/aerogrow/charter.pdf)

[Memoria del trabajo (en proceso)](https://github.com/nseverini/Plantilla-memoria)

El propósito del trabajo es el diseño, desarrollo e implementación de un sistema que permita la gestión de cultivos aeropónicos, con el objetivo de incrementar su productividad y reducir la dificultad de mantenimiento.

Diagrama en bloques del sistema

<img width="592" alt="Diagrama en bloques" src="https://github.com/nseverini/ceiot_base/assets/46693419/d4654fbf-29f5-459d-b7fa-046d13bfbf90">

Se utiliza un ESP32 como microcontrolador por cada zona de cultivo aeropónica que tiene una conexión MQTT con el broker Aedes para recibir datos provenientes de este y a su vez transmitir la información recibida de los sensores.

El broker se encarga de autenticar y autorizar al microcontrolador. Una vez hecho esto, debe analizar la información recibida, validarla y en caso de ser necesario enviarla al DaaS de MongoDB para que sea almacenada. Además, el broker por medio del protocolo WebSocket puede envíar los datos en tiempo real a la aplicación PWA.

La API REST gestiona el acceso a los datos almacenados en el DaaS, brindando permisos de lectura y escritura cuando sea necesario, por medio de sus endpoints. Estos últimos son consumidos por la aplicación PWA por medio de HTTPS.

Por ultimo, la aplicación PWA permite al usuario interactuar con el sistema por medio de sus interfaces.

A diferencia del microcontrolador que es único por zona de cultivo, el servidor y el DaaS es compartido entre todos los usuarios que posea el sistema.

Es importante destacar que todas las conexiones realizadas entre los componentes del sistema utilizan TLS, para asegurar que las mismas sean seguras.

## Resolución

### Objetivo del ataque
Lograr que el usuario final no tenga confianza en el sistema para que comience a usar el software de la competencia, para lograrlo se implementará una estrategia que involucra la interceptación de las mediciones y el envío de datos inválidos.

### Pasos del ataque

### 1. Reconnaissance.
Gather Victim Host Information [T1592](https://attack.mitre.org/techniques/T1592/)
### 2. Weaponization.
Develop Capabilities [T1587](https://attack.mitre.org/techniques/T1587/) y Acquire Infrastructure [T1583](https://attack.mitre.org/techniques/T1583/)
### 3. Delivery.

### 4. Exploit.

### 5. Installation.

### 6. Command & Control.

### 7. Actions on Objectives.
Data Manipulation [T1565](https://attack.mitre.org/techniques/T1565/)

Diagrama en bloques del sistema aplicando CiberKillChain




  

